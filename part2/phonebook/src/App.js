import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Warning from './components/Warning'
import axios from 'axios'
import personService from './services/personService'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [searchTerm,setSearchTerm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [warningMessage, setWarningMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    console.log(newName)
    //const names = persons.map(person => person.name)
    //console.log(names)
    const match = persons.find(person => person.name === newName)
    if (match) {
      if (window.confirm(`Do you really want to update the number of ${match.name}?`)) {
        console.log(match)
        const changedPerson = {...match, number: newNumber}
        personService
        .update(match.id,changedPerson)
        .then (() => {
          setNewName('')
          setNewNumber('')
          setNotificationMessage(
            `Number of '${match.name}' was successfully updated`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)

        })
        .catch(error => {
          setWarningMessage(
            `Number of '${match.name}' has been deleted`
          )
          setTimeout(() => {
            setWarningMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== match.id))
        })

      }     
    }
    else {
      personService
      .create(nameObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(
          `Number for '${newName}' was successfully added`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    }
    setPersons(persons)
  }

  const removeName = (id, name) => {
    console.log("delete id",id)
    if (window.confirm("Do you really want to delete " + name + "?")) {
      personService.remove(id).then (() => {
        setPersons(persons.map(person => person))
        console.log("deleted")
        setNotificationMessage(
          `Number of '${name}' was successfully deleted`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        setWarningMessage(
          `Number of '${name}' has already been deleted`
        )
        setTimeout(() => {
          setWarningMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
      })

    }
    personService
      .getAll()
      .then(initialPersons => {
      setPersons(initialPersons)
    })
  }

  const updateName = (id, name) => {
    const person = persons.find(n => n.id === id)

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} />
      <Warning message={warningMessage} />
      <PersonForm addName={addName}
                  newName={newName}
                  handleNameChange={handleNameChange}
                  newNumber={newNumber}
                  handleNumberChange={handleNumberChange} />
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <h2>Numbers</h2>
        <Persons people={peopleToShow} removeName={removeName}/>
    </div>
  )
}

export default App