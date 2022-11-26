import { createSlice } from "@reduxjs/toolkit";

export const defaultProductImageSlice = createSlice({
  name: "defaultProductImage",
  initialState: {
    defaultProductImage: "",
  },
  reducers: {
    setDefaultProductImage: (state, action) => {
      localStorage.setItem("defaultProductImage", action.payload);
      state.defaultProductImage = action.payload;
    },
  },
});

export const { setDefaultProductImage } = defaultProductImageSlice.actions;

export default defaultProductImageSlice.reducer;
