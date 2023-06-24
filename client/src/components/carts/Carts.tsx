import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectCarts, startAdding } from "./CartsSlice";
import Cart from "./Cart";

export default function Carts() {
  const carts = useAppSelector(selectCarts);
  const dispatch = useAppDispatch()
  const displayedCarts = carts.carts.map((cart) => {
    return <Cart id={cart.id} desc={cart.desc} title={cart.title} />;
  });

  function handleClick(){
    if(!carts.showingCart.showing && !carts.updating.updating)dispatch(startAdding());
  }
  return (
    <div>
      <div className="pl-10 flex gap-x-10 mt-12">
        <h1 className="text-xl pt-1 font-medium">Carts</h1>
        <button onClick={handleClick} className="add-button">Add cart</button>
      </div>
      <div className="flex bg-white overflow-x-auto border-t border-t-gray-600">
        {displayedCarts}
      </div>
    </div>
  );
}
