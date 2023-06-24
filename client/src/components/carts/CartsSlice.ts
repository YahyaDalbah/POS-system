import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface CartProductType {
  id?: number;
  price: number;
  name: string;
  qty: number;
  uom: string;
}

export interface CartType {
  id?: number;
  cartProducts: CartProductType[];
  tax: number;
  discount: number;
  title: string;
  desc: string;
  total: number;
}

type InitialState = {
  loading: boolean;
  error: string | undefined;
  adding: boolean;
  showingCart: {
    showing: boolean
    id?:number
  }
  carts: CartType[];
};

const initialState: InitialState = {
  loading: false,
  error: "",
  adding: false,
  showingCart: {
    showing: false
  },
  carts: [],
};

export const fetchCarts = createAsyncThunk("carts/fetch", async () => {
  const res = await fetch("http://localhost:3000/carts");
  const data = await res.json();
  return data;
});

export const addCart = createAsyncThunk(
  "carts/add",
  async (values: CartType) => {
    const res = await fetch("http://localhost:3000/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    return data;
  }
);

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    startAdding: (state) => {
      state.adding = !state.adding;
    },
    showCart: (state, action) => {
      state.showingCart.showing = true
      state.showingCart.id = action.payload
    },
    stopShowing: state => {
      state.showingCart.showing = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCarts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchCarts.fulfilled, (state, action) => {
      state.carts = action.payload;
      state.loading = false;
    });
    builder.addCase(addCart.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(addCart.fulfilled, (state, action) => {
      state.carts.push(action.payload);
      state.loading = false;
    });
  },
});

export default cartsSlice.reducer;

export const selectCarts = (state: RootState) => state.carts;

export const { startAdding, showCart ,stopShowing} = cartsSlice.actions;
