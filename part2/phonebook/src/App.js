import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import NumberList from "./components/NumberList";
import Form from "./components/Form";

import { getAll, create, deletePerson } from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    getAll().then((personsData) => {
      setPersons(personsData);
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
      create(newPerson)
        .then((personData) => {
          setPersons(persons.concat(personData));
        })
        .finally(() => {
          setNewName("");
          setNewNumber("");
        });
    }
  };

  const onDeleteHandler = (id, name) => () => {
    if (window.confirm(`Delete ${name} ?`)) {
      deletePerson(id).then(() => {
        console.log(`Deletion of ${name} successful`);
        // do I need to get all? no i just need to update state to filter that person out
        setPersons(persons.filter((p) => p.id !== id));
      });
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
      <NumberList
        persons={persons}
        searchFilter={filterInput}
        onDeleteHandler={onDeleteHandler}
      />
    </div>
  );
};

export default App;
