import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { filterByCategory } from "../Products/productsSlice";
interface cate {
  activeLink: number;
  category: string;
  i: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setActiveLink: any;
}
export default function Category({
  activeLink,
  category,
  setActiveLink,
  i,
}: cate) {
  const dispatch = useAppDispatch();
  function handleClick() {
    if (activeLink !== i) {
      dispatch(filterByCategory(category));
    }
    setActiveLink(i);
  }
  return (
    <div>
      <button
        className={`${
          activeLink === i
            ? "bg-gray-900 text-white"
            : "text-gray-900 bg-gray-100 hover:bg-gray-200"
        }   focus:outline-none focus:ring-1 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2`}
        onClick={handleClick}
      >
        {category}
      </button>
    </div>
  );
}
