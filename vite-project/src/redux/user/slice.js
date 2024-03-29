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
    /**
     * Redux reducer function to set the user data in the state.
     *
     * @param {Object} state - The current state of the user slice.
     * @param {Object} action - The Redux action containing the payload.
     * @param {Object} action.payload - The user data to be set in the state.
     */
    setUser: (state, action) => {
      state.user = action.payload;
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
