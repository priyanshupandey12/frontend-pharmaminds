import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "./userSlice";

const USER_API = "http://localhost:3000/api/v1/users/"

export const userApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:USER_API,
        credentials:'include'
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url:"register",
                method:"POST",
                body:inputData
            })
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url:"login",
                method:"POST",
                body:inputData
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                
                    if (result.data && result.data.userProfile) {
                      dispatch(userLoggedIn({user: result.data.userProfile}));
                      dispatch(userApi.util.invalidateTags(["User"]));
                } 
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        loadUser:builder.query({
               query:()=>({
                 url:"profile",
                 method:"GET"
               }),
               providesTags: ["User"],
               async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                
                    if (result.data && result.data.userProfile) {
                      dispatch(userLoggedIn({user: result.data.userProfile}));
                } 
            } catch (error) {
                    console.log(error);
                }
            }
        }),
        updateUser:builder.mutation({
           query:(formData)=>({
             url:"update-profile",
             method:"PATCH",
             body:formData
            
           })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url:"logout",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try { 
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log(error);
                }
            }
        }),


    })
});
export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLoadUserQuery,
    useLogoutUserMutation,
    useUpdateUserMutation

} = userApi;