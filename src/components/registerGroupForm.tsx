import { useEffect, useState } from 'react';
import { IAddress } from '../interfaces/IAddress'
import axios from 'axios'

function registerGroupForm() {
  const [fullAddress, setFullAddress] = useState<IAddress | null>(null);
  const [zipCode, setZipCode] = useState('')

  const getCep = async (zipCode:string): Promise<void> => {
    if (zipCode?.length == 8) {
      const { data } = await axios.get<IAddress>(`https://viacep.com.br/ws/${zipCode}/json/`)
      console.log(data)
      setFullAddress(data)
    }
  }

  useEffect(() => {
    getCep(zipCode)
  }, [zipCode])

  return (
    <form className="flex justify-center">
      <div className="mt-16 flex gap-4 flex-wrap md:w-[536px] w-[416px]">
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">CEP</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            maxLength="8"
            value={zipCode}
            onChange={e => setZipCode(e.target.value.replace(/\D/g, ''))}
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">Estado</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            value={fullAddress?.estado}
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">Cidade</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            value={fullAddress?.localidade}
          />
        </div>
        <div className="flex flex-col md:w-[259px] w-[200px]">
          <label className="font-medium text-sm text-b600">Bairro</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]"
            type="text"
            value={fullAddress?.bairro}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="font-medium text-sm text-b600">Rua</label>
          <input 
            className="py-[10px] px-[15px] border-1 border-b100 rounded-[4px]" 
            type="text"
            value={fullAddress?.logradouro}
          />
        </div>
      </div>
    </form>
  )
}

export default registerGroupForm;