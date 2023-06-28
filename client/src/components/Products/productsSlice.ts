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
  code: string
}

type InitialState = {
  loading: boolean;
  products: ProductType[];
  error: string | undefined;
  adding: boolean;
  updating: {
    updating: boolean;
    id?: number;
  };
  currCategory?: string
};

const initialState: InitialState = {
  loading: false,
  products: [],
  error: "",
  adding: false,
  updating: {
    updating: false,
  },
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch("http://localhost:3000/products");
  const data = await res.json();
  return data;
});

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
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    return data;
  }
);

export const updateProductsByCategory = createAsyncThunk(
  "products/updateByCategory",
  async (payload: any, { getState }) => {
    const state: any = getState();
    const products: ProductType[] = state.products.products;
    const res = Promise.all(
      products.map(async (product) => {
        if (product.category == payload.prevCategory) {
          console.log(payload)
          const res = await fetch(
            `http://localhost:3000/products/${product.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({category: payload.currCategory}),
            }
          );
          const data: ProductType = await res.json();
          return data;
        } else {
          return product;
        }
      })
    );
    const data: ProductType[] = await res;
    return data;
  }
);

export const updateProductsByTypeOfMeasure = createAsyncThunk(
  "products/updateProductsByTypeOfMeasure",
  async (payload: any, { getState }) => {
    const state: any = getState();
    const products: ProductType[] = state.products.products;
    const res = Promise.all(
      products.map(async (product) => {
        if (product.uom.type == payload.prevType) {
          const res = await fetch(
            `http://localhost:3000/products/${product.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ uom: {
                base: payload.currBase,
                type: payload.currType,
                convFactor: product.uom.convFactor,
                name: product.uom.name
              } }),
            }
          );
          const data: ProductType = await res.json();
          return data;
        } else {
          return product;
        }
      })
    );
    const data: ProductType[] = await res;
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
    startUpdating: (state, action) => {
      state.updating.updating = !state.updating.updating;
      state.updating.id = action.payload;
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
    updateProductByUOM: (state, action) => {
      state.products = state.products.map((product) =>
        product.uom.name != action.payload.name
          ? product
          : {
              ...product,
              price: product.price * product.uom.convFactor,
              uom: {
                ...product.uom,
                id: action.payload.id,
                name: action.payload.base,
                convFactor: 1,
              },
            }
      );
    },
    filterByCategory: (state, action) => {
      state.currCategory = action.payload
    }
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
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id != action.payload
      );
      state.loading = false;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(updateProduct.pending, (state) => {
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
      state.loading = false;
    });
    builder.addCase(updateProductsByCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProductsByCategory.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(updateProductsByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(updateProductsByTypeOfMeasure.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProductsByTypeOfMeasure.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(
      updateProductsByTypeOfMeasure.fulfilled,
      (state, action) => {
        state.loading = false;
        state.products = action.payload;
      }
    );
  },
});

export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;

export const {
  startAdding,
  startUpdating,
  deleteProductsByCategory,
  deleteProductsByType,
  updateProductByUOM,
  filterByCategory,
} = productsSlice.actions;
