const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const notesRouter = require('./controllers/note');
const usersRouter = require('./controllers/user');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

const app = express();

mongoose.set('strictQuery', false);

logger.info('connecting to ', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch((err) => console.log('error connecting to mongodb', err));

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

app.get('/', (_request, response) => {
  response.send('<h1>Hello, World</h1>');
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
