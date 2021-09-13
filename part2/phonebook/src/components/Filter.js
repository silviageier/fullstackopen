import React from 'react'


const Filter = ({searchTerm,handleSearch}) => {
    return (
      <div>
        filter with a name: <input value={searchTerm} onChange={handleSearch}></input>
      </div>
    )
}

export default Filter