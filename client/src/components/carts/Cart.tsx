import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCarts, showCart } from './CartsSlice';

interface CartProps {
    title: string,
    desc: string,
    id?: number
}

export default function Cart({title,desc,id}: CartProps) {
  const dispatch = useAppDispatch()
  const carts = useAppSelector(selectCarts)
  function handleClick(){
    if(!carts.adding)dispatch(showCart(id))
  }
  return (
    <div onClick={handleClick} className=" hover:bg-gray-200 font-light pr-16 pl-4 py-4 cursor-pointer border-r break-keep whitespace-normal border-gray-600">
      <h1 className="font-normal text-lg mb-2">{title}</h1>
      <p className=" min-w-32">{desc}</p>
    </div>
  );
}
