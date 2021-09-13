import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'
import personService from './services/personService'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [searchTerm,setSearchTerm] = useState('')

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
        setNewName('')
        setNewNumber('')
      }     
    }
    else {
      personService
      .create(nameObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
    setPersons(persons)
  }

  const removeName = (id, name) => {
    console.log("delete id",id)
    if (window.confirm("Do you really want to delete " + name + "?")) {
      personService.remove(id)
      setPersons(persons)
      console.log("deleted")
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