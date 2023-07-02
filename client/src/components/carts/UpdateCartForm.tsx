import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import TextInput from "../formInputs/TextInput";
import { startUpdating, updateCart } from "./CartsSlice";

export default function UpdateCartForm({id}:{id?:number}) {
  const dispatch = useAppDispatch();
  return (
    <div className="bg-lightBlack">
      <div className="text-gray-100">
        <Formik
          initialValues={{
            title: "",
            desc: "",
            tax: 0,
            discount: 0,
          }}
          validationSchema={Yup.object({})}
          onSubmit={(values) => {
            const filteredObject = Object.fromEntries(
              Object.entries(values).filter(([_, value]) => {
                if (typeof value === "string") {
                  return value !== "";
                } else {
                  return value !== 0;
                }
              })
            );
            dispatch(updateCart({ id, ...filteredObject }));
            dispatch(startUpdating(id));
          }}
        >
          <Form className="flex flex-col">
            <div className="form-title">
              <h1 className="py-10 ">{`Update cart`}</h1>
              <button
                type="button"
                onClick={() => {
                  dispatch(startUpdating(id));
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
              <TextInput
                type="number"
                label="tax percent (keep it 0 if u don't want to change it)"
                name="tax"
                id="tax"
              />
              <TextInput
                type="number"
                label="discount percent (keep it 0 if u don't want to change it)"
                name="discount"
                id="discount"
              />
            </div>
            <button
              data-testid="submitUpdateCartForm"
              type="submit"
              className="self-center mt-16 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              {`Update`}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
