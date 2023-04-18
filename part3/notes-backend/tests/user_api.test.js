const bcrypt = require('bcrypt');
const supertest = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');
const app = require('../app');

const helper = require('./testHelper');

const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });
    await user.save();
  });

  afterAll(async () => {
    // holy moly don't forget to close your connection
    await mongoose.connection.close();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'muser',
      name: 'Mock User',
      password: 'test123456789',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'root',
      password: 'test123456789',
    };

    await api.post('/api/users').send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('we can get all users', async () => {
    const usersAtStart = await helper.usersInDb();

    const { body } = await api.get('/api/users');

    expect(body).toHaveLength(usersAtStart.length);
  });
});
