import React from 'react'
import CartProduct from './CartProduct';
import { CartType, selectCarts, stopShowing } from './CartsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function CartDisplay() {
    const dispatch = useAppDispatch()
    const carts = useAppSelector(selectCarts)

    const cart = carts.carts.find(cart => cart.id == carts.showingCart.id) as CartType

    const cartProducts = cart.cartProducts.map(cart => {
        return <CartProduct {...cart}  />
    })
  return (
    <div className="text-gray-100 overflow-x-auto">
      <div className="flex flex-col">
        <div className="form-title">
          <div className="py-10 ">
            <h1 className="">{cart.title}</h1>
            <p className="text-sm mt-3">{cart.desc}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              dispatch(stopShowing());
            }}
          >
            X
          </button>
        </div>
        <div className="flex flex-col mx-2">
          {cart.cartProducts.length > 0 ? cartProducts : "no products"}
        </div>
        <div className="bg-lightGray p-2 mx-2 rounded-lg flex flex-col gap-y-2">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>$100</p>
          </div>
          <div className="flex justify-between">
            <p>tax 10%</p>
            <p>$10</p>
          </div>
          <div className="flex justify-between">
            <p>discount 10%</p>
            <p>$10</p>
          </div>
          <div className=" mt-4 pt-6 text-2xl flex justify-between border-t border-t-gray-600 border-dashed">
            <p>Total</p>
            <p>$99</p>
          </div>
        </div>
        <button className="self-center mt-16 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          {`Checkout`}
        </button>
      </div>
    </div>
  );
}
