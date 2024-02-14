import CookieService from "@/utils/CookieService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApiSlice = createApi({
  reducerPath: "users",

  tagTypes: ["users"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_END_POINT }),
  endpoints: (builder) => ({
    getSingleUser: builder.query({
      query: () => {
        let loginUser = CookieService.get("userInfo");

        return {
          url: `auth/me`,
          headers: {
            Authorization: `Bearer ${loginUser.token}`,
          },
        };
      },
      providesTags: (result, error, arg) =>
        result ? [{ type: "User", id: result._id }, "User"] : ["User"],
    }),

    updateUserProfile: builder.mutation({
      query: (formData) => {
        let loginUser = CookieService.get("userInfo");
        console.log(formData, "bodyUpdate");

        return {
          url: `/users/photo-upload`,
          method: "POST",
          body: formData, // Use body property for formData

          headers: {
            Authorization: `Bearer ${loginUser.token}`,
          },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "User", id: arg.userId },
      ], // Adjust 'User' and 'userId' based on your actual data structure
    }),
  }),
});

export const { useGetSingleUserQuery, useUpdateUserProfileMutation } =
  usersApiSlice;
