import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { deleteUOMsByType, filterUomByType } from "./UOMsSlice";
import Swal from "sweetalert2";
import { deleteType } from "./UOMtypesSlice";
import { deleteProductsByType } from "../Products/productsSlice";

interface UOMProps {
  activeLink: number;
  setActiveLink: any;
  i?: number;
  type: string;
  base: string
}

export default function UOMtype({
  type,
  activeLink,
  setActiveLink,
  i,
  base
}: UOMProps) {
  const dispatch = useAppDispatch();
  function handleClick() {
    if (activeLink !== i) {
      dispatch(filterUomByType(type));
    }
    setActiveLink(i);
  }
  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();

    Swal.fire({
      title: "Are you sure?",
      text: "You will delete the type and all related products and UOMs!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteType({ type, id: i,base }));
        dispatch(deleteUOMsByType(type));
        dispatch(deleteProductsByType(type));
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
        {type != "All" && (
          <button
            className="-ml-1 mr-3 bg-gray-600 hover:bg-red-600 px-1.5 text-white rounded-full"
            onClick={handleDelete}
          >
            x
          </button>
        )}
        {type}
      </button>
    </div>
  );
}
