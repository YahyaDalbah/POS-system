import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
type Category = {
  category: string;
  id?: number;
};
type CategoriesType = Category[];

type InitialState = {
  categories: CategoriesType;
  error: string | undefined;
  adding: boolean;
};
const initialState: InitialState = {
  categories: [],
  error: "",
  adding: false,
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
    await fetch(`http://localhost:3000/categories/${id}`,{
      method:"DELETE"
    });
    return id
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

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    startAdding: (state) => {
      state.adding = !state.adding;
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
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload);
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      console.log(action.error.message);
    });
    builder.addCase(deleteCategory.fulfilled, (state,action) => {
      state.categories = state.categories.filter(category => category.id != action.payload)
    })
    builder.addCase(deleteCategory.rejected, (state, action) => {
      console.log(action.error.message)
    })
  },
});

export const selectCategories = (state: RootState) => state.categories;
export default categoriesSlice.reducer;
export const { startAdding } = categoriesSlice.actions;
