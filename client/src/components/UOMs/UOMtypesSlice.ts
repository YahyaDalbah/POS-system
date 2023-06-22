import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { addUOM } from "./UOMsSlice";

interface UOMType {
  id?: number;
  type: string;
  base: string
}

type InitialState = {
  loading: boolean;
  types: UOMType[];
  adding: boolean;
  error?: string;
};

const initialState: InitialState = {
  loading: false,
  adding: false,
  types: [],
  error: "",
};

export const fetchTypes = createAsyncThunk("UOMsTypes/fetch", async () => {
  const res = await fetch("http://localhost:3000/types");
  const data = await res.json();
  return data;
});

export const addTypes = createAsyncThunk("UOMsTypes/add", async (type: UOMType, {dispatch}) => {
  const res = await fetch("http://localhost:300/types", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(type),
  });
  const data = await res.json();
  await dispatch(addUOM({ ...type, name: type.base, convFactor: 1 }));
  return data;
});

export const deleteType = createAsyncThunk(
  "UOMsTypes/delete",
  async ({ type, id }: UOMType) => {
    const productsRes = await fetch(
      `http://localhost:3000/products?uom.type=${type}`
    );
    const productsData = await productsRes.json()
    productsData.forEach(async (product: any) => {
        await fetch(`http://localhost:3000/products/${product.id}`, {
          method: "DELETE",
        });
    });
    const uomsRes = await fetch(`http://localhost:3000/uoms?type=${type}`);
    const uomsData = await uomsRes.json();
    uomsData.forEach(async (uom: any) => {
      await fetch(`http://localhost:3000/uoms/${uom.id}`, {
        method: "DELETE",
      });
    });
    await fetch(`http://localhost:3000/types/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);



const TypesSlice = createSlice({
  name: "UOMsTypes",
  initialState,
  reducers: {
    startAddingTypes: (state) => {
      state.adding = !state.adding
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTypes.pending, (state) => {
      state.loading = true
    });
    builder.addCase(addTypes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTypes.fulfilled, (state, action) => {
      state.types = action.payload;
      state.error = "";
      state.loading = false
    });
    builder.addCase(fetchTypes.rejected, (state, action) => {
      state.types = [];
      state.error = action.error.message;
      state.loading = false
    });
    builder.addCase(addTypes.rejected, (state, action) => {
      state.types = [];
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(deleteType.rejected, (state, action) => {
      state.types = [];
      state.error = action.error.message;
      state.loading = false
      
    });
    builder.addCase(addTypes.fulfilled, (state, action) => {
      state.types.push(action.payload);
      state.loading = false
    });
    builder.addCase(deleteType.fulfilled, (state, action) => {
        state.types = state.types.filter(type => type.id != action.payload)
        state.loading = false
    })
  },
});

export const selectTypes = (state: RootState) => state.types;

export default TypesSlice.reducer;

export const {startAddingTypes} = TypesSlice.actions
