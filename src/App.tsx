import axios from 'axios'
import './App.css'
import { useEffect, useState } from 'react'
import RegisterGroupForm from './components/registerGroupForm'
import Header from './components/Header'
import { IGroupData } from './interfaces/IGroupData'
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


function App() {
  const [dataGroups, setDataGroups] = useState<IGroupData[]>([])
  const [filteredDataGroups, setFilteredDataGroups] = useState<IGroupData[]>([])
  const [numberOfGroups, setNumberOfGroups] = useState(0)
  const [uniqueStates, setUniqueStates] = useState([])
  const [selectedState, setSelectedState] = useState(null)
  const [isLoadingGroups, setIsLoadingGroups] = useState(false)

  const handleGetGroups = async () => {
    try {
      const { data } = await axios.get<IGroupData[]>("https://oz962m8g4e.execute-api.us-east-1.amazonaws.com/groups")
      setDataGroups(data)
      setFilteredDataGroups(data)
    } catch (error) {
      console.error("Algo deu errado!", error.messege)
    }
  }

  const handleFilterState = (state) => {
    if (state === "Todos") {
      setFilteredDataGroups(dataGroups)
    } else {
      setFilteredDataGroups(dataGroups.filter(group => group.state.includes(state)))
    }
    setSelectedState(state)
  }

  const handleDeleteGroup = async (currentId) => {
    try {
      if (window.confirm('Tem certeza que deseja deletar o Grupo de Apoio?')) {
        console.log('Tentando deletar ID:', currentId);
        
        const response = await axios.delete(`https://oz962m8g4e.execute-api.us-east-1.amazonaws.com/groups/${currentId}`)
        console.log(response)
        
        console.log('Resposta completa:', response);
        
        if (response.status === 200) {
          setFilteredDataGroups(dataGroups.filter(group => group.groupId !== currentId));
        }
      }
    } catch (error) {
      console.error("Detalhes do erro:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
        config: error.config
      });
    }
  }

  const getUniqueStates = () => {
    setUniqueStates([...new Set(dataGroups.map(group => group.state)), 'Todos'])
  }

  useEffect(() => {
    setNumberOfGroups(filteredDataGroups.length)
    getUniqueStates()
  }, [filteredDataGroups])

  useEffect(() => {
    setIsLoadingGroups(true)
    handleGetGroups()
    setTimeout(() => {
      setIsLoadingGroups(false);
    }, 1500);
  }, [])

  return (
    <main className='bg-slate-100 flex flex-col items-center'>
      <Header/>
      <section className='max-w-[1440px] flex flex-col items-center'>      
        <RegisterGroupForm />
        <h1 className='text-center text-2xl text-slate-700 mb-3 mt-10'>Encontre um Grupo de Apoio!</h1>
        <div className='flex text-white justify-center'>
          {uniqueStates.map((state, index) => {
            const isSelected = state === selectedState;
            return (
              <div key={index}>
                <button
                  className={`cursor-pointer px-6 py-2 mt-3 font-semibold text-xl hover:bg-blue-400 hover:text-white
                    ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-blue-600'}
                  `}
                  onClick={() => handleFilterState(state)}
                  value={state}
                >
                  {state}
                </button>
              </div>
            );
          })}
        </div>
        <p className='text-center mt-2 mb-4 text-slate-600'>{numberOfGroups} Grupo(s) Encontrado(s)</p>
        <div className='p-3 flex gap-15 flex-wrap justify-center'>
          {isLoadingGroups ? (
            <div className='flex text-3xl flex-col items-center gap-5 text-slate-700'>
              <p>Carregando Grupos</p>
              <AiOutlineLoading3Quarters className='animate-spin' />
            </div>
          ) : (
            filteredDataGroups.length > 0 ? (
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
                        <p className='text-xl'>{group.street}, {group.district} - {group.city}/{group.stateUF} </p>
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
                      <div className='flex items-center'>
                        <button className='bg-blue-400 px-6 py-2 rounded-sm text-white cursor-pointer'>Editar Grupo</button>
                        <FaRegTrashAlt 
                          className='cursor-pointer text-lg flex ml-auto text-red-600'
                          onClick={() => handleDeleteGroup(group.groupId)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-2xl'>Nenhum grupo encontrado</p>
            )
          )}
        </div>
      </section>
    </main>
  )
}

export default App
