import { createSlice } from "@reduxjs/toolkit";
import Client from "shopify-buy";

export const shopifySlice = createSlice({
  name: "shopify",
  initialState: {
    client: null,
    checkout: null,
  },
  reducers: {
    setClient: (state, action) => {
      state.checkout = action.payload;
    },
    setShopifyCheckout: (state, action) => {
      state.checkout = action.payload;
    },
  },
});

export const { setClient, setShopifyCheckout } = shopifySlice.actions;

export default shopifySlice.reducer;
