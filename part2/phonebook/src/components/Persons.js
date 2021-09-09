import React from 'react'
import Details from './Details'

const Persons = ({people}) => {
    return (
      <div>
        {people.map(person =>
          <Details key={person.name} person={person} />  
        )}
      </div>
    )
  }


export default Persons