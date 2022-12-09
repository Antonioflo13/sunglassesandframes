import { createSlice } from "@reduxjs/toolkit";

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState: {
    value: false,
  },
  reducers: {
    setSideBarShow: (state, action) => {
      state.value = action.payload;
      if (action.payload) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    },
  },
});

export const { setSideBarShow } = sideBarSlice.actions;

export default sideBarSlice.reducer;
