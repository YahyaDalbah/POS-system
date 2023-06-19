import React from "react";
import UOM from "./UOM";
import { useAppSelector } from "../../store/hooks";
import { selectUOMs } from "./UOMsSlice";
import Loading from "../Products/Loading";

export default function UOMs() {
  const uoms = useAppSelector(selectUOMs);
  if (uoms.loading) {
    return (
      <div className="mt-12">
        <div className="bg-white grid grid-cols-3 mx-2 rounded-md pl-7 py-4 gap-8">
          <Loading />
          <Loading />
          <Loading />
          <Loading />
          <Loading />
          <Loading />
          <Loading />
          <Loading />
          <Loading />
        </div>
      </div>
    );
  }
  const displayedUOMs = uoms.UOMs.map((uom) => {
    return <UOM {...uom} />;
  });
  return (
    <div className=" mt-12">
      <h1 className="pl-10 mb-5 text-xl">Units of measure</h1>
      <div className="bg-white grid grid-cols-3 mx-2 rounded-md pl-7 py-4 gap-8">
        {displayedUOMs}
      </div>
    </div>
  );
}
