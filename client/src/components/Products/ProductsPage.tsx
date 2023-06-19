import React, { useState } from "react";
import Categories from "../Categories/Categories";
import Products from "./Products";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectProducts, startAdding } from "./productsSlice";
import { selectCategories } from "../Categories/categoriesSlice";
import AddCategoryForm from "../Categories/AddCategoryForm";
import AddProductForm from "./AddProductForm";

export default function ProductsPage() {
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  function handleClick() {
    if (!categories.adding) {
      dispatch(startAdding());
    }
  }
  if (products.error) {
    return (
      <div className=" bg-white text-lightBlack col-span-4 flex flex-col justify-center items-center">
        <p className="border text-gray-500 border-red-500 bg-red-500 p-10 rounded-full text-5xl">
          X
        </p>
        <p className="text-3xl ">{products.error}</p>
      </div>
    );
  }
  //col-span-3
  return (
    <div className="main-page">
      <div
        className={`bg-white col-span-${
          products.adding || categories.adding ? 3 : 4
        }`}
      >
        <div className="flex justify-center items-center py-10">
          <button
            onClick={handleClick}
            className="text-gray-900 bg-white border border-gray-800 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Add a product
          </button>
        </div>
        <Categories />
        <Products />
      </div>
      {categories.adding && <AddCategoryForm />}
      {products.adding && <AddProductForm />}
    </div>
  );
}
