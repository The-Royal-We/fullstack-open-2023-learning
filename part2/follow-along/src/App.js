import Note from "./components/Note";
import axios from "axios";
import { useState, useEffect } from "react";
import { getAll, create, update } from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note..."); //to make this controlled by the app, **we** need to handle the state changes
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  useEffect(() => {
    console.log("effect");
    getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  console.log("render", notes.length, "notes");

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    create(noteObject).then((createdNote) => {
      setNotes(notes.concat(createdNote)); // remember: notes.concat returns a copy of the array with the object added
      setNewNote("");
    });
  };

  const toggleImportanceOf = (id) => () => {
    // remember this return a unique handler based on the id
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    update(id, changedNote)
      .then((updatedNote) => {
        // since we store the array in memory, we need to replace
        // the entire array with a new one that has our changed data
        setNotes(notes.map((n) => (n.id !== id ? n : updatedNote)));
      })
      .catch((err) => {
        alert(`the note '${note.content} was already deleted from the server'`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
