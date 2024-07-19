import React, { lazy } from 'react';
import "./index.css"
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { ClipLoader } from 'react-spinners';
import AuthenticationWrapper from './pages/authenticationPages/authentication';
import CheckAuthenticated from './provider/authProvider/checkAuthenticated';
import UserSettings from './pages/userSettingsPage/userSettings';

const HomePageExport = lazy(() => import("./pages/homePage/home-page"))
const SignUpPageExport = lazy(() => import("./pages/authenticationPages/registerPage/signUp"))
const SignInPageExport = lazy(() => import("./pages/authenticationPages/loginPage/login"))
const NotFound = (() => <Navigate to="./" replace />)
const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path='/' element={<Navbar />}>
      <Route index element={<HomePageExport />} />
      <Route path='special' element={<CheckAuthenticated />}>
        <Route index element={<UserSettings />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
    <Route element={<AuthenticationWrapper />}>
      <Route path='login' element={<React.Suspense fallback={<div className='w-fit h-fit mx-auto mt-20'>
        <ClipLoader color='#EB5E28' />
      </div>}><SignInPageExport /></React.Suspense>} />
      <Route path="signup" element={<React.Suspense fallback={<div className='w-fit h-fit mx-auto mt-20'>
        <ClipLoader color='#EB5E28' />
      </div>}><SignUpPageExport /></React.Suspense>} />
    </Route>
  </Route>
))
function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App;
