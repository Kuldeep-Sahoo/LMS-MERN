
import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import HeroSection from './pages/admin/HeroSection'
import Login from './pages/Login'
import MainLayout from './layout/MainLayout'
import { RouterProvider } from 'react-router'
import Cources from './pages/student/Cources'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'

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
            <Cources/>
          </>
        )
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "my-learning",
        element:<MyLearning/>
      },
      {
        path: "profile",
        element:<Profile/>
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
