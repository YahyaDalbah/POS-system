import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../components/Products/productsSlice";
import categoriesReducer from "../components/Categories/categoriesSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer
  },
});

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
