import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "../../utils/cookie";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: null,
  },
  reducers: {
    setCartContent: (state, action) => {
      setCookie("cart", action.payload, 90);
      state.value = action.payload;
    },
  },
});

export const { setCartContent } = cartSlice.actions;

export default cartSlice.reducer;
