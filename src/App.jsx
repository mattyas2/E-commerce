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
import { Accesorios } from "./components/accesorios.jsx";
import { Deporte } from "./components/Deporte.jsx";
import { Electronica } from "./components/Electronica.jsx";
import { Favoritos } from "./components/Favoritos.jsx";
import {Hogar } from "./components/Hogar.jsx";
import {Ropa } from "./components/Ropa.jsx";
import { Todos } from "./components/todos.jsx";







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
      <Route path="/Accesorios" element={<Accesorios/>} />
      <Route path="/Hogar" element={<Hogar/>} />
      <Route path="/Deporte" element={<Deporte/>} />
      <Route path="/Electronica" element={<Electronica/>} />
      <Route path="/Favoritos" element={<Favoritos/>} />
      <Route path="/Ropa" element={<Ropa/>} />
      <Route path="/Todos" element={<Todos/>} />
   


     </Routes>
     
     </BrowserRouter>

     </AuthProvider>




{/* <RouterProvider router={router}/> */}






   </>
  )

}

export default App
