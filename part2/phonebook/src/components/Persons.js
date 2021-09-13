import React from 'react'


const Persons = ({people, removeName}) => {
    return (
      <div>
        {people.map(person =>
          <li key={person.id}>{person.name} {person.number} <button onClick={() => removeName(person.id, person.name)}>delete</button></li>
        )}
      </div>
    )
  }


export default Persons