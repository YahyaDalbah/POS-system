import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import App from "../App";
import UOMsPage from "../components/UOMs/UOMsPage";
import { getNameInput } from "./productsPage.test";
import userEvent from "@testing-library/user-event";

export async function addType(value: string) {
  await waitFor(async () => {
    fireEvent.click(screen.getByRole("link", { name: "Units of measure" }));

    const addBtn = await screen.findByTestId("addTypeBtn");
    fireEvent.click(addBtn);

    fireEvent.change(getNameInput(), { target: { value: value } });
    fireEvent.change(screen.getByLabelText(/base unit of measure/i), {
      target: { value: value },
    });

    const submitBtn = await screen.findByTestId("submitAddTypeForm");

    fireEvent.click(submitBtn);
  });
}

export async function addUOM(optionValue: string) {
  await waitFor(async () => {
    fireEvent.click(screen.getByRole("link", { name: "Units of measure" }));
    const addUOMBtn = screen.getByTestId("addUOMBtn");
    fireEvent.click(addUOMBtn);

    await userEvent.selectOptions(
      screen.getByLabelText("Type name"),
      screen.getByRole("option", { name: optionValue })
    );
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "test uom" },
    });
    fireEvent.change(screen.getByLabelText(/conversion factor/i), {
      target: { value: 12 },
    });

    const submitBtn = await screen.findByTestId("submitAddUOMForm");

    fireEvent.click(submitBtn);
  });
}

async function updateUOM(optionValue: string) {
  await waitFor(async () => {
    const updateBtn = await screen.findByRole("button", { name: "Update" });
    fireEvent.click(updateBtn);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "update test" },
    });
    fireEvent.change(screen.getByLabelText(/conversion factor/i), {
      target: { value: 123456 },
    });
    // await userEvent.selectOptions(
    //   screen.getByLabelText("Type name"),
    //   screen.getByRole("option", { name: optionValue })
    // );
    const submitBtn = await screen.findByTestId("submitAddUOMForm");

    fireEvent.click(submitBtn);
  });
}

// test("fetches uoms correctly", async () => {
//   renderWithProviders(<UOMsPage />);

//   expect(screen.getByText(/no uoms/i)).toBeInTheDocument();
// });

// test("adds types correctly", async () => {
//   renderWithProviders(<App />);

//   fireEvent.click(screen.getByRole("link", { name: "Units of measure" }));

//   await addType("test1");

//   await addType("test2");

//   await waitFor(async () => {
//     const numberOfTypes = await screen.findAllByTestId("type");
//     expect(numberOfTypes.length).toBe(3);
//   });
//   expect((await screen.findAllByTestId("uom")).length).toBe(2);
// });

// test("updates types correctly", async () => {
//   renderWithProviders(<App />);

//   fireEvent.click(screen.getByRole("link", { name: "Units of measure" }));

//   await addType("test1");

//   const updateBtn = await screen.findByRole("button", { name: "u" });

//   fireEvent.click(updateBtn);

//   fireEvent.change(screen.getByLabelText("Type name"), {
//     target: { value: "test update" },
//   });

//   fireEvent.change(screen.getByLabelText("base unit of measure"),{
//     target: {value: "test update base"}
//   });

//   const submitBtn = await screen.findByTestId("submitAddTypeForm");

//   fireEvent.click(submitBtn);

//   await waitFor(async () => {
//     const type = (await screen.findAllByTestId("type"))[1];
//     expect(type).toHaveTextContent("xutest update");
//   });
// });

// test("deletes types correctly", async () => {
//   renderWithProviders(<App />);

//   fireEvent.click(screen.getByRole("link", { name: "Units of measure" }));

//   await addType("test1");

//   const deleteBtn = await screen.findByRole("button", { name: "x" });

//   fireEvent.click(deleteBtn);

//   const confirmBtn = await screen.findByText(/delete it!/i);

//   fireEvent.click(confirmBtn);

//   await waitFor(async () => {
//     const types = await screen.findAllByTestId("type");
//     expect(screen.queryByText(/Loading/)).not.toBeInTheDocument();
//     expect(types.length).toBe(1);
//   });

// });

// test("adds uom correctly", async () => {
//   renderWithProviders(<App />);

//   fireEvent.click(screen.getByRole("link", { name: "Units of measure" }));

//   await addType("test1");

//   const addUOMBtn = screen.getByTestId("addUOMBtn");

//   fireEvent.click(addUOMBtn);

//   //check if it displays the types correctly
//   await waitFor(() => {
//     expect(screen.getAllByRole("option").length).toBe(
//       screen.getAllByTestId("type").length
//     );
//   });

//   fireEvent.click(addUOMBtn);

//   await addUOM("test1");

//   await addUOM("test1");

//   await waitFor(async () => {
//     const numberOfUOMs = await screen.findAllByTestId("uom");
//     expect(numberOfUOMs.length).toBe(3);
//   });
// });

// test("updates uom correctly", async () => {
//   renderWithProviders(<App />);

//   fireEvent.click(screen.getByRole("link", { name: "Units of measure" }));

//   await addType("test1");
//   await addUOM("test1");

//   await updateUOM("test1");

//   await waitFor(async ()=>{
//     expect((await screen.findAllByTestId("uomName"))[1]).toHaveTextContent(
//       "update test"
//     );
//     expect(
//       (await screen.findAllByTestId("uomConvFactor"))[1]
//     ).toHaveTextContent("123456");
//   })
// });

// test("deletes uom correctly", async () => {
//   renderWithProviders(<App />);

//   fireEvent.click(screen.getByRole("link", { name: "Units of measure" }));

//   await addType("test1");

//   await addUOM("test1");

//   await waitFor(async () => {
//     const deleteBtn = (
//       await screen.findAllByRole("button", { name: "Delete" })
//     )[0];
//     fireEvent.click(deleteBtn);
//   });
//   await waitFor(() => {
//     expect(screen.queryAllByTestId("uom").length).toBe(0);
//   });
// });
