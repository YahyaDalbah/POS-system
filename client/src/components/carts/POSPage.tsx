import React from "react";
import Categories from "../Categories/Categories";
import Products from "../Products/Products";
import Carts from "./Carts";
import { useAppSelector } from "../../store/hooks";
import { selectCarts } from "./CartsSlice";
import AddCartForm from "./AddCartForm";
import CartDisplay from "./CartDisplay";

export default function POSPage() {
  const carts = useAppSelector(selectCarts)
  return (
    <div className="main-page">
      <div className={`h-full bg-gray-200 text-gray-900 col-span-${carts.adding || carts.showingCart.showing ? 3 : 4} flex flex-col justify-between`}>
        <div>
          <div className="font-medium flex p-10 bg-white items-center">
            <h1 className="text-xl">POS page</h1>
          </div>
          <div className="font-semibold  mt-14">
            <Categories pos={true} />
            <Products pos={true} />
          </div>
        </div>
        <Carts />
      </div>
      {carts.adding && <AddCartForm />}
      {carts.showingCart.showing && <CartDisplay />}
    </div>
  );
}
