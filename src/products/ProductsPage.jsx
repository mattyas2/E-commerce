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


const { uidUsuario }=useAuth()
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
  const [cantidad, setCantidad] = useState(1);

  const incrementarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
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
        <div className="flex justify-center mt-10 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center ">
          <div className="col-7 max-sm:w-[70%] max-sm:flex max-sm:flex-wrap mt-20 flex flex-wrap gap-4 mb-10">
          <img className="w-[370px] max-sm:w-[280px] max-sm:h-[250px] h-[380px]" src={producto.imagen2} alt="" />
          <img className="w-[370px] max-sm:w-[280px] max-sm:h-[250px] h-[380px]" src={producto.imagen} alt="" />
          <img className="w-[370px] max-sm:w-[280px] max-sm:h-[250px] h-[380px]" src={producto.imagen3} alt="" />
          <img className="w-[370px] max-sm:w-[280px] max-sm:h-[250px] h-[380px]" src={producto.imagen4} alt="" />
          </div>
          <div className="col-4 max-sm:w-[80%]">
            <div>
            <h2 className="mt-20 text-3xl font-bold max-sm:mt-0">{producto.name}</h2>
          <p className="text-3xl font-bold mt-2"> ${producto.precio}.000.COP</p>
            </div>
         <div className="flex mt-4 justify-start gap-6 ">
          <div className="flex p-3 border w-50 justify-around items-center  text-2xl rounded-md">
          <button onClick={disminuirCantidad}>-</button>
          <p>{cantidad}</p>
          <button  onClick={incrementarCantidad}>+</button>
          </div>
         
          <button  className="p-3 border w-50 text-md text-white bg-cyan-400 rounded-md hover:bg-cyan-500 font-bold">AÑADIR</button>
         </div>
          <div>
            <p className="mt-4">Descripcion</p>
         <p className="mt-4">{producto.descripcion}</p>
         <p className="mt-4">{producto.descripcion2}</p>
         </div>
          </div>
        
          {/* Mostrar otros detalles del producto */}
        </div>
      )}
    </div>
    </div>
    </>
  );
};
{/* <div> 


   
<div className="flex flex-col">


    <div className=" border w-[27%] mt-16 mx-16 text-2xl flex justify-center  flex-col">
      <div>
        {" "}
        <p className="flex justify-between ">
          Precio  <span>  {showModal ? ( <FaAngleDown onClick={toggleModal} />
            ) : ( <FaAngleUp onClick={toggleModal} /> )}
          </span>{" "}
        </p>
        <div
          className={showModal ? " " : "hidden-cart "}
          id="container-cart-products1"
        >
          <div className=" flex justify-between p-4 items-center ">
            <p className="text-2xl mt-14">
              <input className="w-[300px]" type="range" />
            </p>
          </div>
        </div>



      </div>
    </div>




</div>

<div className="w-[100] flex flex-col gap-10 mt-56">
    <div className=" border w-[27%]  mx-16 text-2xl flex justify-center  flex-col">
      <div>
        {" "}
        <p className="flex justify-between items-center">
          Category
          <span>
            {showModal1e ? (
             <FaAngleUp onClick={toggleModale}  />
            ) : (
              <FaAngleDown onClick={toggleModale}   />
            )}
          </span>{" "}
        </p>
        <div
          className={showModal1e ? " " : "hidden-cart "}
          id="container-cart-products12"
        >
          <div className=" flex justify-between p-4 items-center ">
            <p className="text-2xl">
              <div></div>
            </p>
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>



<div>



</div>

</div> */}