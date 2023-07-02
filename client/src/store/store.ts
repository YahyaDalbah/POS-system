import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../components/Products/productsSlice";
import categoriesReducer from "../components/Categories/categoriesSlice";
import UOMsReducer from "../components/UOMs/UOMsSlice";
import TypesReducer from '../components/UOMs/UOMtypesSlice';
import CartsReducer from "../components/carts/CartsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    uoms: UOMsReducer,
    types: TypesReducer,
    carts: CartsReducer,
  },
  
});

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof configureStore>;
