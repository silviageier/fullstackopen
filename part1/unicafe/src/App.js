import React, { useState } from 'react'

const Stats = ({total, good, neutral, bad}) => {
  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <table>
          <tbody>
            <Stat name="good" value={good} />
            <Stat name="neutral" value={neutral} />
            <Stat name="bad" value={bad} />
            <Stat name="all" value={total} />
            <Stat name="average" value={((good - bad) / total).toFixed(1)}/>
            <Stat name="positive" value={(good / total * 100).toFixed(1) + '%'} />
          </tbody>
        </table>
      </div>
    )
  }
}

const Button = ({name, action}) => {
  return (
    <div>
      <button onClick={action} >{name}</button>
    </div>
  )
}

const Stat = ({name, value}) => {
  return (
    
      <tr>
        <td>{name}</td>
        <td>{value}</td>
      </tr>
      /*<p>{name} {value}</p>*/
    
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)


  const handleGood = () => {
    setTotal(total + 1)
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setTotal(total + 1)
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setTotal(total + 1)
    setBad(bad + 1)
  }
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" action={handleGood} />
      <Button name="neutral" action={handleNeutral} />
      <Button name="bad" action={handleBad} />
      <h2>statistics</h2>
      <Stats total={total} good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App