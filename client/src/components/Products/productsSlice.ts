import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface UOM {
  name: string;
  base: string;
  convFactor: number
}

export interface ProductType {
  id: number;
  name: string;
  category: string;
  image: string;
  price: 10;
  uom: UOM;
}

type InitialState = {
  loading: boolean;
  products: ProductType[];
  error: string | undefined;
};

const initialState: InitialState = {
  loading: false,
  products: [],
  error: "",
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch("http://localhost:3000/products");
  const data = await res.json();
  return data;
});

export const addProduct = createAsyncThunk(
  "products/add",
  async ({ id, name, category, image, price, uom }: ProductType) => {
    const res = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        category,
        image,
        price,
        uom,
      }),
    });
    const data = res.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload)
    })
  },
});

export const selectProducts = (state: RootState) => state.products

export default productsSlice.reducer;
