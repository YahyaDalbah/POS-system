import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface UOM {
  id?: number;
  type: string;
  name: string;
  base: string;
  convFactor: number;
}

export interface ProductType {
  id?: number;
  name: string;
  category: string;
  image: string;
  price: number;
  uom: UOM;
}

type InitialState = {
  loading: boolean;
  products: ProductType[];
  error: string | undefined;
  adding: boolean;
  updating: {
    updating: boolean
    id?: number
  }
};

const initialState: InitialState = {
  loading: false,
  products: [],
  error: "",
  adding: false,
  updating: {
    updating: false
  }
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch("http://localhost:3000/products");
  const data = await res.json();
  return data;
});

export const filterByCategory = createAsyncThunk(
  "products/filter",
  async (category: string) => {
    const res =
      category != "All"
        ? await fetch(`http://localhost:3000/products?category=${category}`)
        : await fetch(`http://localhost:3000/products`);
    const data = await res.json();
    return data;
  }
);

export const addProduct = createAsyncThunk(
  "products/add",
  async (values: ProductType) => {
    const res = await fetch("http://localhost:3000/products", {
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

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number | undefined) => {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (values: any) => {
    const res = await fetch(`http://localhost:3000/products/${values.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    startAdding: (state) => {
      state.adding = !state.adding;
    },
    startUpdating: (state,action) => {
      state.updating.updating = !state.updating.updating
      state.updating.id = action.payload
    },
    deleteProductsByCategory: (state, action) => {
      state.products = state.products.filter(
        (product) => product.category != action.payload
      );
    },
    deleteProductsByType: (state, action) => {
      state.products = state.products.filter(
        (product) => product.uom.type != action.payload
      );
    },
  },
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
    builder.addCase(addProduct.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.error = action.error.message
      state.loading = false;
    });
    builder.addCase(filterByCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(filterByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(filterByCategory.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
    builder.addCase(deleteProduct.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id != action.payload
      );
      state.loading = false;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.error = action.error.message
      state.loading = false
    });
    builder.addCase(updateProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.products = state.products.map((product) => {
        if (product.id == action.payload.id) {
          return action.payload;
        } else {
          return product;
        }
      });
      state.loading = false
    });
  },
});

export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;

export const { startAdding, startUpdating, deleteProductsByCategory, deleteProductsByType } = productsSlice.actions;
