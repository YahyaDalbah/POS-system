import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectProducts } from "./productsSlice";
import Product from "./Product";
import { fetchProducts } from "./productsSlice";

export default function Products() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  if (products.error != "") {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="border border-red-500 bg-red-500 p-10 rounded-full text-white text-5xl">
          X
        </p>
        <p className="text-white text-3xl ">{products.error}</p>
      </div>
    );
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
    />
  ));
  return (
    <div className="bg-white col-span-2 ">
      <div className="flex justify-center items-center py-10">
        <button className="text-gray-900 bg-white border border-gray-800 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2">
          Add a product
        </button>
        <select name="" id="">
          <option value=""></option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-10 pt-10 px-10">
        {displayedProducts}
      </div>
    </div>
  );
}
