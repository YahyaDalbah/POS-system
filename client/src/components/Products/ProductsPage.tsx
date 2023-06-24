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
  //col-span-3
  return (
    <div className="main-page">
      <div
        className={`bg-gray-200 text-gray-900 col-span-${
          products.adding ||
          categories.adding ||
          products.updating.updating ||
          categories.updating.updating
            ? 3
            : 4
        }`}
      >
        <div className="font-medium flex p-10 pr-32 bg-white items-center">
          <h1 className="text-xl">Products</h1>
        </div>
        <div className="font-semibold  mt-14">
          <Categories />
          <Products />
        </div>
      </div>
      {categories.adding && <AddCategoryForm />}
      {products.adding && <AddProductForm />}
      {products.updating.updating && (
        <AddProductForm update={true} id={products.updating.id} />
      )}
      {categories.updating.updating && (
        <AddCategoryForm update={true} id={categories.updating.id} />
      )}
    </div>
  );
}
