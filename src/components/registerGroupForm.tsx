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
}

function registerGroupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [groupAddress, setGroupAddress] = useState<IAddressEN | null>(initialGroupAddress);
  const [cepInput, setCepInput] = useState('')
  const [groupData, setGroupData] = useState<IUserData>(initialGroupData);
  //const [payload, setPayload] = useState('')

  const getCep = async (cep:string) => {
    try {
      const { data } = await axios.get<IAddress>(`https://viacep.com.br/ws/${cep}/json/`)
      console.log(data)
      const { estado: state, uf: stateUF, localidade: city, bairro: district, logradouro: street} = data
      setGroupAddress({state, stateUF, city, district, street})

    } catch (error) {
      console.error("Erro ao buscar CEP:", error)
    }
  }

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("entrei no handleCepChange")
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

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
  
    setGroupData((prevData) => {
      const updatedDays = checked
        ? [...prevData.dayOfTheWeek, value]
        : prevData.dayOfTheWeek.filter((day) => day !== value);
  
      return { ...prevData, dayOfTheWeek: updatedDays };
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
    <form className="flex justify-center">
      <ToastContainer />
      <div className="mt-16 flex gap-4 flex-wrap md:w-[536px] w-[416px]">
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">Nome do Grupo</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            value={groupData.groupName}
            name="groupName"
            onChange={handleGroupDataChange}
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">Número do contrato</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            value={groupData.contractNumber}
            name="contractNumber"
            onChange={handleGroupDataChange}
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">Apoio</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            value={groupData.support}
            name="support"
            onChange={handleGroupDataChange}
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">E-mail</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            value={groupData.email}
            name="email"
            onChange={handleGroupDataChange}
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">Responsável</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            value={groupData.responsible}
            name="responsible"
            onChange={handleGroupDataChange}
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">Telefone</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
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
              className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]"
              id="day1"
              type="checkbox"
              value="Segunda-feira"
              name="dayOfTheWeek"
              onChange={handleDayChange}
            />
            <label htmlFor="day1">Segunda</label>
          </div>
          <div className='flex gap-2'>
            <input 
              className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]"
              id="day2"
              type="checkbox"
              value="Terça-feira"
              name="dayOfTheWeek"
              onChange={handleDayChange}
            />
            <label htmlFor="day2">Terça</label>
          </div>
          <div className='flex gap-2'>
            <input 
              className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]"
              id="day3"
              type="checkbox"
              value="Quarta-feira"
              name="dayOfTheWeek"
              onChange={handleDayChange}
            />
            <label htmlFor="day3">Quarta</label>
          </div>
          <div className='flex gap-2'>
            <input 
              className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]"
              id="day4"
              type="checkbox"
              value="Quinta-feira"
              name="dayOfTheWeek"
              onChange={handleDayChange}
            />
            <label htmlFor="day4">Quinta</label>
          </div>
          <div className='flex gap-2'>
            <input 
              className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]"
              id="day5"
              type="checkbox"
              value="Sexta-feira"
              name="dayOfTheWeek"
              onChange={handleDayChange}
            />
            <label htmlFor="day5">Sexta</label>
          </div>          
          <div className='flex gap-2'>
            <input 
              className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]"
              id="day6"
              type="checkbox"
              value="Sábado"
              name="dayOfTheWeek"
              onChange={handleDayChange}
            />
            <label htmlFor="day6">Sábado</label>
          </div>
        </div>
        <div>
          <div className="flex flex-col md:w-[259px] w-[200px]">
            <label className="font-medium text-sm text-b600">Frequência</label>
            <select 
              className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]"
              name="frequency"
              onChange={handleGroupDataChange} 
            >
              <option value="Semanal">Semanal</option>
              <option value="Quinzenal">Quinzenal</option>
              <option value="Mensal">Mensal</option>
            </select>
          </div>
          <div className="flex flex-col md:w-[259px] w-[200px]">
            <label className="font-medium text-sm text-b600 mt-4">Horário de Início das Reuniões</label>
            <input 
              className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
              type="text"
              value={groupData.time}
              onChange={handleGroupDataChange}
              name="time"
            />
        </div>
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">CEP</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            maxLength={8}
            value={cepInput}
            onChange={handleCepChange}
            name="cep"
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">Estado</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            value={groupAddress?.state}
            name="state"
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">Cidade</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            value={groupAddress?.city}
            name="city"
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">Bairro</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]"
            type="text"
            value={groupAddress?.district}
            name="district"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="font-medium text-sm text-b600">Rua</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            value={groupAddress?.street}
            name="street"
          />
        </div>
        <button
          type="submit"
          className='bg-blue-500 cursor-pointer px-6 py-1 rounded-sm mt-3 text-white flex items-center gap-3'
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