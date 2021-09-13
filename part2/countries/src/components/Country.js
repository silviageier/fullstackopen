import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const Country = ({country}) => {

    return (
      <div>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population} </p>
        <h3>Languages</h3>
        <div>
            {country.languages.map(language =>
                <li key={language.iso639_1}>{language.name}</li>
            )}
        </div>
        <img alt={country.name} src={country.flag} width="200" />
        <h3>Weather in {country.capital}</h3>
        <Weather city={country.capital} />
      </div>
    )
}

export default Country