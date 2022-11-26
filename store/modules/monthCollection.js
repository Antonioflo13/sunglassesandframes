import { createSlice } from "@reduxjs/toolkit";

export const monthCollectionSlice = createSlice({
  name: "monthCollection",
  initialState: {
    monthCollectionInfo: {},
    monthCollection: {},
  },
  reducers: {
    setMonthCollectionInfo: (state, action) => {
      localStorage.setItem("monthCollectionInfo", action.payload);
      state.monthCollectionInfo = action.payload;
    },
    setMonthCollection: (state, action) => {
      localStorage.setItem("monthCollection", action.payload);
      state.monthCollection = action.payload;
    },
  },
});

export const { setMonthCollectionInfo, setMonthCollection } =
  monthCollectionSlice.actions;

export default monthCollectionSlice.reducer;
