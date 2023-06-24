import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { updateProductsByCategory } from "../Products/productsSlice";
type Category = {
  category: string;
  id?: number;
};
type CategoriesType = Category[];

type InitialState = {
  categories: CategoriesType;
  loading: boolean;
  error: string | undefined;
  adding: boolean;
  updating: {
    updating: boolean;
    id?: number;
    category?: string;
  };
};
const initialState: InitialState = {
  categories: [],
  error: "",
  adding: false,
  loading: false,
  updating: {
    updating: false,
  },
};

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    const res = await fetch("http://localhost:3000/categories");
    const data = await res.json();
    return data;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async ({ category, id }: Category) => {
    const productsRes = await fetch(
      `http://localhost:3000/products?category=${category}`
    );
    const productsData = await productsRes.json();
    productsData.forEach(async (product: any) => {
      await fetch(`http://localhost:3000/products/${product.id}`, {
        method: "DELETE",
      });
    });
    await fetch(`http://localhost:3000/categories/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const addCategory = createAsyncThunk(
  "categories/add",
  async ({ category }: Category) => {
    const res = await fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
      }),
    });
    const data = await res.json();
    return data;
  }
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async (values: any, { dispatch, getState }) => {
    const state: any = getState();
    const res = await fetch(`http://localhost:3000/categories/${values.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    console.log(state.categories)
    dispatch(
      updateProductsByCategory({
        prevCategory: state.categories.updating.category,
        currCategory: values.category,
      })
    );
    return data;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    startAdding: (state) => {
      state.adding = !state.adding;
    },
    startUpdating: (state, action) => {
      state.updating.updating = !state.updating.updating;
      state.updating.id = action.payload.id;
      state.updating.category = action.payload.category
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.categories = [];
      state.error = action.error.message;
    });
    builder.addCase(addCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload);
      state.loading = false;
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(deleteCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id != action.payload
      );
      state.loading = false;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(updateCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      console.log(action.error.stack)
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.categories = state.categories.map((category) => {
        if (category.id == action.payload.id) {
          return action.payload;
        } else {
          return category;
        }
      });

      state.loading = false;
    });
  },
});

export const selectCategories = (state: RootState) => state.categories;
export default categoriesSlice.reducer;
export const { startAdding, startUpdating } = categoriesSlice.actions;
