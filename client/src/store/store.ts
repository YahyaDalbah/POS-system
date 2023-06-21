import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../components/Products/productsSlice";
import categoriesReducer from "../components/Categories/categoriesSlice";
import UOMsReducer from "../components/UOMs/UOMsSlice";
import TypesReducer from '../components/UOMs/UOMtypesSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    uoms: UOMsReducer,
    types: TypesReducer
  },
});

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
