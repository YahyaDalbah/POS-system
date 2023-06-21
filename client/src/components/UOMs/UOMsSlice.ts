import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { UOM } from "../Products/productsSlice";

type InitialState = {
  loading: boolean;
  adding: boolean;
  UOMs: UOM[];
  error?: string;
};

const initialState: InitialState = {
  loading: false,
  adding: false,
  UOMs: [],
  error: "",
};

export const fetchUOMs = createAsyncThunk("UOMs/fetch", async () => {
  const res = await fetch("http://localhost:3000/uoms");
  const data = await res.json();
  return data;
});

export const addUOM = createAsyncThunk("UOMs/add", async (UOM: UOM) => {
  const res = await fetch("http://localhost:3000/uoms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(UOM),
  });
  const data = await res.json();
  return data;
});

export const filterUomByType = createAsyncThunk(
  "UOMs/filter",
  async (type: string) => {
    const res =
      type != "All"
        ? await fetch(`http://localhost:3000/uoms?type=${type}`)
        : await fetch(`http://localhost:3000/uoms`);
    const data = await res.json();
    return data;
  }
);

const UOMsSlice = createSlice({
  name: "UOMs",
  initialState,
  reducers: {
    startAdding: (state) => {
      state.adding = !state.adding;
    },
    deleteUOMsByType: (state, action) => {
      const pro = state.UOMs.filter((UOM) => {
        return UOM.type != action.payload;
      });
      state.UOMs = pro;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUOMs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUOMs.fulfilled, (state, action) => {
      state.loading = false;
      state.UOMs = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUOMs.rejected, (state, action) => {
      state.loading = false;
      state.UOMs = [];
      state.error = action.error.message;
    });
    builder.addCase(addUOM.fulfilled, (state, action) => {
      state.UOMs.push(action.payload);
    });
    builder.addCase(addUOM.rejected, (state, action) => {
      console.log(action.error.message);
    });
    builder.addCase(filterUomByType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(filterUomByType.fulfilled, (state, action) => {
      state.loading = false;
      state.UOMs = action.payload;
      state.error = "";
    });
    builder.addCase(filterUomByType.rejected, (state, action) => {
      state.loading = false;
      state.UOMs = [];
      state.error = action.error.message;
    });
  },
});

export const selectUOMs = (state: RootState) => state.uoms;

export default UOMsSlice.reducer;

export const { deleteUOMsByType, startAdding } = UOMsSlice.actions
