import React from 'react'


const Search = ({searchTerm,handleSearch}) => {
    return (
      <div>
        find countries: <input value={searchTerm} onChange={handleSearch}></input>
      </div>
    )
}

export default Search