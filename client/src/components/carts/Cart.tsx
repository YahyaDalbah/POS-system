import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCarts, showCart, startUpdating } from './CartsSlice';

interface CartProps {
    title: string,
    desc: string,
    id?: number
}

export default function Cart({title,desc,id}: CartProps) {
  const dispatch = useAppDispatch()
  const carts = useAppSelector(selectCarts)
  function handleClick(){
    if(!carts.adding && !carts.updating.updating)dispatch(showCart(id))
  }
  function handleUpdate(e: any){
    e.stopPropagation();
    if(!carts.adding && !carts.showingCart.showing)dispatch(startUpdating(id));
  }
  return (
    <div
      data-testid="cart"
      onClick={handleClick}
      className=" hover:bg-gray-200 font-light pr-16 pl-4 py-4 cursor-pointer border-r break-keep whitespace-normal border-gray-600"
    >
      <h1 data-testid="cartName" className="font-normal text-lg mb-2">
        {title}
      </h1>
      <p data-testid="cartDesc" className=" min-w-32">
        {desc}
      </p>
      <button
        onClick={handleUpdate}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-sm rounded-lg px-4 py-2 mr-2 mt-2 "
      >
        Update
      </button>
    </div>
  );
}
