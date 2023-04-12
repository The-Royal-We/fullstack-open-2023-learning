require("dotenv").config();
const { request, response } = require("express");
const express = require("express");
const cors = require("cors");
const Note = require("./models/note");

const app = express();

app.use(express.json()); // allows express to parse json payloads
app.use(cors());
app.use(express.static("build"));

app.get("/", (_request, response) => {
  response.send("<h1>Hello, World</h1>");
});

app.get("/api/notes", (_request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then((res) => {
      response.status(204).end();
    })
    .catch((err) => next(err));
});

app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.post("/api/notes", (request, response, next) => {
  const { body } = request;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => response.json(savedNote))
    .catch((err) => next(err));
});

const PORT = process.env.PORT || "8080";
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);
