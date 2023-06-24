import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectProducts, startAdding } from "./productsSlice";
import Product from "./Product";
import Loading from "./Loading";
import { selectCategories } from "../Categories/categoriesSlice";

export interface PropsPOSType {
  pos?: boolean
}
export default function Products({pos}: PropsPOSType) {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories)
  
  function handleClick() {
    if (
      !categories.adding &&
      !products.updating.updating &&
      !categories.updating.updating
    ) {
      dispatch(startAdding());
    }
  }
  const displayedProducts = products.products.map((product) => (
    <Product
      key={product.id}
      id={product.id}
      name={product.name}
      image={product.image}
      category={product.category}
      price={product.price}
      uom={product.uom}
      pos={pos}
    />
  ));
  return (
    <div className="mt-12">
      <div className="pl-10 mb-5 flex gap-x-10">
        <h1 className="text-xl pt-1">Products</h1>
        {!pos && <button onClick={handleClick} className="add-button">
          Add a product
        </button>}
      </div>
      <div className="bg-white grid grid-cols-3 mx-2 pl-2 rounded-md py-6 gap-y-8">
        {displayedProducts}
      </div>
    </div>
  );
}
