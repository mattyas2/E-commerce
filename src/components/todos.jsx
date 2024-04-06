/* eslint-disable react-hooks/exhaustive-deps */
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
import { FcLike } from "react-icons/fc";
import estrella from "../assets/img/estrella.png";
import reloj from "../assets/img/reloj.png";
import vector from "../assets/img/vect.png";
import flecha from "../assets/img/flecha.png";
import color from "../assets/img/colors.png";

export const Todos = ()=>{
  
    const [loaded, setLoaded] = useState(false);

    const {
      productos, setProductos,
      total, setTotal,
    countProducts, setCountProducts,coleccion,setColeccion,carrito,setCarrito,favorito,setFavorito
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


  const onAddProduct = async (product) => {
  
    const productoExistente = carrito.find((item) => item.id === product.id);
  if (productoExistente) {
    const carritoActualizado = carrito.map((item) =>
      item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    setCarrito(carritoActualizado);
    
  } else {
    setCarrito([...carrito, { ...product, cantidad: 1 }]);
  
  }
  setTotal(total + product.data.precio );
    setCountProducts(countProducts + 1);
    
  };

 

   
    

    const addToFavorites = async (product) => {
      const personajeExistente = favorito.find((item) => item.id === product.id);
      if (personajeExistente) {
        const favoritosActualizados = favorito.filter((item) => item.id !== product.id);
        setFavorito(favoritosActualizados);
      } else {
        setFavorito([...favorito, product]);
      }
    }
    


  return(
    <>

<Navbar/>
<div className="bg-teal-50 h-[100%]">
<div className="p-6">
        <h1 className="text-center text-3xl ">PRODUCTOS</h1>
    </div>
     <div className=" mt-10 flex flex-wrap gap-12 mb-4 max-sm:flex max-sm:flex-wrap max-sm:w-[100%] max-sm:mb-0 max-sm:mt-0" >
           
          
              {loaded &&
                productos.length > 0 &&
                productos.map((producto) => (
                  <div className="relative  mx-4 mt-2 rounded-xl shadow-2xl w-[320px] flex flex-col justify-center  bg-purple-50 mb-9 h-[500px]">
                  <Tilt>
                    <div className="bg-red-500 w-fit px-2 text-white font-bold rounded-sm absolute top-3 left-6">
                      <p>sale</p>
                    </div>
  
                    <img
                      className="w-full h-[300px]"
                      src={producto.data.imagen}
                      alt=""
                    />
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
                        ${producto.data.precio}
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
  
                    <div className="flex items-center justify-center gap-3 border-sky-500 border rounded-full w-[150px] mt-3 p-2 mx-16 ">
                      <p className="text-cyan-500 font-bold flex gap-7 ">
                        <Link>
                          {" "}
                          {favorito.find((item) => item.id === producto.id) ? (
                            <FcLike
                              FaBeer
                              size={36}
                              onClick={() => addToFavorites(producto)}
                            />
                          ) : (
                            <IoMdHeartEmpty
                              FaBeer
                              size={36}
                              onClick={() => addToFavorites(producto)}
                            />
                          )}
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
          <div className=" mt-10 flex flex-wrap gap-12 mb-28 max-sm:flex max-sm:flex-wrap max-sm:w-[100%] max-sm:justify-center max-sm:mb-10">
           
          
           {loaded &&
             coleccion.length > 0 &&
             coleccion.map((producto) => (
              <div className="relative  mx-4 mt-2 rounded-xl shadow-2xl w-[320px] flex flex-col justify-center  bg-purple-50 mb-9 h-[500px]">
              <Tilt>
                <div className="bg-red-500 w-fit px-2 text-white font-bold rounded-sm absolute top-3 left-6">
                  <p>sale</p>
                </div>

                <img
                  className="w-full h-[300px]"
                  src={producto.data.imagen}
                  alt=""
                />
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
                    ${producto.data.precio}
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

                <div className="flex items-center justify-center gap-3 border-sky-500 border rounded-full w-[150px] mt-3 p-2 mx-16 ">
                  <p className="text-cyan-500 font-bold flex gap-7 ">
                    <Link>
                      {" "}
                      {favorito.find((item) => item.id === producto.id) ? (
                        <FcLike
                          FaBeer
                          size={36}
                          onClick={() => addToFavorites(producto)}
                        />
                      ) : (
                        <IoMdHeartEmpty
                          FaBeer
                          size={36}
                          onClick={() => addToFavorites(producto)}
                        />
                      )}
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
       <div className="h-36">

  </div>
    
</div>

    
    </>
  )
}

