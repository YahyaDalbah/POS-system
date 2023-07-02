import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addProduct,
  startAdding,
  startUpdating,
  updateProduct,
} from "./productsSlice";
import TextInput from "../formInputs/TextInput";
import SelectInput from "../formInputs/SelectInput";
import { selectCategories } from "../Categories/categoriesSlice";
import { selectUOMs } from "../UOMs/UOMsSlice";

interface PropsType {
  update?: boolean;
  id?: number;
}

export default function AddProductForm({ update, id }: PropsType) {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const uoms = useAppSelector(selectUOMs);

  const categoriesOptions = categories.categories.map((category) => {
    return <option data-testid="category-option" value={category.category}>{category.category}</option>;
  });
  const UOMsOptions = uoms.UOMs.map((uom) => {
    if (uom.convFactor == 1) {
      return (
        <option data-testid="uom-option" value={uom.base}>
          {uom.base}
        </option>
      );
    } else {
      return (
        <option data-testid="uom-option" value={uom.name}>
          {uom.name}
        </option>
      );
    }
  });
  return (
    <div className="text-gray-100">
      <Formik
        initialValues={{
          name: "",
          price: 0,
          category: "",
          uom: {
            name: "",
            type: "",
            base: "",
            convFactor: 0,
          },
          image: "",
          code: "",
        }}
        validationSchema={Yup.object({
          name: !update ? Yup.string().required("Required") : Yup.string(),
          price: !update
            ? Yup.number().required("Required").moreThan(0)
            : Yup.number(),
          category: !update
            ? Yup.string().required("Must select a category")
            : Yup.string(),
          uom: !update
            ? Yup.object({ name: Yup.string().required("Must select a UOM") })
            : Yup.object({ name: Yup.string() }),
          code: !update ? Yup.string().required("Required") : Yup.string(),
        })}
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
          const uom = uoms.UOMs.find((uom) => uom.name == values.uom.name);

          if (update) {
            if(uom)dispatch(updateProduct({ id, ...filteredObject, uom: uom }));
            else dispatch(updateProduct({ id, ...filteredObject }));
            dispatch(startUpdating(id));
          } else {
            if (uom) dispatch(addProduct({ ...values, uom: uom }));
            dispatch(startAdding());
          }
        }}
      >
        <Form className="flex flex-col">
          <div className="form-title">
            <h1 className="py-10 ">{`${
              update ? "Update" : "Add"
            } a Product`}</h1>
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
            <TextInput type="text" label="Product name" name="name" id="name" />
            <TextInput type="text" label="Product code" name="code" id="code" />
            <TextInput
              type="number"
              label="Product price"
              name="price"
              id="price"
            />
            <TextInput type="text" label="Image link" name="image" id="image" />
            <SelectInput label="Category" name="category" id="category">
              <option value="">Select a category</option>
              {categoriesOptions}
            </SelectInput>
            <SelectInput label="UOM" name="uom.name" id="uom.name">
              <option value="">Select a category</option>
              {UOMsOptions}
            </SelectInput>
          </div>
          <button
            data-testid="submitAddProductForm"
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
