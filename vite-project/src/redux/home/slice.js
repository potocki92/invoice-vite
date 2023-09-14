import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isHome: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setIsHome: (state, action) => {
      state.isHome = action.payload;
    },
  },
});

export const { setIsHome } = homeSlice.actions;
export default homeSlice.reducer;
