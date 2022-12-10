import { createSlice } from "@reduxjs/toolkit";

export const itemsNavBarSlice = createSlice({
  name: "itemsNavBar",
  initialState: {
    itemsNavBar: [],
  },
  reducers: {
    setItemsNavBar: (state, action) => {
      localStorage.setItem("itemsNavBar", action.payload);
      state.itemsNavBar = action.payload;
    },
  },
});

export const { setItemsNavBar } = itemsNavBarSlice.actions;

export default itemsNavBarSlice.reducer;
