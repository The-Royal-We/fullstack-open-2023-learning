import Note from './components/Note';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import Toggleable from './components/Toggleable';
import { useState, useEffect, useRef } from 'react';
import { getAll, create, update, setToken } from './services/notes';
import { login } from './services/login';
import './index.css';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        <em>
          Note app, Department of Computer Science, University of Helsinki 2022
        </em>
      </em>
    </div>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    create(noteObject).then((returnedNote) =>
      setNotes(notes.concat(returnedNote)),
    );
  };

  const loginForm = () => {
    return (
      <Toggleable buttonLabel={'reveal'}>
        <LoginForm handleLogin={handleLogin} />
      </Toggleable>
    );
  };

  const noteForm = () => {
    return (
      <Toggleable buttonLabel={'new note'} ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Toggleable>
    );
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  useEffect(() => {
    console.log('effect');
    getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

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
      .catch(() => {
        setErrorMessage(
          `the note '${note.content} was already deleted from the server'`,
        );
        setTimeout(() => setErrorMessage(null), 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await login(credentials);
      setUser(user);
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      setToken(user.token);
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
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

      <Footer />
    </div>
  );
};

export default App;
