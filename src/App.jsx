/* eslint-disable no-unused-vars */
import { app } from "./assets/config/firebase.js"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useState } from "react";
import {Login} from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import {Navbar} from "./pages/Navbar.jsx";
import {Home} from './pages/Home.jsx';
import {  BrowserRouter, Route, Routes } from "react-router-dom";
import {createBrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ResetPassword } from './pages/resetpassword.jsx'
import { ShopingCar } from './pages/ShopingCar.jsx'
import { AuthProvider } from "./auth/AuthProvider.jsx";







//  const router = createBrowserRouter([

  
//   {
//     path:"/",
//     element:<Home/>
//   },
//   {
//     path:"/Register",
//     element:<Register/>
//   },
//   {
//     path:"/Login",
//     element:<Login/>
//   },
//   {
//     path:"/Reset",
//     element:<ResetPassword/>
//   }, 
//   {
//     path:"/Car",
//     element:<ShopingCar/>
//   },
// ])


function App() {

 
  
  return (

    <>

     <AuthProvider >
     <BrowserRouter>
     <Routes>

      <Route path="/" element={<Home/>} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Reset" element={<ResetPassword/>} />
      <Route path="/Car" element={<ShopingCar/>} />

     </Routes>
     
     </BrowserRouter>

     </AuthProvider>




{/* <RouterProvider router={router}/> */}






   </>
  )

}

export default App
