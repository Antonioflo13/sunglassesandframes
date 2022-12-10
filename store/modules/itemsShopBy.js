import { createSlice } from "@reduxjs/toolkit";

export const itemsShopBySlice = createSlice({
  name: "itemsShopBy",
  initialState: {
    itemsShopBy: [],
  },
  reducers: {
    setItemsShopBy: (state, action) => {
      localStorage.setItem("itemsShopBy", action.payload);
      state.itemsShopBy = action.payload;
    },
  },
});

export const { setItemsShopBy } = itemsShopBySlice.actions;

export default itemsShopBySlice.reducer;
