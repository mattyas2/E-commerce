/* eslint-disable no-unused-vars */

import {Login} from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";

import { Home } from './pages/Home.jsx';
import {  BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ResetPassword } from './pages/resetpassword.jsx'

import { Accesorios } from "./components/accesorios.jsx";
import { Deporte } from "./components/Deporte.jsx";
import { Electronica } from "./components/Electronica.jsx";
import { Favoritos } from "./components/Favoritos.jsx";
import {Hogar } from "./components/Hogar.jsx";
import { Tazas } from "./components/Ropa.jsx";
import { Todos } from "./components/todos.jsx";
import { AccesoriosDeViajes } from "./components/Accesoriosdeviaje.jsx";
import { Novedades } from "./components/Novedades.jsx";
import { Checkout } from "./components/Checkout.jsx";
import { Cart }  from './components/Cart.jsx'

import { ProductsPage } from "./products/ProductsPage.jsx";

import { Footer } from "./components/Footer.jsx";
import { Profile } from "./pages/Profile.jsx";
import { SearchComponent } from "./components/Search.jsx";












function App() {

  
  
  return (

    <>
  


    
     <BrowserRouter>    

     <Routes>
    
      <Route path="/" element={<Home/>} />      
      <Route path="/Register" element={<Register/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Reset" element={<ResetPassword/>} />
      <Route path="/Accesorios" element={<Accesorios/>} />
      <Route path="/Search" element={<SearchComponent/>}/>
      <Route path="/Hogar" element={<Hogar/>} />
      <Route path="/Deporte" element={<Deporte/>} />
      <Route path="/Electronica" element={<Electronica/>} />
      <Route path="/Favoritos" element={<Favoritos/>} />
      <Route path="/Ropa" element={<Tazas/>} />
      <Route path="/Todos" element={<Todos/>} />
      <Route path="/Viajes" element={<AccesoriosDeViajes/>} />
      <Route path="/ProductsPage/:productoId" element={<ProductsPage/>}/>
      <Route path="/Novedades" element={<Novedades/>} />
      <Route path="/Profile" element={<Profile/>}/>
      <Route path="/Checkout" element={<Checkout/>} />
      <Route path="/Carrito" element={<Cart/>}/>
    

    
   


     </Routes>
     <Footer  />
 
     </BrowserRouter>
   
  











   </>
  )

}

export default App
