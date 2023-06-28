import React from "react";
import UOM from "./UOM";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUOMs, startAdding } from "./UOMsSlice";
import Loading from "../Products/Loading";
import { selectTypes } from "./UOMtypesSlice";

export default function UOMs() {
  const uoms = useAppSelector(selectUOMs);
  const types = useAppSelector(selectTypes);
  const dispatch = useAppDispatch();

  function handleClick() {
    if (!types.adding && !uoms.updating.updating && !types.updating.updating) dispatch(startAdding());
  }
  const displayedUOMs = uoms.UOMs.length > 0 ? uoms.UOMs.filter(uom => uoms.currType && uoms.currType != "All" ? uom.type == uoms.currType : true).map((uom) => {
    return <UOM {...uom} />;
  }) : "no UOMs"
  return (
    <div className=" mt-12">
      <div className="pl-10 mb-5 flex gap-x-10">
        <h1 className="text-xl pt-1">Units of measure</h1>
        <button onClick={handleClick} className="add-button">
          Add a UOM
        </button>
      </div>
      <div className="bg-white grid grid-cols-3 mx-2 rounded-md pl-7 py-4 gap-8">
        {displayedUOMs}
      </div>
    </div>
  );
}
