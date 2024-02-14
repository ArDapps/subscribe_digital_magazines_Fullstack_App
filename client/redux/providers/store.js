import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import { usersApiSlice } from "../slices/RTK/userSlice";
import { magazineApiSlice } from "../slices/RTK/magazineSlice";
import { subscribeApiSlice } from "../slices/RTK/subscribeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    [magazineApiSlice.reducerPath]: magazineApiSlice.reducer,
    [subscribeApiSlice.reducerPath]: subscribeApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      usersApiSlice.middleware,
      magazineApiSlice.middleware,
      subscribeApiSlice.middleware,
    ]),
});
