import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  deleteProductsByCategory,
  filterByCategory,
  selectProducts,
} from "../Products/productsSlice";
import Swal from "sweetalert2";
import {
  deleteCategory,
  selectCategories,
  startUpdating,
  updateCategory,
} from "./categoriesSlice";
import { PropsPOSType } from "../Products/Products";
interface cate {
  activeLink: number;
  category: string;
  i?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setActiveLink: any;
}

type catePOS = cate & PropsPOSType;
export default function Category({
  activeLink,
  category,
  setActiveLink,
  i,
  pos,
}: catePOS) {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const products = useAppSelector(selectProducts);
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
        if(categories.updating.updating)dispatch(startUpdating({ id: i, category }));
      }
    });
  }

  function handleUpdate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    if (!products.adding && !products.updating.updating && !categories.adding)
      dispatch(startUpdating({ id: i, category }));
  }

  return (
    <div>
      <button
        data-testid="category"
        className={`${
          activeLink === i
            ? "bg-gray-900 text-white"
            : "text-gray-900 bg-gray-100 hover:bg-gray-200"
        } flex  focus:outline-none focus:ring-1 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2`}
        onClick={handleClick}
      >
        {category != "All" && !pos && (
          <div className="flex">
            <button
              className="-ml-1 mr-3 bg-gray-600 hover:bg-red-600 px-1.5 text-white rounded-full"
              onClick={handleDelete}
            >
              x
            </button>
            <button
              className="-ml-1 mr-3 bg-gray-600 hover:bg-blue-600 px-1.5 text-white rounded-full"
              onClick={handleUpdate}
            >
              u
            </button>
          </div>
        )}
        {category}
      </button>
    </div>
  );
}
