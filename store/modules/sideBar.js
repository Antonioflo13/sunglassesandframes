import { createSlice } from "@reduxjs/toolkit";

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState: {
    value: false,
  },
  reducers: {
    setSideBarShow: (state, action) => {
      state.value = action.payload;
      document.body.classList.add(
        action.payload ? "overflow-hidden" : "overflow-visible"
      );
    },
  },
});

export const { setSideBarShow } = sideBarSlice.actions;

export default sideBarSlice.reducer;
