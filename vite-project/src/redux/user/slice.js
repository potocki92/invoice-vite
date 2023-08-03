import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, updateUser } from "./operations";

const initialState = {
  user: {
    name: "",
    email: "",
    password: "",
    NIP: "",
    REGON: "",
    phone: "",
    address: {
      city: "",
      postalCode: "",
      street: "",
    },
  },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload
      })
  },
});

export const { setUser, setUserName } = userSlice.actions
export default userSlice.reducer;
