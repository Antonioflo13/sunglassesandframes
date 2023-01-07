import { createSlice } from "@reduxjs/toolkit";

export const algoliaModalSlice = createSlice({
  name: "algoliaModal",
  initialState: {
    value: false,
  },
  reducers: {
    setAlgoliaModalShow: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAlgoliaModalShow } = algoliaModalSlice.actions;

export default algoliaModalSlice.reducer;
