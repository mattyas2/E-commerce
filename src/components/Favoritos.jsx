import { Tilt } from "react-tilt";
import { Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";

import { Navbar } from "../pages/Navbar";
import { FcLike } from "react-icons/fc";
// import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";



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



  const defaultOptions = {
    reverse: true, // reverse the tilt direction
    max: 15, // max tilt rotation (degrees)
    perspective: 70, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.3, // 2 = 200%, 1.5 = 150%, etc..
    speed: 100, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  return (
    <>
      <Navbar />

      <div className="text-center font-bold text-2xl">Favoritos</div>
      <div className="w-full flex max-sm:mb-20 bg-teal-50 h-[100%]">
        <div className="w-[100%] flex flex-wrap max-sm:flex max-sm:flex-wrap max-sm:w-[100%]  ">
          {favorito &&
            favorito.map((producto) => (
              <div
                className=" bg-purple-50 flex flex-col justify-center  max-sm:flex max-sm:flex-wrap max-sm:w-[100%] max-sm:mx-4 max-sm: max-sm:mt-4 items-center mx-[50px] mt-5 mb-4 w-[25%] h-[400px] rounded-xl shadow-2xl "
                key={producto.id}
              >
                <div className="flex justify-center items-center mt-[-40px]">
                  <Tilt
                    options={defaultOptions}
                    style={{ height: 200, width: 260, marginLeft: 60 }}
                  >
                    <img
                      className="w-[200px] h-[200px] "
                      src={producto.data.imagen}
                      alt=""
                    />
                  </Tilt>
                </div>
                <div className="mt-1 mb-4">
                  <h1 className="font-bold text-xl">{producto.data.name} </h1>
                </div>
                <div className="flex justify-between w-[100%] ">
                  <div className="mx-4 mt-5">${producto.data.precio}</div>
                  <div className="flex gap-2 mx-4 mt-5">
                  <Link>
                      {" "}
           {favorito.find((item) => item.id === producto.id) ?  <FcLike  FaBeer
           onClick={() => eliminarDeFavoritos(producto)}
                      size={26}
                     />: '' }
                    </Link>{" "}
                    <Link
                      onClick={() => {
                        onAddProduct(producto);
                      }}>
                      {" "}
                      <GiShoppingCart FaBeer size={26} className="" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
        
      </div>
    </>
  );
};
