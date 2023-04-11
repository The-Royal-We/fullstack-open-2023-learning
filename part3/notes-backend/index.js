require("dotenv").config();
const { request, response } = require("express");
const express = require("express");
const cors = require("cors");
const Note = require("./models/note");

const app = express();

app.use(express.json()); // allows express to parse json payloads
app.use(cors());
app.use(express.static("build"));

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (_request, response) => {
  response.send("<h1>Hello, World</h1>");
});

app.get("/api/notes", (_request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => response.json(note));
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const { body } = request;
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => response.json(savedNote));
});

const PORT = process.env.PORT || "8080";
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);