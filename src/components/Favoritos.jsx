/* eslint-disable no-unused-vars */
// import { Tilt } from "react-tilt";
// import { Link } from "react-router-dom";
// import { GiShoppingCart } from "react-icons/gi";

import { Navbar } from "../pages/Navbar";
import { FcLike } from "react-icons/fc";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

import estrella from "../assets/img/estrella.png";
import reloj from "../assets/img/reloj.png";
import vector from "../assets/img/vect.png";
import flecha from "../assets/img/flecha.png";
import color from "../assets/img/colors.png";
import { useEffect } from "react";
import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { app } from "../assets/config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Tilt } from "react-tilt";
import { Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { IoMdArrowRoundBack } from "react-icons/io";

import { Breadcrumbs } from "./RutasActual";
import Alert from "./Alert";


export const Favoritos = () => {
 


const {
 user,onAddProduct, favorites,setFavorites,alertMessages, alertType, showAlerta, handleShowAlert } = useAuth()
 

  


  const db = getFirestore(app);
  const auth = getAuth();
  
  useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
      if (user) {
   
    
        // Obtener datos del usuario
        const userRef = doc(collection(db, "usuarios"),user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
    
    
          // Imprimir productos favoritos
          if (userData.Favoritos) {
            console.log("Productos favoritos:");
            userData.Favoritos.forEach((productId) => {
              console.log(productId)
            })
            setFavorites(userData.Favoritos || [])
              
          }
        }
      } else {
        // Usuario sin iniciar sesión
      }
    })
  },[])
  
  const onDeleteProduct = async (productId)=>{
    if (user) {     
      // Obtener datos del usuario
      const userRef = doc(db, "usuarios", user.uid);
        await updateDoc(userRef, {
   Favoritos: favorites.filter((product) => product.id !== productId),
});
 setFavorites(favorites.filter((product) => product.id !== productId));
 handleShowAlert("¡producto eliminado de la lista de deseos!");
    
    } else {
      // Usuario sin iniciar sesión
    }
 
return onDeleteProduct,favorites
}
  

  return (
    <>
      <Navbar />
      { showAlerta && (
        <Alert message={alertMessages}  type={alertType}/>
      )}
      <Breadcrumbs/>
    <div className=" bg-teal-50 h-[100%]">
    <div className="text-center font-bold text-2xl flex justify-center gap-20 mb-10 max-sm:justify-start items-center max-sm:gap-16 max-sm:mx-4">
<Link to="/">
<IoMdArrowRoundBack size={38} /> 
</Link>


  Favoritos</div>
    
    <div className="w-full flex max-sm:mb-20 bg-teal-50 mb-10 mt-10 ">
    
     <div className="w-[100%] flex flex-wrap max-sm:flex max-sm:flex-wrap max-sm:w-[100%]   ">
       {
          favorites.map((producto) => (
            <div className="relative  mx-4 mt-2 rounded-xl shadow-2xl w-[320px] flex flex-col justify-center   bg-purple-50 mb-12 h-[500px]"  key={producto.id}>
            <Tilt>
              <div className="bg-red-500 w-fit px-2 text-white font-bold rounded-sm absolute top-3 left-6">
                <p>sale</p>
              </div>
              <Link to={`/ProductsPage/${producto.id}`}> 
                     
                     <img
                       className="w-full h-[300px]"
                       src={producto.data.imagen}
                       alt=""
                     />
                 
                   </Link>
            
            </Tilt>
            <div>
              <div className="flex items-center mt-3 justify-between me-3 mx-6">
                <h6 className="text-cyan-500  font-bold">{producto.data.name}</h6>
                <div className="bg-slate-900 text-white flex items-center gap-1">
                  <div>
                    <img src={estrella} alt="" />
                  </div>{" "}
                  4.9
                </div>
              </div>

              <div className="flex gap-5 my-2 mt-1 mx-4">
                <h3 className="text-green-700 font-bold">
                  ${producto.data.precio}.000
                </h3>
              </div>
              <img className="mx-4" src={color} alt="" />
              <div className="flex gap-3 mt-2 mx-4">
                <div className="flex gap-1 items-center">
                  <img src={reloj} alt="" />
                  Pro...
                </div>
                <div className="flex  gap-1  items-center">
                  <img src={vector} alt="" />
                  64 Las...
                </div>
                <div className="flex  gap-1  items-center">
                  <img src={reloj} alt="" />
                  22 hr..
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 mb-10 border-sky-500 border rounded-full w-[150px] mt-3 p-2 mx-16 ">
                <p className="text-cyan-500 font-bold flex gap-7 ">
                  <Link>
                    {" "}
                    <FcLike
                    FaBeer
                    size={36}
                    onClick={() =>onDeleteProduct(producto.id)}
                  />
                   
                  </Link>{" "}
                  <Link>
                    {" "}
                    <span
                      onClick={() => {
                        onAddProduct(producto);
                      }}
                    >
                      <GiShoppingCart FaBeer size={36} className="" />
                    </span>
                  </Link>{" "}
                </p>
                <img src={flecha} alt="" />
              </div>
            </div>
          </div>
          ))}
      </div>
      
    </div> 
    </div>
     
  
    </>
  );
}
