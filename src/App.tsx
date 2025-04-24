import axios from 'axios'
import './App.css'
import { useEffect, useState } from 'react'
import RegisterGroupForm from './components/registerGroupForm'
import { IGroupData } from './interfaces/IGroupData'


function App() {
  const [dataGroups, setDataGroups] = useState<IGroupData[]>([])
  const [filteredDataGroups, setFilteredDataGroups] = useState<IGroupData[]>([])
  const [numberOfGroups, setNumberOfGroups] = useState(0)

  const handleGetGroups = async () => {
    try {
      const { data } = await axios.get<IGroupData[]>("https://oz962m8g4e.execute-api.us-east-1.amazonaws.com/groups")
      setDataGroups(data)
      setFilteredDataGroups(data)
      console.log(data)
    } catch (err) {
      console.error("Algo deu errado!", err)
    }
  }

  const handleFilterState = (e) => {
    const { value } = e.target;

    console.log(value)
    if (value === "Todos") {
      setFilteredDataGroups(dataGroups)
      return
    }

    setFilteredDataGroups(dataGroups.filter(group => group.state.includes(value)))
    console.log(filteredDataGroups)
  }

  useEffect(() => {
    setNumberOfGroups(filteredDataGroups.length)
  }, [filteredDataGroups])

  return (
    <main className='bg-slate-50 flex flex-col items-center'>
      <section className='max-w-[1440px]'>      
        <h1>Grupos de apoio</h1>
        <RegisterGroupForm/>
        <button
          className='bg-blue-500 cursor-pointer px-8 py-1 rounded-sm mt-3'
          onClick={handleGetGroups}
        >
          GET  
        </button>
        <div className='flex gap-5 text-white justify-center'>
          <button
            className='bg-blue-500 cursor-pointer px-8 py-1 rounded-sm mt-3'
            onClick={handleFilterState}
            value="Paraná"
          >
            Paraná  
          </button>
          <button
            className='bg-blue-500 cursor-pointer px-8 py-1 rounded-sm mt-3'
            onClick={handleFilterState}
            value="Rio Grande do Sul"
          >
            Rio Grande do Sul  
          </button>
          <button
            className='bg-blue-500 cursor-pointer px-8 py-1 rounded-sm mt-3'
            onClick={handleFilterState}
            value="Santa Catarina"
          >
          Santa Catarina  
          </button>
          <button
            className='bg-blue-500 cursor-pointer px-8 py-1 rounded-sm mt-3'
            onClick={handleFilterState}
            value="São Paulo"
          >
            São Paulo  
          </button>
          <button
            className='bg-blue-500 cursor-pointer px-8 py-1 rounded-sm mt-3'
            onClick={handleFilterState}
            value="Todos"
          >
            Todos  
          </button>
        <p className='text-black'>{numberOfGroups} Grupos Encontrados</p>
        </div>
        <div className='p-3 flex gap-15 flex-wrap justify-center'>
          {filteredDataGroups.length > 0 ? (
            filteredDataGroups.map(group => (
              <div className='flex flex-col bg-white w-120 rounded-md shadow-lg' key={group.groupId}>
                <div className='flex flex-col'>
                  <div className='bg-blue-400 text-white p-3 rounded-t-md flex justify-between'>
                    <p className='text-2xl'>{group.groupName}</p>
                    <p className='text-xs'>Nº: {group.contractNumber}</p>
                  </div>
                  <div className='flex flex-col gap-4 px-6 py-4'>
                    <div>
                      <p className='text-xs'>Local:</p>
                      <p className='text-xl'>Rua {group.street}, {group.district} - {group.city}/{group.stateUF} </p>
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
      </section>
    </main>
  )
}

export default App
