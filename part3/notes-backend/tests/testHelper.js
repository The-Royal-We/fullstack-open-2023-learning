const bcrypt = require('bcrypt');
const Note = require('../models/note');
const User = require('../models/user');

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
];

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' });
  await note.save();
  await note.deleteOne();

  // eslint-disable-next-line no-underscore-dangle
  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const initialiseUsers = async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'root', passwordHash });
  await user.save();
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
  initialiseUsers,
};
