
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
import CourseProgress from './pages/student/CourseProgress'
import SearchPage from './pages/student/SearchPage'
import HeroSection from './pages/student/HeroSection'
import { AdminRoute, AuthenticatedUser, ProtectRoute } from './components/ProtectedRoute'
import PurchaseCourseProtectedRoute from './components/purchaseCourseProtectedRoute'
import { ThemeProvider } from './components/ThemeProvider'
import Footer from './components/Footer'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element:
          <>
            <HeroSection />
            <Cources />
            <Footer />
          </>
      },
      {
        path: "login",
        element: <>
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        </>
      },
      {
        path: "my-learning",
        element:
          <ProtectRoute>
            <MyLearning />
          </ProtectRoute>
      },
      {
        path: "profile",
        element:
          <ProtectRoute>
            <Profile />
          </ProtectRoute>
      },
      {
        path: "course/search",
        element:
          <ProtectRoute>
            <SearchPage />
          </ProtectRoute>
      },
      {
        path: "course-details/:courseId",
        element:
          <ProtectRoute>
            <CourseDetail />
          </ProtectRoute>
      },
      {
        path: "course-progress/:courseId",
        element:
          <PurchaseCourseProtectedRoute >
            <ProtectRoute>
              <CourseProgress />
            </ProtectRoute>
          </PurchaseCourseProtectedRoute>
      },
      // admin rout starts here

      {
        path: "admin",
        element:
          <AdminRoute>
            <Sidebar />
          </AdminRoute>,
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
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  )
}

export default App
