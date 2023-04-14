const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const supertest = require('supertest');
const app = require('../app');
const Note = require('../models/note');

const api = supertest(app);

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

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(initialNotes[1]);
  await noteObject.save();
});

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('there are 2 notes', async () => {
  const response = await api.get('/api/notes');

  expect(response.body).toHaveLength(2);
});
test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes');

  expect(response.body[0].content).toBe('HTML is easy');
});
afterAll(async () => {
  await mongoose.connection.close();
});
