import { useEffect, useState } from 'react';
import { IAddress } from '../interfaces/IAddress'
import { IAddressEN } from '../interfaces/IAddressEN'
import axios from 'axios'
import { IUserData } from '../interfaces/IUserData';

function registerGroupForm() {
  const [dataGroup, setDataGroup] = useState<IAddressEN | null>(null);
  const [cepInput, setCepInput] = useState('')
  const [userData, setUserData] = useState<IUserData>({
    responsible: '',
    contractNumber: ''
  });
  //const [payload, setPayload] = useState('')

  const getCep = async (cep:string) => {
    try {
      const { data } = await axios.get<IAddress>(`https://viacep.com.br/ws/${cep}/json/`)
      const { estado: state, localidade: city, bairro: district, logradouro: street} = data
      setDataGroup({state, city, district, street})

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

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const { name, value } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  //console.log(userData) verificar pq userdata "muda" quando o cep é digitado

  const handleCreateGroups = async (event) => {
    event.preventDefault();
    const payload = {
      state: dataGroup?.state,
      city: dataGroup?.city,
      district: dataGroup?.district,
      street: dataGroup?.street,
      responsible: userData.responsible,
      contractNumber: userData.contractNumber,
      cep: cepInput
    };
    

    console.log(payload)
    await axios.post("https://oz962m8g4e.execute-api.us-east-1.amazonaws.com/groups", payload)
    //setDataGroups(data)
  }


  return (
    <form className="flex justify-center">
      <div className="mt-16 flex gap-4 flex-wrap md:w-[536px] w-[416px]">
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">Responsável</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            value={userData.responsible}
            name="responsible"
            onChange={handleUserDataChange}
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">Número do contrato</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            value={userData.contractNumber}
            name="contractNumber"
            onChange={handleUserDataChange}
          />
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
            value={dataGroup?.state}
            name="state"
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">Cidade</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            value={dataGroup?.city}
            name="city"
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">Bairro</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]"
            type="text"
            value={dataGroup?.district}
            name="district"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="font-medium text-sm text-b600">Rua</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            value={dataGroup?.street}
            name="street"
          />
        </div>
        <button
          className='bg-blue-500 cursor-pointer px-8 py-1 rounded-sm mt-3'
          onClick={handleCreateGroups}
        >
          POST  
      </button>
      </div>
    </form>
  )
}

export default registerGroupForm;