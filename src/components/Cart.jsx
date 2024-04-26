/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { Navbar } from "../pages/Navbar.jsx";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../assets/config/firebase.js";
import { MdDelete } from "react-icons/md";

import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider.jsx";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProductHunt } from "react-icons/cg";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

export function Cart() {
  const [total, setTotal] = useState(0);
const [totalQuantity1, setTotalQuantity1] = useState(0)
  const db = getFirestore(app);
  const auth = getAuth();
  const {
    user,
    carrito,
    setCarrito,
    increaseQuantity,
    decreaseQuantity,
 totalQuantity, setTotalQuantity
  } = useAuth();

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
      total += parseFloat(producto.data.precio) * producto.cantidad;
    });
    setTotal(total);
  }, [carrito]);

useEffect(()=>{
  const totel = carrito.reduce((acc,item)=>acc + item.cantidad,0)
 setTotalQuantity1(totel)

},[carrito])


 

  return (
    <>
      <Navbar />
      <div className="bg-teal-50  flex flex-col justify-center items-center w-full h-[100%] w-full">
        <div className="text-center font-bold text-2xl flex  justify-center gap-20 mb-10 max-sm:justify-start items-center max-sm:gap-16 max-sm:mx-4">
          <Link to="/">
            <IoMdArrowRoundBack size={38} />
          </Link>
          <h1 className="text-2xl font-semibold ">Shopping Cart</h1>

        </div>


      <div className="bg-teal-50 h-[100%]">
<div className="container mx-auto px-4">
  
<div className="text-center mb-10 mt-10 text-2xl font-bold">
            Productos: {totalQuantity1}
          </div>
    <div className="flex flex-col md:flex-row gap-4  ">
        <div className="md:w-[900px]  max-sm:flex max-sm:flex-col ">
            <div className="bg-teal-100 rounded-lg shadow-md max-sm:p-1 mb-4 p-4 max-sm:w-[102%]  ">
                <table className="w-[100%]  ">
                    <thead className="  ">
                        <tr className=" ">
                            <th className=" font-semibold">Product</th>
                            <th className=" font-semibold">Precio</th>
                            <th className=" font-semibold ">Cantidad</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                    {carrito &&
                  carrito.map((product) => (
                        <tr key={product.id}>
                            <td className="py-2  max-sm:flex max-sm:flex-col  ">
                                <div className="flex items-center  max-sm:flex max-sm:flex-col ">
                                    <img className="h-24 w-24 mr-4" src={product.data.imagen} alt="Product image"/>
                                    <span className="font-semibold max-sm:text-center">{product.data.name}</span>
                                </div>
                            </td>
                            <td className="py-4 max-sm:px-2">${product.data.precio}.000</td>
                            <td className="py-4">

                              <div className="md:hidden flex flex-col mx-4 justify-center items-center">
                                <button className="cursor-pointer hover:text-cyan-300"  onClick={() => increaseQuantity(product.id)} ><BsChevronUp size={20} /> </button>
                                <span>{product.cantidad}</span>
                                <button className="cursor-pointer hover:text-cyan-300" onClick={() => decreaseQuantity(product.id)}><BsChevronDown size={20}/></button>
                              </div>

                                <div className="flex items-center  max-sm:hidden ">
                                    <button onClick={() => decreaseQuantity(product.id)} className="border rounded-md py-2 px-4  mr-2 hover:bg-cyan-400">-</button>
                                    <span className="text-center w-8">{product.cantidad}</span>
                                    <button  onClick={() => increaseQuantity(product.id)} className="border rounded-md py-2 px-4 ml-2  hover:bg-cyan-400">+</button>
                                </div>
                            </td>
                            <td onClick={() => onDeleteProduct(product.id)} className="py-4 hover:text-red-400  cursor-pointer"><MdDelete size={38}/></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="md:w-1/4 mb-20">
            <div className="bg-teal-100 rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span> ${total}.000</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Taxes</span>
                    <span>$0.00</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>$0.00</span>
                </div>
                <hr className="my-2"/>
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold"> ${total}.000</span>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-lg mt-4 w-full"
                  onClick={emptyCart}
                >
                  Vaciar Carrito
                </button>
                <button className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-lg mt-4 w-full"> <Link to="/Checkout">Checkout </Link></button>
            </div>
        </div>
    </div>
</div>
</div>




</div>
      
    </>
  );
}



