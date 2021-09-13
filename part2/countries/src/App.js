import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import CountryList from './components/CountryList'

const App = () => {

  const [countries,setCountries] = useState([])
  const [searchTerm,setSearchTerm] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        //console.log(countries)
      })
  }, [])

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h1>Countries</h1>
      <Search searchTerm={searchTerm} handleSearch={handleSearch} />
      <CountryList countries={countriesToShow} setSearchTerm={setSearchTerm} />  
    </div>
  )
}

export default App
