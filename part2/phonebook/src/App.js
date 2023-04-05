import { useState } from "react";

const PersonLine = ({ name, number }) => (
  <li>
    {name} - {number}
  </li>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "+2345551234" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already added to the phone book`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          name: <input onChange={handleNameInputChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberInputChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(({ name, number }) => (
          <PersonLine key={name} name={name} number={number} />
        ))}
      </ul>
    </div>
  );
};

export default App;
