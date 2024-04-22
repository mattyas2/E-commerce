/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { Navbar } from "../pages/Navbar.jsx";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../assets/config/firebase.js";

import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider.jsx";
import { IoMdArrowRoundBack } from "react-icons/io";

export function Cart() {
  const [total, setTotal] = useState(0);

  const db = getFirestore(app);
  const auth = getAuth();
  const { user, carrito, setCarrito } = useAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Obtener datos del usuario
        const userRef = doc(db, "usuarios", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Imprimir productos del carrito
          if (userData.Carrito) {
            userData.Carrito.forEach((productId) => {
              setCarrito(userData.Carrito || []);
            });
          }
        }
      } else {
        // Usuario sin iniciar sesión
      }
    });
  }, []);

  const emptyCart = async () => {
      // Obtener datos del usuario
      const userRef = doc(db, "usuarios", user.uid);
      await updateDoc(userRef, {
        Carrito: [],
      });
      setCarrito([]);
  

    return emptyCart, carrito;
  };

  const onDeleteProduct = async (productId) => {
  
      // Obtener datos del usuario
      const userRef = doc(db, "usuarios", user.uid);
      await updateDoc(userRef, {
        Carrito: carrito.filter((product) => product.id !== productId),
      });
      setCarrito(carrito.filter((product) => product.id !== productId));
 

    return onDeleteProduct, carrito;
  };

  useEffect(() => {
    let total = 0;
    carrito.forEach((producto) => {
      total += parseFloat(producto.data.precio);
    });
    setTotal(total);
  }, [carrito]);

  return (
    <>
      <Navbar />
      <div className="bg-teal-50 mt-[-40px]">
        <div className="text-center font-bold text-2xl flex  justify-center gap-20 mb-10 max-sm:justify-start items-center max-sm:gap-16 max-sm:mx-4">
          <Link to="/">
            <IoMdArrowRoundBack size={38} />
          </Link>

          <div className="text-center mb-10 mt-10 text-2xl font-bold">
            Productos: {carrito.length}
          </div>
        </div>

        <aside className="cart flex justify-center items-center w-full mt-10 ">
          <ul className="w-full ">
            <>
              <div className="row-product w-[90%] ">
                {carrito &&
                  carrito.map((product) => (
                    <>
                      <div
                        className="cart-produc mb-2 flex w-[100%] justify-center "
                        key={product.id}
                      >
                        <div className="info-cart-produc w-[100%] flex justify-evenly items-center col-12 ">
                          <span className="cantidad-producto-carrito col-1">
                            {product.cantidad}
                          </span>
                          <span className="col-2">
                            <img
                              className="w-20"
                              src={product.data.imagen}
                              alt={product.name}
                            />
                          </span>

                          <p className="titulo-producto-carrito col-4">
                            {product.data.name}
                          </p>
                          <span className="precio-producto-carrito">
                            ${product.data.precio}.000
                          </span>
                          <button></button>
                        </div>
                        <div>
                          <button onClick={() => onDeleteProduct(product.id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className=" mt-2 w-16 max-sm:w-10 hover:stroke-red-500 cursor-pointer"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
              <div className="cart-total">
                <h3>Total: ${total}.000</h3>
                <span className="total-pagar"></span>
              </div>

              <div className="flex justify-center items-center gap-10 mb-10">
                <button
                  className="btn-clear-all rounded-2xl "
                  onClick={emptyCart}
                >
                  Vaciar Carrito
                </button>

                <button className="btn-clear-all rounded-2xl  ">
                  <Link to="/Checkout"> Comprar</Link>
                </button>
              </div>
            </>
          </ul>
        </aside>
      </div>
    </>
  );
}

// import { useState } from 'react';
// import { collection, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
// // Suponiendo que tienes un hook personalizado para manejar la autenticación
// import { app } from '../assets/config/firebase';
// import { useAuth } from '../auth/AuthProvider';

// export const Cart = () => {
//   const { user, productos} = useAuth(); // Obtén el usuario logueado desde tu hook personalizado de autenticación
//   const [cantidad, setCantidad] = useState(1);
//   const db = getFirestore(app);
//   const onAddProduct = async () => {

//     // Obtén el documento del usuario logueado
//     const usuarioRef = doc(collection(db, 'usuarios'), user.uid);
//     const usuarioDoc = await getDoc(usuarioRef);

//     // Obtén el carrito de compras del usuario
//     const carrito = usuarioDoc.data().Carrito || [];

//     // Verifica si el producto ya está en el carrito
//     const productoEnCarrito = carrito.find((item) => item.id === productos.id);

//     if (productoEnCarrito) {
//       // Si el producto ya está en el carrito, actualiza la cantidad
//       productoEnCarrito.cantidad += cantidad;
//     } else {
//       // Si el producto no está en el carrito, agrégalo
//       carrito.push({
//         id: productos.id,
//         name: productos.name,
//         precio: productos.precio,
//         cantidad: cantidad,
//       });
//     }

//     // Actualiza el carrito en la base de datos
//     await updateDoc(usuarioRef, { carrito });

//     // Reinicia la cantidad a 1
//     setCantidad(1);
//   };

//   return (
//     <div>
//       <h2>{productos.name}</h2>
//       <p>Precio: {productos.precio}</p>
//       <p>Cantidad: {cantidad}</p>
//       <button onClick={onAddProduct}>Agregar al carrito</button>
//       <button onClick={() => setCantidad(cantidad + 1)}>+</button>
//       <button onClick={() => setCantidad(cantidad - 1)}>-</button>
//     </div>
//   );
// };
