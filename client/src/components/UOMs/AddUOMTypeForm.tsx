import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../store/hooks";
import { addTypes, startAddingTypes } from "./UOMtypesSlice";
import TextInput from "../formInputs/TextInput";
import { addUOM } from "./UOMsSlice";
export default function AddUOMTypeForm() {
  const dispatch = useAppDispatch();

  return (
    <div className="text-gray-100">
      <Formik
        initialValues={{ type: "", base: "" }}
        validationSchema={Yup.object({
          type: Yup.string()
            .required("Required")
            .test("notNumber", "String must not be a number", (value) => {
              return isNaN(Number(value));
            }),
          base: Yup.string()
            .required("Required")
            .test("notNumber", "String must not be a number", (value) => {
              return isNaN(Number(value));
            }),
        })}
        onSubmit={(values) => {
          dispatch(addTypes(values));
          dispatch(startAddingTypes());
        }}
      >
        <Form className="flex flex-col">
          <div className="form-title">
            <h1 className="py-10 ">Add a Type</h1>
            <button
              type="button"
              onClick={() => {
                dispatch(startAddingTypes());
              }}
            >
              X
            </button>
          </div>
          <div className="flex flex-col mx-2">
            <TextInput type="text" label="Type name" name="type" id="type" />
            <TextInput
              type="text"
              label="base unit of measure"
              name="base"
              id="base"
            />
          </div>
          <button
            type="submit"
            className="self-center mt-16 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Add
          </button>
        </Form>
      </Formik>
    </div>
  );
}
