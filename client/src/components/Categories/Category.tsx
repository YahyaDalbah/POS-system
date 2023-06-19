import React from "react";
import { useAppDispatch } from "../../store/hooks";
import {
  deleteProductsByCategory,
  filterByCategory,
} from "../Products/productsSlice";
import Swal from "sweetalert2";
import { deleteCategory } from "./categoriesSlice";
interface cate {
  activeLink: number;
  category: string;
  i?: number;
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
  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();

    Swal.fire({
      title: "Are you sure?",
      text: "You will delete the category and all related products!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory({ category, id: i }));
        dispatch(deleteProductsByCategory(category));
      }
    });
  }
  return (
    <div>
      <button
        className={`${
          activeLink === i
            ? "bg-gray-900 text-white"
            : "text-gray-900 bg-gray-100 hover:bg-gray-200"
        } flex  focus:outline-none focus:ring-1 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2`}
        onClick={handleClick}
      >
        {category != "All" && (
          <button
            className="-ml-1 mr-3 bg-gray-600 hover:bg-red-600 px-1.5 text-white rounded-full"
            onClick={handleDelete}
          >
            x
          </button>
        )}
        {category}
      </button>
    </div>
  );
}
