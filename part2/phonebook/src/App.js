import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import NumberList from "./components/NumberList";
import Form from "./components/Form";

import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleFilterInputChange = (event) => {
    setFilterInput(event.target.value.toLowerCase());
  };

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
      <Filter handleFilterInputChange={handleFilterInputChange} />
      <div>
        <h3>add a new entry</h3>
        <Form
          handleOnSubmit={handleOnSubmit}
          handleNumberInputChange={handleNumberInputChange}
          handleNameInputChange={handleNameInputChange}
          newName={newName}
          newNumber={newNumber}
        />
      </div>
      <h2>Numbers</h2>
      <NumberList persons={persons} searchFilter={filterInput} />
    </div>
  );
};

export default App;
