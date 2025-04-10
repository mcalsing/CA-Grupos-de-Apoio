import axios from 'axios'
import './App.css'
import { useState } from 'react'
import RegisterGroupForm from './components/registerGroupForm'
import { IGroupData } from './interfaces/IGroupData'


function App() {
  const [dataGroups, setDataGroups] = useState<IGroupData[]>([])

  const handleGetGroups = async () => {
    const { data } = await axios.get<IGroupData[]>("https://oz962m8g4e.execute-api.us-east-1.amazonaws.com/groups")
    setDataGroups(data)
  }

  return (
    <main className=''>
      <h1>Grupos de apoio</h1>
      <RegisterGroupForm/>
      <button
        className='bg-blue-500 cursor-pointer px-8 py-1 rounded-sm mt-3'
        onClick={handleGetGroups}
      >
        GET  
      </button>
      <div className='p-3 bg-slate-500 flex gap-5 flex-wrap justify-center'>
        {dataGroups.length > 0 ? (
          dataGroups.map(group => (
            <div className='flex flex-col bg-slate-300 w-80 mb-3 rounded-sm p-3' key={group.groupId}>
              <div className='flex flex-col gap-4'>
                <div className=''>
                  <p className='text-xs'>Responsável:</p>
                  <div className='flex justify-between'>
                    <p className='text-xl'>{group.responsible}</p>
                    <p className='text-xs'>Nº: {group.contractNumber}</p>
                  </div>
                </div>
                <div>
                  <p className='text-xs'>Estado:</p>
                  <p className='text-xl'>{group.state}</p>
                </div>
                <div>
                  <p className='text-xs'>Cidade:</p>
                  <p className='text-xl'>{group.city}</p>
                </div>
                <div>
                  <p className='text-xs'>Bairro:</p>
                  <p className='text-xl'>{group.district}</p>
                </div>
                <div>
                  <p className='text-xs'>Rua:</p>
                  <p className='text-xl'>{group.street}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum grupo encontrado</p>
        )}
      </div>
    </main>
  )
}

export default App
