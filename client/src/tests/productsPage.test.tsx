import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import App from "../App";
import ProductsPage from "../components/Products/ProductsPage";
import { addType, addUOM } from "./UOMsPage.test";
import userEvent from "@testing-library/user-event";

export const getNameInput = () => screen.getByLabelText(/name/i);
export const getCodeInput = () => screen.getByLabelText(/code/i);
export const getPriceInput = () => screen.getByLabelText(/price/i);
export const getCategoryInput = () => screen.getByLabelText(/category/i);
export const getUomInput = () => screen.getByLabelText(/uom/i);

export const getCategories = () => screen.findAllByTestId(/category/i);
export const getProducts = () => screen.findAllByTestId(/product/i);

export async function addCategory(categoryName: string) {
  fireEvent.click(screen.getByRole("link", { name: "Products" }));
  const addBtn = await screen.findByTestId("addCategoryBtn");
  fireEvent.click(addBtn);

  fireEvent.change(getNameInput(), { target: { value: categoryName } });

  const submitBtn = await screen.findByTestId("submitAddCategoryForm");

  fireEvent.click(submitBtn);
}

export async function addProduct(categoryOption: string, uomOption: string) {
  fireEvent.click(screen.getByRole("link", { name: "Products" }));

  const addBtn = await screen.findByText(/Add product/i);
  fireEvent.click(addBtn);

  fireEvent.change(getNameInput(), {
    target: { value: "test product" },
  });
  fireEvent.change(getCodeInput(), {
    target: { value: "test code" },
  });
  fireEvent.change(getPriceInput(), {
    target: { value: 10 },
  });
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /uom/i }),
    screen.getByRole("option", { name: uomOption })
  );
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /category/i }),
    screen.getByRole("option", { name: categoryOption })
  );
  const submitBtn = screen.getByTestId("submitAddProductForm");
  fireEvent.click(submitBtn);
}

// test("fetches products correctly", async () => {
//   renderWithProviders(<ProductsPage />);

//   expect(screen.getByText(/no products/i)).toBeInTheDocument();
// });

// test("adds categories correctly", async () => {
//   renderWithProviders(<App />);

//   fireEvent.click(screen.getByRole("link", { name: "Products" }));

//   await addCategory("test1");

//   await addCategory("test2");

//   await waitFor(async () => {
//     const numberOfCate = await screen.findAllByTestId("category");
//     expect(numberOfCate.length).toBe(3);
//   });
// });

// test("updates categories correctly", async () => {
//   renderWithProviders(<App />);

//   fireEvent.click(screen.getByRole("link", { name: "Products" }));

//   await addCategory("test1");

//   const updateBtn = await screen.findByRole('button',{name: 'u'})

//   fireEvent.click(updateBtn)

//   fireEvent.change(getNameInput(), { target: { value: "test update" } });

//   const submitBtn = await screen.findByTestId("submitAddCategoryForm");

//   fireEvent.click(submitBtn);

  

//   await waitFor(async ()=> {
//     const category = (await screen.findAllByTestId("category"))[1];
//     expect(category).toHaveTextContent("xutest update");
//   })
  
// });
// test("deletes categories correctly", async () => {
//   renderWithProviders(<App />);

//   fireEvent.click(screen.getByRole("link", { name: "Products" }));

//   await addCategory("test1");

//   const deleteBtn = await screen.findByRole("button", { name: "x" });

//   fireEvent.click(deleteBtn);

//   const confirmBtn = await screen.findByText(/delete it!/i)

//   fireEvent.click(confirmBtn)
  
//   await waitFor(async () => {
//     const categories = await screen.findAllByTestId("category");
//     expect(screen.queryByText(/Loading/)).not.toBeInTheDocument()
//     expect(categories.length).toBe(1);
//   });
  
// });

// test("adds products correctly", async () => {
//   renderWithProviders(<App />);
//   await addType("test type");
//   await addUOM("test type");

//   await addCategory("test category1");
//   await addCategory("test category2");

//   await addProduct("test category1", "test type");

//   await addProduct("test category2", "test type");

//   await waitFor(async () => {
//     expect((await screen.findAllByTestId("product")).length).toBe(2);
//   });
// });

// test("updates products correctly", async () => {
//   renderWithProviders(<App />);
//   await addType("test type");
//   await addUOM("test type");

//   await addCategory("test category1");
//   await addCategory("test category2");

//   await addProduct("test category1", "test type");

//   const updateBtn = await screen.findByRole("button", { name: "Update" });

//   fireEvent.click(updateBtn);

//   fireEvent.change(getNameInput(), {
//     target: { value: "test update product" },
//   });

//   fireEvent.click(screen.getByTestId("submitAddProductForm"));

//   await waitFor(async () => {
//     expect(await screen.findByTestId("productName")).toHaveTextContent(
//       "test update product"
//     );
//   });
// });

// test("deletes products correctly", async () => {
//   renderWithProviders(<App />);
//   await addType("test type");
//   await addUOM("test type");

//   await addCategory("test category1");

//   await addProduct("test category1", "test type");

//   const deleteBtn = await screen.findByRole("button", { name: "Delete" });

//   fireEvent.click(deleteBtn);

//   await waitFor(async () => {
//     expect(screen.queryByTestId("product")).not.toBeInTheDocument();
//   });
// });
