import React from "react";
import { UOM } from "../Products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteUOM, selectUOMs, startUpdating } from "./UOMsSlice";
import { selectTypes } from "./UOMtypesSlice";

export default function UOMCard({ id, name, type, base, convFactor }: UOM) {
  const uoms = useAppSelector(selectUOMs);
  const types = useAppSelector(selectTypes)
  const dispatch = useAppDispatch()

  function handleDelete(){
    dispatch(deleteUOM({id, name, base}))
    if(uoms.updating.updating)dispatch(startUpdating(id))
  }
  function handleUpdate(){
    if(!uoms.adding && !types.adding && !types.updating.updating)dispatch(startUpdating(id))
  }
  return (
    <div data-testid="uom" className="bg-gray-100 rounded-md px-10 py-5">
      <h1 data-testid="uomName" className="text-center mb-4 text-3xl">
        {convFactor == 1 ? base : name}
      </h1>
      <div className="text-gray-700">
        <p data-testid="uomBase">{base}</p>
        <p data-testid="uomType">type: {type}</p>
        <p data-testid="uomConvFactor">
          conversion factor: {Number(convFactor)}
        </p>
      </div>
      {convFactor != 1 && (
        <div className="flex justify-evenly mt-5">
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
          <button onClick={handleUpdate} className="update-button">
            Update
          </button>
        </div>
      )}
    </div>
  );
}
