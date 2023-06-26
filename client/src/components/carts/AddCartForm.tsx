import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CartType, addCart, startAdding } from "./CartsSlice";
import TextInput from "../formInputs/TextInput";

const initialValues: CartType = {
  title: "",
  desc: "",
  tax: 0,
  discount: 0,
  cartProducts: [],
};

export default function AddCartForm() {
  const dispatch = useAppDispatch();
  return (
    <div className="bg-lightBlack">
      <div className="text-gray-100">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            title: Yup.string().required("Must specify cart's title"),
          })}
          onSubmit={(values) => {
            dispatch(addCart(values));
            dispatch(startAdding());
          }}
        >
          <Form className="flex flex-col">
            <div className="form-title">
              <h1 className="py-10 ">{`Add cart`}</h1>
              <button
                type="button"
                onClick={() => {
                  dispatch(startAdding());
                }}
              >
                X
              </button>
            </div>
            <div className="flex flex-col mx-2">
              <TextInput
                type="text"
                label="Cart name"
                name="title"
                id="title"
              />
              <TextInput
                type="text"
                label="Cart description"
                name="desc"
                id="desc"
              />
            </div>
            <button
              type="submit"
              className="self-center mt-16 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              {`Add`}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
