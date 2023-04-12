import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import NumberList from "./components/NumberList";
import Form from "./components/Form";

import { getAll, create, deletePerson, update } from "./services/persons";

// There are common things between these 2

const ContactAddedNotification = ({ name }) => {
  if (name === null) {
    return null;
  }

  const style = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  return <div style={style}>Added {name}</div>;
};

const ErrorMessageNotification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const style = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <div style={style}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [nameRecentlyAdded, setNameRecentlyAdded] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const clearPhonebookEntryInputs = () => {
    setNewName("");
    setNewNumber("");
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const person = persons.find((person) => person.name === newName);
    if (person) {
      if (
        window.confirm(
          `${person.name} is already added to phonebook, update existing contact?`
        )
      ) {
        console.log(`Updating ${person.name}`);
        const updatedPerson = {
          ...person,
          number: newNumber,
        };
        update(updatedPerson.id, updatedPerson)
          .then((savedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== savedPerson.id ? p : savedPerson))
            );
          })
          .catch(() => {
            setErrorMessage(
              `Information of ${updatedPerson.name} has already been removed from server.`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== updatedPerson.id));
          })
          .finally(clearPhonebookEntryInputs());
      } else {
        console.warn(`Not updating ${newName}`);
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      create(newPerson)
        .then((personData) => {
          setPersons(persons.concat(personData));
          clearPhonebookEntryInputs();
          setNameRecentlyAdded(newName);
          setTimeout(() => setNameRecentlyAdded(null), 5000);
        })
        .catch((err) => {
          const message = err.response.data.error;
          setErrorMessage(message);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const onDeleteHandler = (id, name) => () => {
    if (window.confirm(`Delete ${name} ?`)) {
      deletePerson(id).then(() => {
        console.log(`Deletion of ${name} successful`);
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactAddedNotification name={nameRecentlyAdded} />
      <ErrorMessageNotification message={errorMessage} />
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
