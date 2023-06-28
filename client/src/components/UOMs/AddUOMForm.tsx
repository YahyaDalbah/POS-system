import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../formInputs/TextInput";
import { addUOM, startAdding, startUpdating, updateUOM } from "./UOMsSlice";
import SelectInput from "../formInputs/SelectInput";
import { selectTypes } from "./UOMtypesSlice";
interface PropsType {
  update?: boolean;
  id?: number;
}
export default function AddUOMForm({ update, id }: PropsType) {
  const dispatch = useAppDispatch();
  const types = useAppSelector(selectTypes);

  const typesOptions = types.types.map((type) => (
    <option value={type.type}>{type.type}</option>
  ));
  return (
    <div className="text-gray-100">
      <Formik
        initialValues={{ type: "", base: "", name: "", convFactor: 0 }}
        validationSchema={Yup.object({
          type: !update
            ? Yup.string()
                .required("Must select type")
                .test("notNumber", "String must not be a number", (value) => {
                  return isNaN(Number(value));
                })
            : Yup.string(),
          name: !update
            ? Yup.string()
                .required("Must specify name")
                .test("notNumber", "String must not be a number", (value) => {
                  return isNaN(Number(value));
                })
            : Yup.string(),
          convFactor: !update ? Yup.number()
            .required("Required")
            .moreThan(0)
            .test(
              "notEqual",
              "Number must not be equal to 1",
              (value) => value !== 1
            ) : Yup.number()
        })}
        onSubmit={(values) => {
          if (update) {
            const filteredObject = Object.fromEntries(
              Object.entries(values).filter(([_, value]) => {
                if (typeof value === "string") {
                  return value !== "";
                } else {
                  return value !== 0;
                }
              })
            );
            dispatch(updateUOM({ id, ...filteredObject }));
            dispatch(startUpdating(id));
          } else {
            dispatch(addUOM(values));
            dispatch(startAdding());
          }
        }}
      >
        {(formikProps) => (
          <Form className="flex flex-col">
            <div className="form-title">
              <h1 className="py-10 ">{update ? "Update UOM" : "Add a UOM"}</h1>
              <button
                type="button"
                onClick={() => {
                  if (update) {
                    dispatch(startUpdating(id));
                  } else {
                    dispatch(startAdding());
                  }
                }}
              >
                X
              </button>
            </div>
            <div className="flex flex-col mx-2">
              <TextInput type="text" label="Name" name="name" id="name" />
              <SelectInput
                onChange={(event: any) => {
                  const selectedValue = event.target.value;
                  formikProps.handleChange(event);
                  const updatedBaseValue = types.types.find(
                    (type) => type.type == selectedValue
                  )?.base;
                  formikProps.setFieldValue("base", updatedBaseValue);
                }}
                label="Type name"
                name="type"
                id="type"
              >
                <option value="">Select a type</option>
                {typesOptions}
              </SelectInput>
              <TextInput
                type="text"
                label="base unit of measure"
                name="base"
                id="base"
                disabled={true}
              />
              <TextInput
                type="number"
                label="conversion factor"
                name="convFactor"
                id="convFactor"
              />
            </div>
            <button
              type="submit"
              className="self-center mt-16 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              {update ? "Update" : "Add"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
