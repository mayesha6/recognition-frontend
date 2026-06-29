import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout } from "../features/authSlice";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is not set");
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth: ReturnType<typeof fetchBaseQuery> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    api.dispatch(logout());
    if (typeof window !== "undefined") {
      console.warn("API returned 401/403; dispatched logout().");
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    "User",
    "Products",
    "Service",
    "Categories",
    "Consultations",
    "Plans",
    "SubCategory",
    "TopDeals",
    "UserOrders",
    "UserBookings",
    "UserSubscriptions",
    "UserCoupons",
    "Store",
    "Coupon",
    "Subscription",
    "Cart",
    "Payment",
    "MessageChat",
    "Notification",
    "UserConsultations",
    "UserReviews",
    "specialistReviews",
    "Feature",
    "Platform",
    "SpecialOffer",
  ],
  endpoints: () => ({}),
});
