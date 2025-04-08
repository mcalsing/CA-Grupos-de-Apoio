import axios from 'axios'
import './App.css'
import { useState } from 'react'


function App() {
  const [dataGroups, setDataGroups] = useState('')

  
  const handleGetGrups = async () => {
    console.log("teste")
    const { data } = await axios.get("https://oz962m8g4e.execute-api.us-east-1.amazonaws.com/product")
    setDataGroups(data)
  }

  return (
    <main className=''>
      <h1>Grupos de apoio</h1>
      <button
        className='bg-blue-500 cursor-pointer px-8 py-1 rounded-sm mt-3'
        onClick={handleGetGrups}
      >
        GET  
      </button>
      <p>{dataGroups}</p>
    </main>
  )
}

export default App
