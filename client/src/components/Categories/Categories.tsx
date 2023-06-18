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
    if (!products.adding) dispatch(startAdding());
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
    <div className="text-black font-semibold px-10">
      <h1 className="text-xl">Categories</h1>
      <div className="flex pt-8 overflow-x-auto gap-x-2 scroll-p-1">
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
