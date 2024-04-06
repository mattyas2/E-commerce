import { Tilt } from "react-tilt";
import { Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";

import { Navbar } from "../pages/Navbar";
import { FcLike } from "react-icons/fc";
// import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

import estrella from "../assets/img/estrella.png";
import reloj from "../assets/img/reloj.png";
import vector from "../assets/img/vect.png";
import flecha from "../assets/img/flecha.png";
import color from "../assets/img/colors.png";

export const Favoritos = () => {

  const {
    total, setTotal,
  countProducts, setCountProducts,carrito,setCarrito,favorito,setFavorito
  } = useAuth();

  const eliminarDeFavoritos = (personaje) => {
    const favoritosActualizados = favorito.filter((item) => item.id !== personaje.id);
    setFavorito(favoritosActualizados);
  };

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



  return (
    <>
      <Navbar />

      <div className="text-center font-bold text-2xl">Favoritos</div>
      <div className="w-full flex max-sm:mb-20 bg-teal-50 h-[100%]">
        <div className="w-[100%] flex flex-wrap max-sm:flex max-sm:flex-wrap max-sm:w-[100%]  ">
          {favorito &&
            favorito.map((producto) => (
              <div className="relative  mx-4 mt-2 rounded-xl shadow-2xl w-[320px] flex flex-col justify-center  bg-purple-50 mb-9 h-[500px]"  key={producto.id}>
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
                      onClick={() => eliminarDeFavoritos(producto)}
                    />
                      ) : (
                       
                        <FcLike
                        FaBeer
                        size={36}
                        onClick={() => eliminarDeFavoritos(producto)}
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
        
      </div>
    </>
  );
};
