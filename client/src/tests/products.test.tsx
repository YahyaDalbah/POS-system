// Imports
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store/store";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

// Tests
test("Renders main page correctly", () => {
  // Setup
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
  

  // Pre Expecations

  // Init

  // Post Expectations
  expect(screen.getAllByText("Products")[0]).toBeInTheDocument();
});
