import React from 'react'
import { CartProductType } from './CartsSlice'

export default function CartProduct({name,price,uom,qty}: CartProductType) {

  return (
    <div className="flex justify-between rounded-lg bg-lightGray px-2 py-3 mb-3">
      <p>
        {name}{" "}
        <span className=" text-gray-400">
          x{qty} ({uom})
        </span>
      </p>
      <p>${price * qty}</p>
    </div>
  );
}
