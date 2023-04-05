import { useState } from "react";

const PersonLine = ({ name }) => <li>{name}</li>;

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          name: <input onChange={handleNameInputChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(({ name }) => (
          <PersonLine key={name} name={name} />
        ))}
      </ul>
    </div>
  );
};

export default App;
