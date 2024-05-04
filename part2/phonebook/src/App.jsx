import { useEffect, useState } from "react";
import servicePerson from "./services/persons";
import persons from "./services/persons";

const Filter = ({ text, handleChange, value }) => {
  return (
    <div>
      {text} <input onChange={handleChange} value={value} />
    </div>
  );
};
const PersonForm = ({
  onsubmit,
  newname,
  handlenewperson,
  newnumber,
  handlenewnumber,
}) => {
  return (
    <form onSubmit={onsubmit}>
      <div>
        name: <input value={newname} onChange={handlenewperson} />
      </div>
      <div>
        number:{" "}
        <input type="number" value={newnumber} onChange={handlenewnumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const Persons = ({ objperson, handleclick }) => {
  return (
    <div>
      {objperson.name} {objperson.number}
      <button onClick={handleclick}> delete</button>
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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    servicePerson.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNewPerson = (event) => {
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };
  const addNewPerson = (event) => {
    event.preventDefault();
    const findPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );
    if (
      persons.some((item) => item.name === newName) &&
      persons.some((item) => item.number === newNumber)
    ) {
      alert(`${newName} is already added to phonebook`);
      return;
    } else if (
      findPerson &&
      persons.some((item) => item.number !== newNumber)
    ) {
      if (
        window.confirm(
          `${findPerson.name} is alredy added in phonebook, replace a old number with a new one? `
        )
      ) {
        const updatePerson = { ...findPerson, number: newNumber };
        servicePerson
          .updatePerson(findPerson.id, updatePerson)
          .then((updatedPerson) => {
            console.log(updatedPerson);
            setPersons(
              persons.map((p) => (p.id !== findPerson.id ? p : updatedPerson))
            );
            setErrorMessage(`Update '${newName}'`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setErrorMessage(`[error] ${error.response.data.error}`);
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000);
          });
      }
    } else {
      const objetPerson = { name: newName, number: newNumber };
      servicePerson.createPerson(objetPerson).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
      });
      setErrorMessage(`Added '${newName}'`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      setNewName("");
      setNewNumber("");
    }
  };
  const handleDeletePerson = (id) => {
    const object = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${object.name}`)) {
      servicePerson.deletePerson(id).then((deletedPersons) => {
        console.log(deletedPersons);
        setPersons(
          persons.map((p) => p.id === id)
            ? persons.filter((p) => p.id !== id)
            : persons
        );
      });
    }
  };

  const arrayFilter = persons.map((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
    ? persons.filter((person) =>
        person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter
        text="filter show with"
        handleChange={handleChangeFilter}
        value={filter}
      />
      <h2>Add a new</h2>
      <PersonForm
        onsubmit={addNewPerson}
        newname={newName}
        newnumber={newNumber}
        handlenewperson={handleNewPerson}
        handlenewnumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      {arrayFilter.map((person) => {
        return (
          <Persons
            key={person.id}
            objperson={person}
            handleclick={() => handleDeletePerson(person.id)}
          />
        );
      })}
    </div>
  );
};

export default App;
