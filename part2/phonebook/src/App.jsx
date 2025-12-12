import personService from "./services/persons.js";
import { useState, useEffect } from "react";
import Notification from "./components/Notification.jsx";

const Filter = ({ searchName, handleSearchChange }) => {
  return (
    <div>
      filter shown with
      <input value={searchName} onChange={handleSearchChange} />
    </div>
  );
};
const PersonForm = ({
  addName,
  newName,
  handleNameChange,
  handleNumberChange,
  newNumber,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name:
        <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number:
        <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ filteredPersons, handlePersonDelete }) => {
  return (
    <div>
      {filteredPersons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
            <button
              onClick={() => {
                handlePersonDelete(person.id, person.name);
              }}
            >
              delete
            </button>
          </p>
        );
      })}
    </div>
  );
};

const App = () => {
  const [searchName, setSearchName] = useState("");
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  useEffect(() => {
    personService.getAll().then((response) => setPersons(response));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const handlePersonDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };
  const checkName = () => {
    return persons.find((el) => el.name === newName);
  };

  const add = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    personService.add(newPerson).then((response) => {
      setPersons(persons.concat(response));
      setNewName("");
      setNewNumber("");
      setSuccessMessage(`Added ${newPerson.name}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    });
  };
  const addName = (event) => {
    event.preventDefault();

    const exists = persons.find((person) => person.name === newName);

    if (exists) {
      if (
        window.confirm(
          `${exists.name} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const personData = { ...exists, number: newNumber };
        personService.changeNumber(exists.id, personData).then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== exists.id ? person : response,
            ),
          );
          setSuccessMessage(`Updated the number of ${exists.name}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        });
        return;
      }
      return;
    }
    add();
  };
  const filteredPersons = !searchName
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchName.toLowerCase()),
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Filter searchName={searchName} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        filteredPersons={filteredPersons}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;
