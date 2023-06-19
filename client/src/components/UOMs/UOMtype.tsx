import React from "react";

interface UOMProps {
  activeLink: number;
  setActiveLink: any;
  i?: number;
  type: string;
}

export default function UOMtype({
  type,
  activeLink,
  setActiveLink,
  i,
}: UOMProps) {
  return (
    <div>
      <button
        className={`${
          activeLink === i
            ? "bg-gray-900 text-white"
            : "text-gray-900 bg-gray-100 hover:bg-gray-200"
        } flex  focus:outline-none focus:ring-1 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2`}
        // onClick={handleClick}
      >
        {type != "All" && <button
          className="-ml-1 mr-3 bg-gray-600 hover:bg-red-600 px-1.5 text-white rounded-full"
          //   onClick={handleDelete}
        >
          x
        </button>}
        {type}
      </button>
    </div>
  );
}
