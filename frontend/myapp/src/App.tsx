import React, { lazy } from 'react';
import "./index.css"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom';

const HomePageExport = lazy(() => import("./pages/homePage/home-page"))
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/'>
    <Route element={<HomePageExport />} index />
  </Route>
))
function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App;
