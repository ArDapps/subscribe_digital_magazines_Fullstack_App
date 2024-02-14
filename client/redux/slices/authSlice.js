import CookieService from "@/utils/CookieService";
import { createSlice } from "@reduxjs/toolkit";
import { LogOutUser, LoginUser, RegisterUser } from "./authApiCall";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user:
      typeof window !== "undefined" && CookieService.get("userInfo")
        ? CookieService.get("userInfo")
        : null,
    error: null,
  },

  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(LoginUser.pending, (state, action) => {
        console.log(state);
        state.isLoading = true;
        state.user = null;

        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        console.log("Fullfied data", state, action);
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;

        console.log("=====+++ contract", action.payload);
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        console.log("=====+++LoginUser.rejected", action.message);

        state.error = "Invalid Cridential Data";
      })
      .addCase(RegisterUser.pending, (state, action) => {
        console.log(state);
        state.isLoading = true;
        state.user = null;

        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        console.log("Fullfied data", state, action);
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;

        console.log("=====+++ RegisterUser", action.payload);
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "User Already Exist ";
      })
      .addCase(LogOutUser.pending, (state, action) => {
        console.log(state);
        state.isLoading = true;
        state.user = null;

        state.error = null;
      })
      .addCase(LogOutUser.fulfilled, (state, action) => {
        console.log("Fullfied data", state, action);
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;

        console.log("=====+++ contract", state.user);
      })
      .addCase(LogOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = "Login Cridential Not Correct";
      });
  },
});

// const authReducer = authSlice.reducer;
// const authActions = authSlice.actions;

export const { authConnector } = authSlice.actions;
//We can use this as selectore direct
export const selectAuth = ({ auth }) => auth;
export default authSlice.reducer;

// export { authReducer, authActions };
