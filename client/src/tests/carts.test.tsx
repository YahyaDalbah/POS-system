import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import App from "../App";

async function addCart(cartName: string) {
  fireEvent.click(screen.getByRole("link", { name: "POS page" }));
  const addBtn = await screen.findByRole("button", { name: /add cart/i });
  fireEvent.click(addBtn);

  fireEvent.change(screen.getByLabelText("Cart name"), {
    target: { value: cartName },
  });
  fireEvent.change(screen.getByLabelText("Cart description"), {
    target: { value: "test description" },
  });

  const submitBtn = await screen.findByTestId("submitAddCartForm");

  fireEvent.click(submitBtn);
}

test("adds carts correctly", async () => {
  renderWithProviders(<App />);
  await addCart("test cart");

  const name = await screen.findByTestId("cartName");
  const desc = await screen.findByTestId("cartDesc");
  expect(name).toHaveTextContent("test cart");
  expect(desc).toHaveTextContent("test description");
});

test("updates carts correctly", async () => {
  renderWithProviders(<App />);
  await addCart("test cart");

  const updateBtn = await screen.findByRole("button", { name: "Update" });

  fireEvent.click(updateBtn);

  fireEvent.change(screen.getByLabelText("Cart name"), {
    target: { value: "test update cart" },
  });

  fireEvent.click(screen.getByTestId("submitUpdateCartForm"));

  const updatedName = await screen.findByTestId("cartName");

  await waitFor(() => {
    expect(updatedName).toHaveTextContent("test update cart");
  })
});

