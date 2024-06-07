import { lazy } from 'react';
import "./index.css"
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
const HomePageExport = lazy(() => import("./pages/homePage/home-page"))
const NotFound = (()=> <Navigate to="./" />)
const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path='/' element={<Navbar />}>
      <Route index  element={<HomePageExport />} />
    </Route>
  </Route>
))
function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App;
