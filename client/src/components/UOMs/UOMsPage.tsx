import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUOMs, startAdding } from "./UOMsSlice";
import UOMtype from "./UOMtype";
import UOMs from "./UOMs";
import UOM from "./UOM";
import { addTypes, selectTypes, startAddingTypes } from "./UOMtypesSlice";
import AddUOMTypeForm from "./addUOMTypeForm";
import AddUOMForm from "./AddUOMForm";

export default function UOMsPage() {
  const dispatch = useAppDispatch();
  const uoms = useAppSelector(selectUOMs);
  const types = useAppSelector(selectTypes);
  const [activeLink, setActiveLink] = useState(0);

  if (uoms.error) {
    return (
      <div className=" bg-white text-lightBlack col-span-4 flex flex-col justify-center items-center">
        <p className="border text-gray-500 border-red-500 bg-red-500 p-10 rounded-full text-5xl">
          X
        </p>
        <p className="text-3xl ">{uoms.error}</p>
      </div>
    );
  }
  function handleClick() {
    if (!uoms.adding) dispatch(startAddingTypes());
  }
  const displayedUOMsTypes = types.types.map((type) => (
    <UOMtype
      type={type.type}
      i={type.id}
      activeLink={activeLink}
      setActiveLink={setActiveLink}
      base={type.base}
    />
  ));

  return (
    <div className="main-page">
      <div
        className={`bg-gray-200 col-span-${
          uoms.adding || types.adding ? 3 : 4
        } text-gray-900 `}
      >
        <div className="font-medium flex p-10 pr-32 bg-white items-center">
          <h1 className="text-xl">Units of measure</h1>
          <div className="flex justify-center grow"></div>
        </div>
        <div className="text-black font-semibold  mt-14">
          <h1 className="text-xl px-10 mb-5">Types</h1>
          <div className="flex pt-6 pb-4 overflow-x-auto gap-x-2 scroll-p-1 bg-white px-10 mx-2 rounded-md items-center">
            {
              <UOMtype
                i={0}
                type={"All"}
                activeLink={activeLink}
                setActiveLink={setActiveLink}
                base={""}
              />
            }
            {displayedUOMsTypes}
            <button
              onClick={handleClick}
              className="flex justify-center items-center text-gray-900 bg-white border border-gray-800 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-200 font-medium rounded-full text-md px-5 py-1 mr-2 mb-2"
            >
              <span>Add </span> <span className="text-xl"> +</span>
            </button>
          </div>
          <UOMs />
        </div>
      </div>

      {types.adding && <AddUOMTypeForm />}
      {uoms.adding && <AddUOMForm />}
    </div>
  );
}
