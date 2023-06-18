import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addProduct, startAdding } from "./productsSlice";
import TextInput from "../formInputs/TextInput";
import SelectInput from "../formInputs/SelectInput";
import { selectCategories } from "../Categories/categoriesSlice";

export default function AddProductForm() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  const categoriesOptions = categories.categories.slice(1).map((category) => {
    return <option value={category.category}>{category.category}</option>;
  });
  return (
    <div className="text-gray-100">
      <Formik
        initialValues={{
          product: "",
          price: 0,
          category: "",
          uom: "",
          image: "",
        }}
        validationSchema={Yup.object({
          product: Yup.string().required("Required"),
          price: Yup.number().required("Required").moreThan(0),
          category: Yup.string().required("Must select a category"),
          uom: Yup.string().required("Must select a UOM"),
        })}
        onSubmit={(values) => {
          // dispatch(addProduct({""}))
          dispatch(startAdding());
        }}
      >
        <Form className="flex flex-col">
          <h1 className="text-xl bg-lightGray p-5 py-10 mb-10">
            Add a product
          </h1>
          <div className="flex flex-col mx-2">
            <TextInput
              type="text"
              label="Product name"
              name="product"
              id="product"
            />
            <TextInput
              type="number"
              label="Product price"
              name="price"
              id="price"
            />
            <SelectInput label="Category" name="category" id="category">
              <option value="">Select a category</option>
              {categoriesOptions}
            </SelectInput>
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
