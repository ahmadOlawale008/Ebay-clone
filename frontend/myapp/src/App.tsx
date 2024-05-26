import { lazy } from 'react';
import "./index.css"
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, Routes } from 'react-router-dom';
const HomePageExport = lazy(() => import("./pages/homePage/home-page"))
const NotFound = (()=> <Navigate to="./" />)
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/'>
    <Route element={<HomePageExport />} index />
    <Route path='*' element={<NotFound />}/>
  </Route>
))
function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App;
