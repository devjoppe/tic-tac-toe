
// Import style
import './assets/style/css/style.css'
import {useEffect, useState} from "react";

interface squareInt {
  row: string,
  col: number
}

function App() {

  const [myNumber, setMyNumber] = useState(0)
  const [myText, setMyText] = useState("")
  const [squareId, setSquareId] = useState<squareInt[]>([])

  const saveSquare = () => {
    setSquareId([...squareId, { row: myText, col: myNumber }])
  }

  useEffect(() => {
    console.log(squareId)
  }, [squareId])

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        saveSquare()
      }}>
        <input type="number" value={myNumber} onChange={(e) => setMyNumber(parseInt(e.target.value))}/>
        <input type="text" value={myText} onChange={(e) => setMyText(e.target.value)} />
        <button type="submit">Check</button>
      </form>
    </div>
  )
}

export default App
