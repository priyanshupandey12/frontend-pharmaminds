import { configureStore }from "@reduxjs/toolkit"
import { userApi } from "./userApi"
import userReducer from "./userSlice"
import { courseApi } from "./courseApi"; 


const store=configureStore({
  reducer:{
    [userApi.reducerPath]:userApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware,courseApi.middleware)

})

export default store

const initializeApp = async () => {
  try {
    await store.dispatch(userApi.endpoints.loadUser.initiate(null, {forceRefetch: true}))
  } catch (error) {
    console.error("Failed to load user:", error)
  }
}
initializeApp();