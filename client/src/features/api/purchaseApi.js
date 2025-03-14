import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const USER_API = "http://192.168.43.164:8080/api/v1/user/";
// const USER_API = "http://192.168.115.237:8080/api/v1/user/";
// const USER_API = "http://192.168.154.237:8080/api/v1/user/";
// const USER_API = "http://169.254.211.9:8080/api/v1/user/";
// const USER_API = "http://192.168.233.237:8080/api/v1/user/";
const COURSE_PURCHASE_API = "http://localhost:8080/api/v1/purchase";
// const COURSE_PURCHASE_API = `${import.meta.env.VITE_API_URL}/purchase`;

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // mutation == POST  query==GET
    createCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { courseId },
      }),
    }),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getPurchasedCourse: builder.query({
      query: () => ({
        url: ``,
        method: "GET",
      }),
    }),
  }),
});

export const {
    useCreateCheckoutSessionMutation,
    useGetCourseDetailWithStatusQuery,
    useGetPurchasedCourseQuery
} = purchaseApi;

// HTTP    Method	    Typical RTK Query Type	Use Case

// GET  	 query	    Re trieve data from the server.
// POST	   mutation 	Create new resources on the server.
// PUT	   mutation 	Replace existing resources entirely.
// PATCH   mutation 	Partially update an existing resource.
// DELETE  mutation 	Remove a resource from the server.
