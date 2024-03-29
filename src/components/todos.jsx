/* eslint-disable react/jsx-key */

import { useEffect, useState } from "react";
import { app } from "../assets/config/firebase";
import { getFirestore } from "firebase/firestore";
import {  getDocs, collection } from "firebase/firestore";
import { Tilt } from '@jdion/tilt-react'
import { GiShoppingCart } from "react-icons/gi";
import { IoMdHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import { Navbar } from "../pages/Navbar";
import { useAuth } from "../auth/AuthProvider";


export const Todos = ()=>{
  
    const [loaded, setLoaded] = useState(false);

    const {
      productos, setProductos,
      total, setTotal,
    countProducts, setCountProducts,coleccion,setColeccion,newProducto,setNewProducto,newColeccion
    } = useAuth();
    const db = getFirestore(app);
    
  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(collection(db, "Coleccion"));
      const newImpresion = [];
      querySnapshot.forEach((doc)=>{
       newImpresion.push({ id: doc.id, data: doc.data() });
      })
     
      setProductos(newImpresion);
      setLoaded(true);
    };

    obtenerProductos();
  }, [db]);
  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const newImpresion = [];
      querySnapshot.forEach((doc)=>{
       newImpresion.push({ id: doc.id, data: doc.data() });
      })
     
      setColeccion(newImpresion);
      setLoaded(true);
    };

    obtenerProductos();
  }, [db]);


  const onAddProduct = product => {
      
    const productoExistente = newProducto.find(
      (p) => p.name === product.name
    );

    if (productoExistente) {
      const nuevosProductos = newProducto.map((p) =>
        p.name === product.name ? { ...p, cantidad: p.cantidad + 1 } : p
      );
      setNewProducto(nuevosProductos);
    } else {
      setNewProducto([...newProducto, ...newColeccion, { ...product, cantidad: 1 }]);
    }

    setTotal(total + product.precio );
    setCountProducts(countProducts + 1);
  
 
  
  }


  const defaultOptions2 = {
    reverse: false, // reverse the tilt direction
    max: 0, // max tilt rotation (degrees)
    perspective: 50, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.2, // 2 = 200%, 1.5 = 150%, etc..
    speed: 10, // Speed of the enter/exit transition
    transition: false, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.05,.98,.52,.99)", // Easing on enter/exit.
  };
  return(
    <>

<Navbar/>
<div className="bg-teal-50 h-[300vh]">
<div className="p-6">
        <h1 className="text-center text-3xl ">PRODUCTOS</h1>
    </div>
     <div className=" mt-10 flex flex-wrap gap-12 mb-4">
           
          
              {loaded &&
                productos.length > 0 &&
                productos.map((producto) => (
                  <Tilt
                    options={defaultOptions2}
                    style={{ height: 400, width: 350 }}
                  >
                    <div className=" bg-purple-50 flex flex-col justify-center items-center mx-20 mt-5 mb-4 w-[100%] h-[390px] rounded-xl shadow-2xl"key={producto.id}>
                      <div className="flex justify-center items-center mt-[-40px]">
                        <img
                          className="w-[200px] h-[200px] "
                          src={producto.data.imagen}
                          alt=""
                        />
                      </div>
                      <div className="mt-1 mb-4">
                        <h1 className="font-bold text-xl">
                          {producto.data.name}{" "}
                        </h1>
                      </div>

                      <div className="flex justify-between w-[100%] ">
                        <div className="mx-4 mt-5">${producto.data.Precio}</div>
                        <div className="flex gap-2 mx-4 mt-5">
                          <Link>
                            {" "}
                            <IoMdHeartEmpty FaBeer size={26} className="" />
                          </Link>{" "}
                          <Link  onClick={()=>{onAddProduct({name:producto.data.name, precio:producto.data.Precio})}}>
                            {" "}
                            <GiShoppingCart FaBeer size={26} className="" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                ))}
         
          </div>
          <div className=" mt-10 flex flex-wrap gap-12 mb-28">
           
          
           {loaded &&
             coleccion.length > 0 &&
             coleccion.map((producto) => (
               <Tilt
                 options={defaultOptions2}
                 style={{ height: 400, width: 340 }}
               >
                 <div className=" bg-purple-50 flex flex-col justify-center items-center mx-20 mt-5 mb-4 w-[100%] h-[390px] rounded-xl shadow-2xl"key={producto.id}>
                   <div className="flex justify-center items-center mt-[-40px]">
                     <img
                       className="w-[200px] h-[200px] "
                       src={producto.data.imagen}
                       alt=""
                     />
                   </div>
                   <div className="mt-1 mb-4">
                     <h1 className="font-bold text-xl">
                       {producto.data.name}{" "}
                     </h1>
                   </div>

                   <div className="flex justify-between w-[100%] ">
                     <div className="mx-4 mt-5">${producto.data.precio}</div>
                     <div className="flex gap-2 mx-4 mt-5">
                       <Link>
                         {" "}
                         <IoMdHeartEmpty FaBeer size={26} className="" />
                       </Link>{" "}
                       <Link  onClick={()=>{onAddProduct({name:producto.data.name, precio:producto.data.precio})}}>
                         {" "}
                         <GiShoppingCart FaBeer size={26} className="" />
                       </Link>
                     </div>
                   </div>
                 </div>
               </Tilt>
             ))}
      
       </div>
</div>
  
    
    
    </>
  )
}

