const jwt = require('jsonwebtoken');
const noteRouter = require('express').Router();
require('express-async-errors');

const Note = require('../models/note');
const User = require('../models/user');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

noteRouter.get('/', async (_request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
  response.json(notes);
});

noteRouter.post('/', async (request, response) => {
  const { body } = request;
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id,
  });

  const savedNote = await note.save();
  // eslint-disable-next-line no-underscore-dangle
  user.notes = user.notes.concat(savedNote._id);

  await user.save();
  return response.status(201).json(savedNote);
});

noteRouter.get('/:id', async (request, response) => {
  const retrievedNote = await Note.findById(request.params.id);
  if (retrievedNote) {
    response.json(retrievedNote);
  } else {
    response.status(404).end();
  }
});

noteRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

noteRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body;

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = noteRouter;
