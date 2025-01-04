import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const USER_API = "http://192.168.43.164:8080/api/v1/user/";
// const USER_API = "http://192.168.115.237:8080/api/v1/user/";
// const USER_API = "http://192.168.154.237:8080/api/v1/user/";
// const USER_API = "http://169.254.211.9:8080/api/v1/user/";
// const USER_API = "http://192.168.233.237:8080/api/v1/user/";
const COURSE_PROGRESS_API =
  "https://lms-mern-final-kuldeep.onrender.com/api/v1/progress/";
// const COURSE_PROGRESS_API =  `${import.meta.env.VITE_API_URL}/progress`;

export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PROGRESS_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // mutation == POST  query==GET
    getCourseProgress: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    updateLectureProgress: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}/view`,
        method: "POST",
      }),
    }),
    completeCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/complete`,
        method: "POST",
      }),
    }),
    incompleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/incomplete`,
        method: "POST",
      }),
    }),
  }),
});

export const {
    useGetCourseProgressQuery,
    useUpdateLectureProgressMutation,
    useCompleteCourseMutation,
    useIncompleteCourseMutation
} = courseProgressApi;

// HTTP    Method	    Typical RTK Query Type	Use Case

// GET  	 query	    Re trieve data from the server.
// POST	   mutation 	Create new resources on the server.
// PUT	   mutation 	Replace existing resources entirely.
// PATCH   mutation 	Partially update an existing resource.
// DELETE  mutation 	Remove a resource from the server.
