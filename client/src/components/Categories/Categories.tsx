import { useState } from "react";
import Category from "./Category";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectCategories, startAdding } from "./categoriesSlice";


export default function Categories() {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const [activeLink, setActiveLink] = useState(0);

  function handleClick() {
    dispatch(startAdding());
  }
  const displayedCategories = categories.categories.map((category, i) => {
    return (
      <Category
        key={i}
        activeLink={activeLink}
        category={category.category}
        setActiveLink={setActiveLink}
        i={i}
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
