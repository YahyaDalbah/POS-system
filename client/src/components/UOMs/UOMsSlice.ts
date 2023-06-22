import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { UOM } from "../Products/productsSlice";

type InitialState = {
  loading: boolean;
  adding: boolean;
  UOMs: UOM[];
  error?: string;
  updating: {
    updating: boolean;
    id?: number;
  };
};

const initialState: InitialState = {
  loading: false,
  adding: false,
  UOMs: [],
  error: "",
  updating: {
    updating: false,
  },
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

export const deleteUOM = createAsyncThunk(
  "UOMs/delete",
  async (id: number | undefined) => {
    const res = await fetch(`http://localhost:3000/uoms/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return id;
  }
);

export const updateUOM = createAsyncThunk(
  "UOMs/update",
  async (values: any) => {
    const res = await fetch(`http://localhost:3000/uoms/${values.id}`, {
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

const UOMsSlice = createSlice({
  name: "UOMs",
  initialState,
  reducers: {
    startAdding: (state) => {
      state.adding = !state.adding;
    },
    startUpdating: (state, action) => {
      state.updating.updating = !state.updating.updating;
      state.updating.id = action.payload;
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
    builder.addCase(addUOM.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(filterUomByType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUOM.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUOM.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUOM.rejected, (state, action) => {
      state.loading = false;
      state.UOMs = [];
      state.error = action.error.message;
    });
    builder.addCase(deleteUOM.rejected, (state, action) => {
      state.loading = false;
      state.UOMs = [];
      state.error = action.error.message;
    });
    builder.addCase(updateUOM.rejected, (state, action) => {
      state.loading = false;
      state.UOMs = [];
      state.error = action.error.message;
    });
    builder.addCase(filterUomByType.rejected, (state, action) => {
      state.loading = false;
      state.UOMs = [];
      state.error = action.error.message;
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
      state.loading = false
    });

    builder.addCase(filterUomByType.fulfilled, (state, action) => {
      state.loading = false;
      state.UOMs = action.payload;
      state.error = "";
    });

    builder.addCase(deleteUOM.fulfilled, (state, action) => {
      state.UOMs = state.UOMs.filter((uom) => uom.id != action.payload);
      state.loading = false
    });
    builder.addCase(updateUOM.fulfilled, (state, action) => {
      state.UOMs = state.UOMs.map((uom) => {
        if (uom.id == action.payload.id) {
          return action.payload;
        } else {
          return uom;
        }
      });
      state.loading = false
    });
  },
});

export const selectUOMs = (state: RootState) => state.uoms;

export default UOMsSlice.reducer;

export const { deleteUOMsByType, startAdding, startUpdating } =
  UOMsSlice.actions;
