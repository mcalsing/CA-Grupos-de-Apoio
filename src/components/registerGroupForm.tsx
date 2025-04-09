import { useState } from 'react';
import { IAddress } from '../interfaces/IAddress'
import axios from 'axios'
import { IUserData } from '../interfaces/IUserData';

function registerGroupForm() {
  const [dataGroup, setDataGroup] = useState<IAddress | null>(null);
  const [cepInput, setCepInput] = useState('')
  const [userData, setUserData] = useState<IUserData>({
    responsible: '',
    contractNumber: ''
  });

  const getCep = async (cep:string): Promise<void> => {
    const { data } = await axios.get<IAddress>(`https://viacep.com.br/ws/${cep}/json/`)
    setDataGroup(data)
  }

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            value={dataGroup?.estado}
            name="state"
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">Cidade</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            value={dataGroup?.localidade}
            name="city"
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">Bairro</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]"
            type="text"
            value={dataGroup?.bairro}
            name="district"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="font-medium text-sm text-b600">Rua</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            value={dataGroup?.logradouro}
            name="street"
          />
        </div>
      </div>
    </form>
  )
}

export default registerGroupForm;