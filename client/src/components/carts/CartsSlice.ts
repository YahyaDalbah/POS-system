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
}

type InitialState = {
  loading: boolean;
  error: string | undefined;
  adding: boolean;
  showingCart: {
    showing: boolean;
    id?: number;
  };
  carts: CartType[];
  updating: {
    updating: boolean;
    id?: number;
  };
};

const initialState: InitialState = {
  loading: false,
  error: "",
  adding: false,
  showingCart: {
    showing: false
  },
  updating:{
    updating:false
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

export const checkoutCart = createAsyncThunk("carts/checkout", async (id:any) => {
  await fetch(`http://localhost:3000/carts/${id}`,{
    method:"DELETE"
  });
  return id
});

export const updateCart = createAsyncThunk(
  "carts/update",
  async (values: any) => {
    const res = await fetch(`http://localhost:3000/carts/${values.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values)
    });
    const data = await res.json()
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
    },
    startUpdating: (state,action) => {
      state.updating.updating = !state.updating.updating
      state.updating.id = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarts.pending, (state) => {
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
    builder.addCase(addCart.pending, (state) => {
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
    builder.addCase(checkoutCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkoutCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(checkoutCart.fulfilled, (state, action) => {
      state.loading = false;
      state.carts = state.carts.filter(cart => cart.id != action.payload)
    });
    builder.addCase(updateCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.loading = false;
      state.carts = state.carts.map((cart) => {
        if(cart.id == action.payload.id){
          return action.payload
        }else{
          return cart
        }
      });
    });
  },
});

export default cartsSlice.reducer;

export const selectCarts = (state: RootState) => state.carts;

export const { startUpdating,startAdding, showCart ,stopShowing} = cartsSlice.actions;
