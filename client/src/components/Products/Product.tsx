import React from "react";
import { ProductType, deleteProduct, selectProducts, startUpdating } from "./productsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectCategories } from "../Categories/categoriesSlice";

export default function Product({
  id,
  name,
  category,
  price,
  uom,
  image,
}: ProductType) {
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories)
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(deleteProduct(id));
  }
  function handleUpdate() {
    if (!products.adding && !categories.adding) dispatch(startUpdating(id));
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
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
        <button onClick={handleUpdate} className="update-button">
          Update
        </button>
      </div>
    </div>
  );
}
