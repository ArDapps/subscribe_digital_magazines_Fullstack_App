import CookieService from "@/utils/CookieService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subscribeApiSlice = createApi({
  reducerPath: "subscribe",

  reducer: (state, action) => {
    console.log(action.type, action.payload);
    // ... existing reducer logic
  },

  tagTypes: ["subscribe"],

  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_END_POINT }),
  endpoints: (builder) => ({
    getsubscribeDataList: builder.query({
      query: (arg) => {
        let loginUser = CookieService.get("userInfo");

        return {
          url: `subscribe`,
          headers: {
            Authorization: `Bearer ${loginUser.token}`,
          },
        };
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "subscribe", id })),
              "subscribe",
            ]
          : ["subscribe"],
    }),

    getSinglesubscribe: builder.query({
      query: (arg) => {
        let loginUser = CookieService.get("userInfo");

        return {
          url: `subscribe/${arg}`,
          headers: {
            Authorization: `Bearer ${loginUser.token}`,
          },
        };
      },
    }),

    //AddsubscribeTypesToSpecialEvent
    addsubscribe: builder.mutation({
      query: (arg) => {
        console.log({ magazineId: arg }, "addsubscribe");
        let loginUser = CookieService.get("userInfo");

        return {
          url: `subscribe/`,
          method: "POST",
          body: { magazineId: arg },
          headers: {
            Authorization: `Bearer ${loginUser.token}`,
          },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "subscribe", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetsubscribeDataListQuery,
  useGetSinglesubscribeQuery,
  useAddsubscribeMutation,
} = subscribeApiSlice;
