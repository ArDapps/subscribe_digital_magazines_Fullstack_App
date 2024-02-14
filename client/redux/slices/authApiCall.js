import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import CookieService from "@/utils/CookieService";
//Login User
export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async (user, { rejectWithValue }) => {
    console.log(user, "auth/LoginUser");
    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_END_POINT + "auth/login",
        user
      );

      console.log(data.id, "LOGIN SUCESS DATA");

      const expirationDate = new Date();
      const IN_DAYS = 7;

      const EXPIRES_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS;

      const expiresAt = new Date(expirationDate.getTime() + EXPIRES_IN_DAYS);

      const options = { path: "/", expires: expiresAt };

      CookieService.set(
        "userInfo",
        { id: data.id, token: data.token },
        options
      );

      return data;
    } catch (error) {
      console.error("Error at login:", error);
      // Use rejectWithValue to return an action with payload for error
      return rejectWithValue(error.response.data);
    }
  }
);

//Register User
export const RegisterUser = createAsyncThunk(
  "auth/RegisterUser",

  async (userFullData) => {
    const name = userFullData.firstName;
    const email = userFullData.email;
    const pass = userFullData.password;
    const user = {
      firstName: name,
      email: email,
      password: pass,
      password_confirm: pass,
    };
    console.log("REGISTER DATA user", user);
    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_END_POINT + "auth/register",
        user
      );
      console.log("REGISTER DATA", data);
      const expirationDate = new Date();
      const IN_DAYS = 7;

      const EXPIRES_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS;

      const expiresAt = new Date(expirationDate.getTime() + EXPIRES_IN_DAYS);

      const options = { path: "/", expires: expiresAt };
      CookieService.set(
        "userInfo",
        { id: data.userAdded.id, token: data.token },
        options
      );

      return data;
    } catch (e) {
      toast.error(e.data.error.message);
    }
  }
);

//LogOUT User
export const LogOutUser = createAsyncThunk("auth/LogOutUser", async () => {
  try {
    CookieService.remove("userInfo");

    return null;
  } catch (e) {
    toast.error(error.response.data.message);
    console.log("ERROR AT LOHIN USER", e);
  }
});
