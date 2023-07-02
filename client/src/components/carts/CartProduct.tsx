import React from 'react'
import { CartProductType, CartType, deleteCartProduct, selectCarts } from './CartsSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function CartProduct({id,name,price,uom,qty}: CartProductType) {
  const dispatch = useAppDispatch()
  const carts = useAppSelector(selectCarts);

  const cart = carts.carts.find(
    (cart) => cart.id == carts.showingCart.id
  ) as CartType;
  function handleDelete(){
    if(id && cart.id)dispatch(deleteCartProduct({cartId: cart.id, ProductId: id}))
  }
  return (
    <div data-testid="cartProduct" className="flex justify-between rounded-lg bg-lightGray px-2 py-3 mb-3">
      <div className='flex items-center'>
        <button
          className="-ml-1 mr-3 h-6 bg-gray-600 hover:bg-red-600 px-1.5 text-white rounded-full"
          onClick={handleDelete}
        >
          x
        </button>
        <p>
          {name}{" "}
          <span className=" text-gray-400">
            x{qty} ({uom})
          </span>
        </p>
      </div>
      <p data-testid="cartProductPrice">${price * qty}</p>
    </div>
  );
}
