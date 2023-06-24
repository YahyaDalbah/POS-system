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
    dispatch(deleteUOM(id))
  }
  function handleUpdate(){
    if(!uoms.adding && !types.adding && !types.updating.updating)dispatch(startUpdating(id))
  }
  return (
    <div className="bg-gray-100 rounded-md px-10 py-5">
      <h1 className="text-center mb-4 text-3xl">
        {convFactor == 1 ? base : name}
      </h1>
      <div className="text-gray-700">
        <p>base unit: {base}</p>
        <p>type: {type}</p>
        <p>conversion factor: {convFactor}</p>
      </div>
      {convFactor != 1 && (
        <div className="flex justify-evenly mt-5">
          <button onClick={handleDelete} className="delete-button">Delete</button>
          <button onClick={handleUpdate} className="update-button">Update</button>
        </div>
      )}
    </div>
  );
}
