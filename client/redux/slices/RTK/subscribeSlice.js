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
  tagTypes: ["Subscribe"], // Add 'Subscribe' to tagTypes

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
              ...result.subscribers.map(({ id }) => ({
                type: "Subscribe",
                id,
              })),
              "Subscribe",
            ]
          : ["Subscribe"],
    }),

    cancelSubscribe: builder.mutation({
      query: (subscriptionId) => {
        console.log({ subscriptionId: subscriptionId }, "cancelSubscribe");
        let loginUser = CookieService.get("userInfo");

        return {
          url: `subscribe/cancelSubscribe/`,
          method: "POST",
          body: { subscriptionId: subscriptionId },
          headers: {
            Authorization: `Bearer ${loginUser.token}`,
          },
        };
      },
      invalidatesTags: (result, error, subscriptionId) => [
        { type: "Subscribe", id: subscriptionId },
      ],
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

    getUserSubscribtions: builder.query({
      query: () => {
        let loginUser = CookieService.get("userInfo");

        console.log(loginUser, "loginUser");

        return {
          url: `subscribe/userSubscribtion/${loginUser.id}`,
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
    }),
  }),
});

export const {
  useGetsubscribeDataListQuery,
  useGetSinglesubscribeQuery,
  useGetUserSubscribtionsQuery,
  useAddsubscribeMutation,
  useCancelSubscribeMutation,
} = subscribeApiSlice;
