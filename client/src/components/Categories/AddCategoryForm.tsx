import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../store/hooks";
import { addCategory, startAdding, startUpdating, updateCategory } from "../Categories/categoriesSlice";
import TextInput from "../formInputs/TextInput";

export interface PropsUpdateFormType {
  update?: boolean;
  id?: number;
}
export default function AddCategoryForm({update, id}: PropsUpdateFormType) {
  const dispatch = useAppDispatch();

  return (
    <div className="text-gray-100">
      <Formik
        initialValues={{ category: "" }}
        validationSchema={Yup.object({
          category: Yup.string().required("Required"),
        })}
        onSubmit={(values) => {
          if (update) {
            dispatch(updateCategory({ id, ...values }));
            dispatch(startUpdating(id));
          } else {
            dispatch(addCategory(values));
            dispatch(startAdding());
          }
        }}
      >
        <Form className="flex flex-col">
          <div className="form-title">
            <h1 className="py-10 ">{`${
              update ? "Update" : "Add"
            } a Category`}</h1>
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
            <TextInput
              type="text"
              label="Category name"
              name="category"
              id="category"
            />
          </div>
          <button
            type="submit"
            className="self-center mt-16 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            {`${update ? "Update" : "Add"}`}
          </button>
        </Form>
      </Formik>
    </div>
  );
}
