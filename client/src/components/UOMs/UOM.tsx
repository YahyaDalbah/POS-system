import React from 'react'
import { UOM } from '../Products/productsSlice'
import { useAppSelector } from '../../store/hooks'
import { selectUOMs } from './UOMsSlice'
import Loading from '../Products/Loading'

export default function UOMCard({id,name,type,base,convFactor}: UOM) {
    const uoms = useAppSelector(selectUOMs)
    
  return (
    <div className='bg-gray-100 rounded-md px-10 py-5' >
        <h1 className='text-center mb-4 text-3xl'>{name}</h1>
        <p>base unit: {base}</p>
        <p>type: {type}</p>
        <p>conversion factor: {convFactor}</p>
    </div>
  )
}
