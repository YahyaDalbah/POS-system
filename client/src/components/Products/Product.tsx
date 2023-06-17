import React from "react";
import { ProductType, selectProducts } from "./productsSlice";
import { useAppSelector } from "../../store/hooks";
import Loading from "./Loading";

export default function Product({
  id,
  name,
  category,
  price,
  uom,
  image,
}: ProductType) {

  const products = useAppSelector(selectProducts);

  if(products.loading){
    return (
      <Loading />
    )
  }
  return (
    <div className="flex flex-col text-black">
      <div className="flex justify-center">
        <img src={image} alt="image" className=" w-36 h-36" />
      </div>
      <div className="flex flex-col justify-evenly text-gray-600 pt-5 gap-y-2 items-center text-left">
        <h1 className="text-2xl font-semibold text-lightBlack">{name}</h1>
        <p>
          {price * uom.convFactor}$ per {uom.base}
        </p>
        <p>{category}</p>
      </div>
      <div className="flex justify-evenly mt-3">
        <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
          Delete
        </button>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Update
        </button>
      </div>
    </div>
  );
}
