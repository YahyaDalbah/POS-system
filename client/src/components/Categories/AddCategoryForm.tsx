import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../store/hooks";
import { addCategory, startAdding } from "../Categories/categoriesSlice";
import TextInput from "../formInputs/TextInput";

export default function AddProductForm() {
  const dispatch = useAppDispatch();

  return (
    <div className="text-gray-100">
      <Formik
        initialValues={{ category: "" }}
        validationSchema={Yup.object({
          category: Yup.string().required("Required"),
        })}
        onSubmit={(values) => {
          dispatch(addCategory(values));
          dispatch(startAdding());
        }}
      >
        <Form className="flex flex-col">
          <h1 className="text-xl bg-lightGray p-5 py-10 mb-10">
            Add a Category
          </h1>
          <div className="flex flex-col mx-2">
            <TextInput type="text" label="Category name" name="category" id="category" />
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
