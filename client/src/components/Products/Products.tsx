import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectProducts } from "./productsSlice";
import Product from "./Product";
import Loading from "./Loading";


export default function Products() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  
  if (products.loading) {
    return (
      <div className="bg-white col-span-4 grid grid-cols-3 auto-rows-min gap-10 p-10">
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
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
    <div className="grid grid-cols-3 gap-10 pt-10 px-10">
      {displayedProducts}
    </div>
  );
}
