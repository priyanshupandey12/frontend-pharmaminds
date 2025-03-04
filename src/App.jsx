import React from 'react'
import Login from './pages/login'

import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Course from './pages/student/Course'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import Sidebar from './pages/admin/SideBar'
import DashBoard  from './pages/admin/DashBoard'

import CourseTable from './pages/admin/course/CourseTable'
import AddCourse from './pages/admin/course/AddCourse'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/CreateCourse'
import Updatelecture from './pages/admin/lecture/Updatelecture'
import CourseDetail from './pages/student/CourseDetail'
import CourseProgress from './pages/student/CourseProgress'
import LectureViewer from './pages/student/LectureViewer'
import SearchPage from './pages/student/SearchPage'
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoute'
import PurchaseCourseProtectedRoute from './components/PurchaseRoute'
import { ThemeProvider } from './components/Theme'
import Footer from './components/Footer'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Course />
            <Footer />
          </>
        ),
      },
      {
        path: "login",
        element: <AuthenticatedUser><Login /></AuthenticatedUser>,
      },
      {
        path: "my-learning",
        element:<ProtectedRoute> <MyLearning /></ProtectedRoute>,
      },
      {
        path: "profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
      {
        path: "course/search",
        element:  <ProtectedRoute><SearchPage /></ProtectedRoute>,
      },
      {
        path: "course-detail/:courseId",
        element:<ProtectedRoute> <CourseDetail /></ProtectedRoute>,
      },
   
      {
        path: "course-progress/:courseId",
        element: <ProtectedRoute><PurchaseCourseProtectedRoute><CourseProgress /></PurchaseCourseProtectedRoute></ProtectedRoute>,
      },
      {
        path: "/courses/:courseId/lectures/:lectureId",
        element:<ProtectedRoute> <LectureViewer /></ProtectedRoute>,
      },
      {
        path: "*",
        element: <h1>404 Page Not Found</h1>,
      },

    
      {
        path: "admin",
        element:<AdminRoute> <Sidebar /></AdminRoute>, 
        children: [
          {
            path: "dashboard",
            element: <DashBoard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:id",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lectures",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lectures/:lectureId",
            element: <Updatelecture />,
          },
          
        ],
      },
    ],
    
  },
]);

const App = () => {
  return (
     <main>
     <ThemeProvider>
     <RouterProvider router={appRouter}/>
     </ThemeProvider>
  
     </main>
    
  )
}

export default App