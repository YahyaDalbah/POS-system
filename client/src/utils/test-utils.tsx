import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import productsReducer from "../components/Products/productsSlice";
import categoriesReducer from "../components/Categories/categoriesSlice";
import UOMsReducer from "../components/UOMs/UOMsSlice";
import TypesReducer from "../components/UOMs/UOMtypesSlice";
import CartsReducer from "../components/carts/CartsSlice";

import type { AppStore, RootState } from '../store/store'
import { BrowserRouter } from 'react-router-dom'
// As a basic setup, import your same slice reducers


// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        products: productsReducer,
        categories: categoriesReducer,
        uoms: UOMsReducer,
        types: TypesReducer,
        carts: CartsReducer,
      },
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}