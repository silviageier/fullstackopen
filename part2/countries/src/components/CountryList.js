import Country from './Country'

const CountryList = ({countries, setSearchTerm}) => {
    
    if (countries.length === 1) {
        return (
            <div>
            {countries.map(country => 
                <Country  key={country.alpha3Code} country={country} />
            )}
            </div>
        )
    }
    else if (countries.length > 10) {
        return (
            <p>Too many matches, specify your search</p>
        )
    }
    else {
        return (
            <div>
            {countries.map(country => 
                <div key={country.alpha3Code}>
                    <p>{country.name} <button onClick={() => setSearchTerm(country.name)}>show</button></p>
                    
                </div>
            )}
            </div>
        )
    }
}


export default CountryList