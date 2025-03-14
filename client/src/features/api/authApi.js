import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

// const USER_API = "http://192.168.43.164:8080/api/v1/user/";
// const USER_API = "http://192.168.115.237:8080/api/v1/user/";
// const USER_API = "http://192.168.154.237:8080/api/v1/user/";
// const USER_API = "http://169.254.211.9:8080/api/v1/user/";
// const USER_API = "http://192.168.233.237:8080/api/v1/user/";
const USER_API = "https://lms-kuldeep.vercel.app/api/v1/user/";
// const USER_API = `${import.meta.env.VITE_API_URL}/user`;
// console.log("API URL:", import.meta.env.VITE_API_URL);


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // mutation == POST  query==GET
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: "profile/update",
        method: "PUT",
        body: formData,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
  useLogoutUserMutation,
} = authApi;

// HTTP    Method	    Typical RTK Query Type	Use Case

// GET  	 query	    Re trieve data from the server.
// POST	   mutation 	Create new resources on the server.
// PUT	   mutation 	Replace existing resources entirely.
// PATCH   mutation 	Partially update an existing resource.
// DELETE  mutation 	Remove a resource from the server.
