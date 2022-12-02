import { createSlice } from "@reduxjs/toolkit";

export const itemsNavBarSlice = createSlice({
  name: "itemNavBar",
  initialState: {
    itemNavBar: [],
  },
  reducers: {
    setItemsNavBar: (state, action) => {
      localStorage.setItem("itemNavBar", action.payload);
      state.itemNavBar = action.payload;
    },
  },
});

export const { setItemsNavBar } =
  itemsNavBarSlice.actions;

export default itemsNavBarSlice.reducer;
