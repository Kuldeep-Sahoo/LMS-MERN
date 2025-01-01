
import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import MainLayout from './layout/MainLayout'
import { RouterProvider } from 'react-router'
import Cources from './pages/student/Cources'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import Sidebar from './pages/admin/Sidebar'
import DashBoard from './pages/admin/Dashboard'
import Coursetable from './pages/admin/course/Coursetable'
import AddCourse from './pages/admin/course/AddCourse'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/CreateLecture'
import EditLecture from './pages/admin/lecture/EditLecture'
import CourseDetail from './pages/student/CourseDetail'
import HeroSection from './components/HeroSection'
import CourseProgress from './pages/student/CourseProgress'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <>
          <HeroSection />
          <Cources />
        </>
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "my-learning",
        element: <MyLearning />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "course-details/:courseId",
        element: <CourseDetail />
      },
      {
        path: "course-progress/:courseId",
        element: <CourseProgress />
      },
      // admin rout starts here

      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <DashBoard />
          },
          {
            path: "course",
            element: <Coursetable />
          },
          {
            path: "course/create",
            element: <AddCourse />
          },
          {
            path: "course/:courseId",
            element: <EditCourse />
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />
          },
        ]
      }
    ]
  }
])

function App() {

  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  )
}

export default App
