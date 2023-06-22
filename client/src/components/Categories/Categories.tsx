import { useState } from "react";
import Category from "./Category";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectCategories, startAdding } from "./categoriesSlice";
import { selectProducts } from "../Products/productsSlice";

export default function Categories() {
  const categories = useAppSelector(selectCategories);
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const [activeLink, setActiveLink] = useState(1);

  function handleClick() {
    if (!products.adding && !products.updating.updating) dispatch(startAdding());
  }
  const displayedCategories = categories.categories.map((category) => {
    return (
      <Category
        key={category.id}
        activeLink={activeLink}
        category={category.category}
        setActiveLink={setActiveLink}
        i={category.id}
      />
    );
  });
  return (
    <div className="">
      <h1 className="text-xl px-10 mb-5">Categories</h1>
      <div className="flex pt-6 pb-4 overflow-x-auto gap-x-2 scroll-p-1 bg-white pl-10 mx-2 rounded-md ">
        {displayedCategories}
        <button
          onClick={handleClick}
          className="flex justify-center items-center text-gray-900 bg-white border border-gray-800 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-200 font-medium rounded-full text-md px-5 py-1 mr-2 mb-2"
        >
          <span>Add </span> <span className="text-xl"> +</span>
        </button>
      </div>
    </div>
  );
}
