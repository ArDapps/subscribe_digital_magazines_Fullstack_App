import CookieService from "@/utils/CookieService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const magazineApiSlice = createApi({
  reducerPath: "magazine",

  reducer: (state, action) => {
    console.log(action.type, action.payload);
    // ... existing reducer logic
  },

  tagTypes: ["magazine"],

  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_END_POINT }),
  endpoints: (builder) => ({
    getMagazineDataList: builder.query({
      query: (arg) => {
        let loginUser = CookieService.get("userInfo");

        return {
          url: `magazine`,
          headers: {
            Authorization: `Bearer ${loginUser.token}`,
          },
        };
      },
    }),

    //AddMagazineTypesToSpecialEvent
    addMagazine: builder.mutation({
      query: (arg) => {
        console.log(arg, "addMagazine");
        let loginUser = CookieService.get("userInfo");

        return {
          url: `magazine/create`,
          method: "POST",
          body: arg,
          headers: {
            Authorization: `Bearer ${loginUser.token}`,
          },
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: "Magazine", id: arg }],
    }),
  }),
});

export const { useGetMagazineDataListQuery, useAddMagazineMutation } =
  magazineApiSlice;
