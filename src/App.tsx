import axios from 'axios'
import './App.css'
import { useState } from 'react'


function App() {
  const [dataGroups, setDataGroups] = useState([])

  
  const handleGetGrups = async () => {
    console.log("testeeee")
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
      <div className='p-3 bg-slate-500'>
        {dataGroups.map(group => (
          <div className='flex flex-col bg-slate-300 w-150 gap-2 mb-3' key={group.groupId}>
            <div className='flex justify-center'>
              <p className='text-xl'>{group.responsible}</p>
              <p className='text-sm'>{group.contractNumber}</p>
            </div>
            <table className=''>
              <tr className='text-sm'>
                <th>Estado</th>
                <th>Cidade</th>
                <th>Bairro</th>
                <th>Rua</th>
              </tr>
              <tr className='text-xl'>
                <td>{group.state}</td>
                <td>{group.city}</td>
                <td>{group.district}</td>
                <td>{group.street}</td>
              </tr>


   {/*            <div className='flex gap-15'>
                <div className='justify-items-start'>
                  <p className='text-xs'>Estado</p>
                  <p className='text-xl'>{group.state}</p>
                </div>
                <div className='justify-items-start'>
                  <p className='text-xs'>Cidade</p>
                  <p className='text-xl'>{group.city}</p>
                </div>
                <div className='justify-items-start'>
                  <p className='text-xs'>Bairro</p>
                  <p className='text-xl'>{group.district}</p>
                </div>
                <div className='justify-items-start'>
                  <p className='text-xs'>Rua</p>
                  <p className='text-xl'>{group.street}</p>
                </div>
              </div> */}
            </table>
          </div>
        ))}
      </div>
    </main>
  )
}

export default App
