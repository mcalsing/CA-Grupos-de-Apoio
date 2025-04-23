import axios from 'axios'
import './App.css'
import { useState } from 'react'
import RegisterGroupForm from './components/registerGroupForm'
import { IGroupData } from './interfaces/IGroupData'


function App() {
  const [dataGroups, setDataGroups] = useState<IGroupData[]>([])

  const handleGetGroups = async () => {
    try {
      const { data } = await axios.get<IGroupData[]>("https://oz962m8g4e.execute-api.us-east-1.amazonaws.com/groups")
      setDataGroups(data)
      console.log(data)
    } catch (err) {
      console.error("Algo deu errado!", err)
    }
  }

  return (
    <main className='bg-slate-50'>
      <h1>Grupos de apoio</h1>
      <RegisterGroupForm/>
      <button
        className='bg-blue-500 cursor-pointer px-8 py-1 rounded-sm mt-3'
        onClick={handleGetGroups}
      >
        GET  
      </button>
      <div className='p-3 flex gap-5 flex-wrap justify-center'>
        {dataGroups.length > 0 ? (
          dataGroups.map(group => (
            <div className='flex flex-col bg-white w-120 mb-3 rounded-md shadow-lg' key={group.groupId}>
              <div className='flex flex-col'>
                <div className='bg-blue-400 text-white p-3 rounded-t-md flex justify-between'>
                  <p className='text-2xl'>{group.groupName}</p>
                  <p className='text-xs'>Nº: {group.contractNumber}</p>
                </div>
                <div className='flex flex-col gap-4 px-6 py-4'>
                  <div>
                    <p className='text-xs'>Local:</p>
                    <p className='text-xl'>Rua {group.street}, {group.district} - {group.city}/{group.state} </p>
                  </div>
                  <div>
                    <p className='text-xs'>Responsável:</p>
                    <div className='flex justify-between'>
                      <p className='text-xl'>{group.responsible}</p>
                      <p className='text-xl'>{group.phone}</p>
                    </div>
                  </div>
                  <div>
                    <p className='text-xs'>Reunições:</p>
                    <div className='flex justify-between'>
                      <p className='text-xl'>{group.dayOfTheWeek[0]} e {group?.dayOfTheWeek[1]} às {group.time}</p>
                      <p className='text-xl'>{group.frequency}</p>
                    </div>
                  </div>
                  <div>
                    <p className='text-xs'>E-mail:</p>
                    <p className='text-xl'>{group.email}</p>
                  </div>
                  <div>
                    <p className='text-xs'>Apoio:</p>
                    <p className='text-xl'>{group.support}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-2xl'>Nenhum grupo encontrado</p>
        )}
      </div>
    </main>
  )
}

export default App
