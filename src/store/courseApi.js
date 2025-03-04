import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "https://backend-pharmaminds.onrender.com/api/v1/courses/";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Course", "Lecture"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category, instructorName }) => ({
        url: "create",
        method: "POST",
        body: { courseTitle, category, instructorName },
      }),
      invalidatesTags: ["Course"],
    }),
    getCourse: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    updateCourse: builder.mutation({
      query: ({ formData, id }) => ({
        url: `${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Course"],
    }),
    getCourseById: builder.query({
      query: (id) => ({
        url: `${id}`,
        method: "GET",
      }),
    }),
    PublishCourse:builder.mutation({
       query:({courseId,query})=>({
          url:`publish/${courseId}?publish=${query}`,
          method:"PATCH"
       })
    }),
    getPublishCourse:builder.query({
      query:()=>({
        url:"get",
        method:"GET"
      })
    }),
    createLectures: builder.mutation({
      query: ({ sectionTitle, lectureTitle, courseId }) => ({
        url: `${courseId}/lectures`,
        method: "POST",
        body: { sectionTitle, lectureTitle },
      }),
      invalidatesTags: ["Lecture"],
    }),
    getLecture: builder.query({
      query: (courseId) => ({
        url: `${courseId}/lectures`,
        method: "GET",
      }),
      providesTags: ["Lecture"],
    }),
    getLectureById: builder.query({
      query: ({ courseId, lectureId }) => ({
        url: `${courseId}/lectures/${lectureId}`,
        method: "GET",
      }),
      providesTags: ["Lecture"],
    }),
    updateLecture: builder.mutation({
      query: ({ courseId, lectureId, formData }) => ({
        url: `${courseId}/lectures/${lectureId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Lecture"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCourseQuery,
  useUpdateCourseMutation,
  useGetCourseByIdQuery,
  useCreateLecturesMutation,
  useGetLectureQuery,
  useGetLectureByIdQuery,
  useUpdateLectureMutation,
  usePublishCourseMutation,
  useGetPublishCourseQuery
} = courseApi;
