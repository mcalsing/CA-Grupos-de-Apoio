import { useState } from 'react';
import { IAddress } from '../interfaces/IAddress'
import { IAddressEN } from '../interfaces/IAddressEN'
import axios from 'axios'
import { IUserData } from '../interfaces/IUserData';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { FaSpinner } from "react-icons/fa";

const initialGroupData: IUserData = {
  responsible: '',
  contractNumber: '',
  phone: '',
  email: '',
  support: '',
  groupName: '',
  dayOfTheWeek: [],
  frequency: '',
  time: ''
};

const initialGroupAddress: IAddressEN = {
  state: '',
  city: '',
  district: '',
  street: '',
  stateUF: ''
}

function registerGroupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [groupAddress, setGroupAddress] = useState<IAddressEN | null>(initialGroupAddress);
  const [cepInput, setCepInput] = useState('')
  const [groupData, setGroupData] = useState<IUserData>(initialGroupData);  

  const getCep = async (cep:string) => {
    try {
      const { data } = await axios.get<IAddress>(`https://viacep.com.br/ws/${cep}/json/`)
      const { estado: state, uf: stateUF, localidade: city, bairro: district, logradouro: street} = data
      setGroupAddress({state, stateUF, city, district, street})

    } catch (error) {
      console.error("Erro ao buscar CEP:", error)
    }
  }

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = e.target.value.replace(/\D/g, '');
    setCepInput(cleanedValue);
    
    if (cleanedValue.length === 8) {
      getCep(cleanedValue);
    }
  };

  const handleGroupDataChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const { name, value } = e.target;

    setGroupData((prev) => ({ ...prev, [name]: value }));
  }

  const handleGroupAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const { name, value } = e.target;

    setGroupAddress((prev) => ({ ...prev, [name]: value }));
  }

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
  
    setGroupData((prevData) => {
      const updatedDays = checked
        ? [...prevData.dayOfTheWeek, value]
        : prevData.dayOfTheWeek.filter((day) => day !== value);
  
      return { ...prevData, dayOfTheWeek: updatedDays };

      //handle change para checkbox, testar depois
      /* const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setCheckedCategories((prev) => ({ ...prev, [name]: checked  }))
      }*/
    });
  };

  //console.log(groupData) verificar pq userdata "muda" quando o cep é digitado

  const handleCreateSupportGroup = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    const payload = {
      cep: cepInput,
      state: groupAddress?.state,
      stateUF: groupAddress?.stateUF,
      city: groupAddress?.city,
      district: groupAddress?.district,
      street: groupAddress?.street,
      groupName: groupData.groupName,
      contractNumber: groupData.contractNumber,
      support: groupData.support,
      email: groupData.email,
      responsible: groupData.responsible,
      phone: groupData.phone,
      dayOfTheWeek: groupData.dayOfTheWeek,
      frequency: groupData.frequency,
      time: groupData.time,
      groupId: Math.random().toString(36).slice(-7)
    };
    
    try {
      console.log(payload)
      await axios.post("https://oz962m8g4e.execute-api.us-east-1.amazonaws.com/groups", payload)

      toast.success('Grupo de Apoio Cadastrado!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      })
      setGroupAddress(initialGroupAddress)
      setGroupData(initialGroupData)
      setCepInput('')
      setIsLoading(false)
    } catch (error) {
      console.error("Erro durante o registro:", error);
      setIsLoading(false)
    }
    //setDataGroups(data)
  }


  return (
    <form className="flex flex-col justify-center border-2 bg-white border-slate-300 px-8 pt-5 pb-8 rounded-lg">
      <h1 className='text-center mb-8 text-2xl text-slate-700'>Cadastre um novo Grupo de Apoio</h1>
      <ToastContainer />
      <div className="flex gap-4 flex-wrap md:w-[536px] w-[416px]">
        <div className="flex flex-col md:w-[259px] w-[200px] gap-[3px]">
          <label className="font-medium text-sm text-slate-800">Nome do Grupo</label>
          <input 
            className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" 
            type="text"
            value={groupData.groupName}
            name="groupName"
            onChange={handleGroupDataChange}
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px] gap-[3px]">
          <label className="font-medium text-sm text-slate-800">Número do contrato</label>
          <input 
            className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" 
            type="text"
            value={groupData.contractNumber}
            name="contractNumber"
            onChange={handleGroupDataChange}
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px] gap-[3px]">
          <label className="font-medium text-sm text-slate-800">Apoio</label>
          <input 
            className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" 
            type="text"
            value={groupData.support}
            name="support"
            onChange={handleGroupDataChange}
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px] gap-[3px]">
          <label className="font-medium text-sm text-slate-800">E-mail</label>
          <input 
            className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" 
            type="text"
            value={groupData.email}
            name="email"
            onChange={handleGroupDataChange}
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px] gap-[3px]">
          <label className="font-medium text-sm text-slate-800">Responsável</label>
          <input 
            className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" 
            type="text"
            value={groupData.responsible}
            name="responsible"
            onChange={handleGroupDataChange}
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px] gap-[3px]">
          <label className="font-medium text-sm text-slate-800">Telefone</label>
          <input 
            className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" 
            type="text"
            value={groupData.phone}
            name="phone"
            onChange={handleGroupDataChange}
          />
        </div>
        <div className="md:w-[259px] w-[200px]">
          {/* <label className="font-medium text-sm text-b600">Dias da Semana</label> */}
          <div className='flex gap-2'>
            <input 
              className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px]"
              id="day1"
              type="checkbox"
              value="Segunda-feira"
              name="dayOfTheWeek"
              onChange={handleDayChange}
            />
            <label className='text-slate-800' htmlFor="day1">Segunda-feira</label>
          </div>
          <div className='flex gap-2'>
            <input 
              className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px]"
              id="day2"
              type="checkbox"
              value="Terça-feira"
              name="dayOfTheWeek"
              onChange={handleDayChange}
            />
            <label className='text-slate-800' htmlFor="day2">Terça-feira</label>
          </div>
          <div className='flex gap-2'>
            <input 
              className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px]"
              id="day3"
              type="checkbox"
              value="Quarta-feira"
              name="dayOfTheWeek"
              onChange={handleDayChange}
            />
            <label className='text-slate-800' htmlFor="day3">Quarta-feira</label>
          </div>
          <div className='flex gap-2'>
            <input 
              className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px]"
              id="day4"
              type="checkbox"
              value="Quinta-feira"
              name="dayOfTheWeek"
              onChange={handleDayChange}
            />
            <label className='text-slate-800' htmlFor="day4">Quinta-feira</label>
          </div>
          <div className='flex gap-2'>
            <input 
              className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px]"
              id="day5"
              type="checkbox"
              value="Sexta-feira"
              name="dayOfTheWeek"
              onChange={handleDayChange}
            />
            <label className='text-slate-800' htmlFor="day5">Sexta-feira</label>
          </div>          
          <div className='flex gap-2'>
            <input 
              className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px]"
              id="day6"
              type="checkbox"
              value="Sábado"
              name="dayOfTheWeek"
              onChange={handleDayChange}
            />
            <label className='text-slate-800' htmlFor="day6">Sábado</label>
          </div>
        </div>
        <div>
          <div className="flex flex-col md:w-[259px] w-[200px] gap-[3px]">
            <label className="font-medium text-sm text-slate-800">Frequência</label>
            <select 
              className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              name="frequency"
              onChange={handleGroupDataChange} 
            >
              <option value="Semanal">Semanal</option>
              <option value="Quinzenal">Quinzenal</option>
              <option value="Mensal">Mensal</option>
            </select>
          </div>
          <div className="flex flex-col md:w-[259px] w-[200px] gap-[3px]">
            <label className="font-medium text-sm text-slate-800 mt-4">Horário de Início das Reuniões</label>
            <input 
              className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" 
              type="text"
              value={groupData.time}
              onChange={handleGroupDataChange}
              name="time"
            />
        </div>
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px] gap-[3px]">
          <label className="font-medium text-sm text-slate-800">CEP</label>
          <input 
            className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" 
            type="text"
            maxLength={8}
            value={cepInput}
            onChange={handleCepChange}
            name="cep"
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px] gap-[3px]">
          <label className="font-medium text-sm text-slate-800">Estado</label>
          <input 
            className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" 
            type="text"
            value={groupAddress?.state}
            name="state"
            onChange={handleGroupAddressChange}
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px] gap-[3px]">
          <label className="font-medium text-sm text-slate-800">Cidade</label>
          <input 
            className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" 
            type="text"
            value={groupAddress?.city}
            name="city"
            onChange={handleGroupAddressChange}
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px] gap-[3px]">
          <label className="font-medium text-sm text-slate-800">Bairro</label>
          <input 
            className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            type="text"
            value={groupAddress?.district}
            name="district"
            onChange={handleGroupAddressChange}
          />
        </div>
        <div className="flex flex-col w-full gap-[3px]">
          <label className="font-medium text-sm text-slate-800">Rua</label>
          <input 
            className="py-[8px] px-[12px] border-1 border-slate-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" 
            type="text"
            value={groupAddress?.street}
            name="street"
            onChange={handleGroupAddressChange}
          />
        </div>
        <button
          type="submit"
          className='bg-blue-500 cursor-pointer px-6 py-2 rounded-sm text-white flex items-center gap-3 w-full justify-center'
          onClick={handleCreateSupportGroup}
        >
          Criar Grupo  
          {isLoading && (
            <FaSpinner className="animate-spin" />
          )}
      </button>
      </div>
    </form>
  )
}

export default registerGroupForm;