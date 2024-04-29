/* eslint-disable react-hooks/exhaustive-deps */

import { collection, getDocs, getFirestore, query, where, } from "firebase/firestore";
import { app } from "../assets/config/firebase";
import { Tilt } from "react-tilt";
import { Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { IoMdArrowRoundBack, IoMdHeartEmpty } from "react-icons/io";
import { useEffect, useState } from "react";
import { Navbar } from "../pages/Navbar";
import { useAuth } from "../auth/AuthProvider";
import { FcLike } from "react-icons/fc";

import estrella from "../assets/img/estrella.png";
import reloj from "../assets/img/reloj.png";
import vector from "../assets/img/vect.png";
import flecha from "../assets/img/flecha.png";
import color from "../assets/img/colors.png";

import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

import { Breadcrumbs } from "./RutasActual";

export const Novedades = ()=>{
    const [loaded, setLoaded] = useState(false);
  
    
    const {
      productos, setProductos,
      coleccion,setColeccion,onAddProduct,favorites,onDeleteFavort,addToFavorites, user,alertMessages, alertType, showAlerta, 
    } = useAuth();
  useEffect(() => {

    const coleccions = async ()=>{
        
        
        const db = getFirestore(app)
        
            const citiesRef = collection(db, "productos");
            const querySnapshot = await getDocs( query(citiesRef, where("category", "==", "novedades")))  
            const newImpresion = [];
            querySnapshot.forEach((doc)=>{
             newImpresion.push({ id: doc.id, data: doc.data() });
             console.log(newImpresion)
            })
            setProductos(newImpresion);
          setLoaded(true);
              

    }
    coleccions();
}, []);


useEffect(() => {

  const coleccionss = async ()=>{
      const db = getFirestore(app)
          const citiesRef = collection(db, "Coleccion");
          const querySnapshot = await getDocs( query(citiesRef, where("category", "==", "novedades")));
          const newImpresion = [];
          querySnapshot.forEach((doc)=>{
           newImpresion.push({ id: doc.id, data: doc.data() });
           console.log(newImpresion)
          })
          setColeccion(newImpresion);
        setLoaded(true);
            

  }
  coleccionss();
}, []);
      
   
const navigate = useNavigate(); // Usa useNavigate para la navegación
const [showAlert, setShowAlert] = useState(false); // Estado para mostrar la alerta
const [alertMessage, setAlertMessage] = useState(""); // Mensaje de la alerta

const mostrarAlerta = (message) => {
  setAlertMessage(message);
  setShowAlert(true);

  // Ocultar la alerta después de 5 segundos (5000 milisegundos)
  setTimeout(() => {
    setShowAlert(false);
    // Navegar a la página de inicio de sesión después de ocultar la alerta
    navigate('/Login');
  }, 3000);
};

const agregarAlCarrito = () => {
  if (!user) {
    mostrarAlerta("Debes iniciar sesión o registrarte para agregar productos ala cesta.");
  } else {
    // Lógica para agregar al carrito
  }
};

const agregarAFavoritos = () => {
  if (!user) {
    mostrarAlerta("Debes iniciar sesión o registrarte para agregar productos a tu lista de deseos.");
  } else {
    // Lógica para agregar a favoritos
  }
};     





return(

    <>
    <Navbar/>
    { showAlerta && (
        <Alert message={alertMessages}  type={alertType}/>
      )}
    {showAlert && <Alert message={alertMessage} />}

    <Breadcrumbs/>
<div className=" bg-teal-50 h-[100%] "> 
<div className="text-center font-bold text-2xl flex justify-center gap-20 mb-10 max-sm:justify-start  items-center max-sm:gap-16 max-sm:mx-4">
<Link to="/">
<IoMdArrowRoundBack size={38} /> 
</Link>


      Novedades
    </div>
    <div className="flex w-[100%] gap-10 flex-col max-sm:mt-10 ">
      <div className="flex flex-wrap max-sm:flex max-sm:justify-center max-sm:flex-wrap max-sm:w-[100%]">
      {loaded &&
           productos.length > 0 &&
           productos.map((producto) => (
            <div className="relative  mx-4 mt-2 rounded-xl shadow-2xl w-[320px] flex flex-col justify-center  bg-purple-50 mb-9 h-[500px]"  key={producto.id}>
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

              {user ? (
                      <div className="flex items-center justify-center gap-3 border-sky-500 border rounded-full w-[150px] mt-3 p-2 mb-6 mx-16 ">
                        <p className="text-cyan-500 font-bold flex gap-7 ">
                          <Link>
                            {" "}
                            {favorites.find(
                              (item) => item.id === producto.id
                            ) ? (
                              <FcLike
                                FaBeer
                                size={36}
                                onClick={() => onDeleteFavort(producto.id)}
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
                    ) : (
                      <div className="flex items-center justify-center gap-3 border-sky-500 border rounded-full w-[150px] mt-3 p-2 mx-16 ">
                        <p className="text-cyan-500 font-bold flex gap-7 ">
                          <Link>
                            {" "}
                            {favorites.find(
                              (item) => item.id === producto.id
                            ) ? (
                              <FcLike
                                FaBeer
                                size={36}
                                onClick={agregarAFavoritos }
                             
                              />
                            ) : (
                              <IoMdHeartEmpty
                                FaBeer
                                size={36}
                                onClick={agregarAFavoritos }
                              />
                            )}
                          </Link>{" "}
                          <Link>
                            {" "}
                            <span
                            onClick={agregarAlCarrito }
                            >
                              <GiShoppingCart FaBeer size={36} className="" />
                            </span>
                          </Link>{" "}
                        </p>
                        <img src={flecha} alt="" />
                      </div>
                    )}



            </div>
          </div>
          ))}
      </div>
  
<div className="w-[100%] flex max-sm:flex max-sm:justify-center max-sm:flex-wrap max-sm:w-[100%] ">

{loaded &&
          coleccion.length > 0 &&
           coleccion.map((producto) => (
            <div key={producto.id} className="relative  mx-4 mt-2 mb-6 rounded-xl shadow-2xl w-[320px] flex flex-col justify-center  bg-purple-50  h-[535px]">

                 
            <Tilt>
              <div className="bg-red-500 w-fit px-2 text-white font-bold rounded-sm absolute top-3 left-6">
                <p>sale</p>
              </div>
              <Link to={`/ColeccionPage/${producto.id}`}>
                <img
                  className="w-full h-[290px]"
                  src={producto.data.imagen}
                  alt=""
                />
              </Link>
            </Tilt>
            <div>
              <div className="col-10 flex items-center mt-3 justify-between  me-3 mx-6">
                <h6 className="text-cyan-500  font-bold">
                  {producto.data.name}
                </h6>
                <div className="col-1 bg-slate-900 text-white flex items-center gap-2 w-14">
                  <img className="w-5 h-5" src={estrella} alt="" />
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

              {user ? (
                      <div className="flex items-center justify-center gap-3 border-sky-500 border rounded-full w-[150px] mt-3 p-2 mb-6 mx-16 ">
                        <p className="text-cyan-500 font-bold flex gap-7 ">
                          <Link>
                            {" "}
                            {favorites.find(
                              (item) => item.id === producto.id
                            ) ? (
                              <FcLike
                                FaBeer
                                size={36}
                                onClick={() => onDeleteFavort(producto.id)}
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
                    ) : (
                      <div className="flex items-center justify-center gap-3 border-sky-500 border rounded-full w-[150px] mt-3 p-2 mx-16 ">
                        <p className="text-cyan-500 font-bold flex gap-7 ">
                          <Link>
                            {" "}
                            {favorites.find(
                              (item) => item.id === producto.id
                            ) ? (
                              <FcLike
                                FaBeer
                                size={36}
                                onClick={agregarAFavoritos }
                             
                              />
                            ) : (
                              <IoMdHeartEmpty
                                FaBeer
                                size={36}
                                onClick={agregarAFavoritos }
                              />
                            )}
                          </Link>{" "}
                          <Link>
                            {" "}
                            <span
                            onClick={agregarAlCarrito }
                            >
                              <GiShoppingCart FaBeer size={36} className="" />
                            </span>
                          </Link>{" "}
                        </p>
                        <img src={flecha} alt="" />
                      </div>
                    )}
           



            </div>
            </div>
          ))}
</div>
<div className="h-36">

</div>
    </div></div>
  
           
    </>
)


}
