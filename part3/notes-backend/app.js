const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const notesRouter = require('./controllers/note');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const app = express();

mongoose.set('strictQuery', false);

logger.info('connecting to ', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch((err) => console.log('error connecting to mongodb', err));

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);

app.get('/', (_request, response) => {
  response.send('<h1>Hello, World</h1>');
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
