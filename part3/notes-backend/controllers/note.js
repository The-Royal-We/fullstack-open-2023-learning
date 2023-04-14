const noteRouter = require('express').Router();
const Note = require('../models/note');

noteRouter.get('/', async (_request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

noteRouter.post('/', async (request, response, next) => {
  const { body } = request;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  try {
    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch (exception) {
    next(exception);
  }
});

noteRouter.get('/:id', async (request, response, next) => {
  try {
    const retrievedNote = await Note.findById(request.params.id);
    if (retrievedNote) {
      response.json(retrievedNote);
    } else {
      response.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

noteRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (err) {
    next(err);
  }
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
