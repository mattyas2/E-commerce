/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */

import {  useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

import { Link, useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { useAuth } from "../auth/AuthProvider";
import { Navbar } from "../pages/Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";

export const ProductsPage = () => {


const { user }=useAuth()
const { productoId } = useParams();
const [producto, setProducto] = useState([]);
const db = getFirestore()
useEffect(() => {
  const obtenerDetallesProducto = async () => {
    const productoRef = doc(collection(db, "productos"), productoId);

    try {
      const productoSnapshot = await getDoc(productoRef);
      if (productoSnapshot.exists()) {
        const productoData = productoSnapshot.data();
        setProducto(productoData);
      } else {
        console.log("El producto no existe");
      }
    } catch (error) {
      console.error("Error al obtener los detalles del producto:", error);
    }
  };

  obtenerDetallesProducto();
}, [productoId]);

  console.log(productoId)

  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };
  // const toggleModale = () => {
  //   setShowModale(!showModal1e);
  // };
  const onAddProduct = async (product) => {
    if (!user || !user.uid) {
      console.error('Usuario no autenticado o UID no disponible');
      return;
    }
    const userRef = doc(db, "usuarios", user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const Carrito = userData.Carrito || [];

      // agregarlo
      const updatedCarrito = [...Carrito,{ data:{
        producto:productoId,
        name: producto.name,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1
      }
       
       

      
      }];
      await setDoc(userRef, { Carrito: updatedCarrito }, { merge: true });
      console.log("Producto agregado al carrito correctamente");

    }
  }
  

  
  return (
    <>
  <Navbar/>
    <div className="col-12 max-sm:w-full bg-teal-50 max-sm:mb-6">
    <div className="text-center font-bold text-2xl flex  justify-center gap-20 mb-10 max-sm:justify-start items-center max-sm:gap-16 max-sm:mx-4">
<Link to="/">
<IoMdArrowRoundBack size={38} /> 
</Link>

inicio
</div>

<div>
  
    
      {producto && (
         <div className="bg-teal-50 py-6 sm:py-8 lg:py-12">
         <div className="mx-auto max-w-screen-xl px-4 md:px-8">
           <div className="grid gap-8 md:grid-cols-2">
          
             <div className="grid gap-4 lg:grid-cols-5">
               <div className="-order-last flex gap-8 lg:order-none lg:flex-col">
                 <div className="overflow-hidden rounded-lg bg-gray-100">
                   <img src={producto?.imagen2} loading="lazy" alt="Photo by Himanshu Dewangan" className="h-full w-full object-cover object-center" />
                 </div>
       
                 <div className="overflow-hidden rounded-lg bg-gray-100">
                   <img  src={producto.imagen3} loading="lazy" alt="Photo by Himanshu Dewangan" className="h-full w-full object-cover object-center" />
                 </div>
       
                 <div className="overflow-hidden rounded-lg bg-gray-100">
                   <img src={producto.imagen4} loading="lazy" alt="Photo by Himanshu Dewangan" className="h-full w-full object-cover object-center" />
                 </div>
               </div>
       
               <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
                 <img src={producto.imagen} loading="lazy" alt="Photo by Himanshu Dewangan" className="h-full w-full" />
       
                 <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">sale</span>
       
                 <span className="absolute right-4 top-4 inline-block rounded-lg border bg-white px-3.5 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:text-gray-700 md:text-base">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                   </svg>
                 </span>
               </div>
             </div>
           
       
          
             <div className="md:py-4 col-12">
            
               <div className="mb-2 md:mb-3">
                 <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">{producto.name}</h2>
               </div>
              
               <div className="mb-6 flex items-center md:mb-10">
                 <div className="-ml-1 flex gap-0.5">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                   </svg>
       
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                   </svg>
       
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                   </svg>
       
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                   </svg>
       
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                   </svg>
                 </div>
       
                 <span className="ml-2 text-sm text-gray-500">4.2</span>
       
                 <span className="ml-4 text-sm font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">view all 47 reviews</span>
               </div>
            
            
       
           
            
               
               <div className="mb-4">
                 <div className="flex items-end gap-2">
                   <span className="text-xl font-bold text-gray-800 md:text-2xl">${producto.precio}.000</span>
                   <span className="mb-0.5 text-red-500 line-through">$0.00</span>
                 </div>
       
                 <span className="text-sm text-gray-500">incl. VAT plus shipping</span>
               </div>
              
               
              
               <div className="mb-6 flex items-center gap-2 text-gray-500">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                 </svg>
       
                 <span className="text-sm">2-4 day shipping</span>
               </div>
             
       
             
               <div className="flex gap-2">
                 <button onClick={onAddProduct} className="inline-block flex-1 rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 sm:flex-none md:text-base">Add to cart</button>
               </div>
       
               <div className="mt-8 md:mt-8 lg:mt-10 w-[95%]">
                 <div className="mb-3 text-lg font-semibold text-gray-800">Description</div>
       
                 <p className="text-gray-500">
                   {producto.descripcion}
                 <br /><br />
       
                  {producto.descripcion2}
                 </p>
               </div>
             </div>
           
           </div>
         </div>
       </div>
      )}
    </div>
    </div>
  

    </>
  );
};
