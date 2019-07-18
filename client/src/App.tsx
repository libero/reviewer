import * as React from 'react'

const App = () => {
  const [cat, setCat] = React.useState('')
  const fetchFromServer = () => window.fetch('http://localhost:9000/api/cats')
  .then(response => response.json())
  .then(json => setCat(json.name))

  return (
  <div>
    <button onClick={fetchFromServer}>Whats the cats name?</button><br></br>
    <span>cat name is {cat}</span><br></br>
  </div>
  )
}

export default App
