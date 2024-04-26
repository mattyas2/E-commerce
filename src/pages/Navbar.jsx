/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { GiShoppingCart } from "react-icons/gi";
import { IoPersonCircle } from "react-icons/io5";
import { VscSearch } from "react-icons/vsc";
import Carousel from "nuka-carousel";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { app, auth } from "../assets/config/firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import {
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { GrLogout } from "react-icons/gr";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { TiStarOutline } from "react-icons/ti";
import { ImGift } from "react-icons/im";
import { BsLightningCharge } from "react-icons/bs";
import { LuBadgePercent } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import Avatar from '../assets/img/avatar.png'
import { SearchComponent } from "../components/Search";

// const auth = getAuth(app);

export const Navbar = () => {
  const [input, setInput] = useState("");
  const [active, setActive] = useState(true);
  const [actived, setActived] = useState(true);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [total, setTotal] = useState(0);
  const [totalQuantity1, setTotalQuantity1] = useState(0);
  const db = getFirestore(app);

  const { logout, user, carrito, setCarrito,increaseQuantity ,decreaseQuantity,totalQuantity } = useAuth();

 

  const toggleMenu = () => {
    setMostrarMenu(!mostrarMenu);
  };

  // const auth = getAuth();

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
  useEffect(() => {
    let total = 0;
    carrito.forEach((producto) => {
      total += parseFloat(producto.data.precio) * producto.cantidad
    });
    setTotal(total);
  }, [carrito]);

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

  useEffect(()=>{
    const totel = carrito.reduce((acc,item)=>acc + item.cantidad,0)
   setTotalQuantity1(totel)
  
  },[carrito])
  return (
    <>
      <Carousel wrapAround withoutControls slidesToShow={1} autoplay>
        <div className="bg-teal-200 w-full text-center text-sm">
          Imprescindibles para tus vacaciones
        </div>
        <div className="bg-teal-200 w-full text-sm text-center">
          ¡Envíos gratis en pedidos superiores a $100.000!
        </div>
      </Carousel>

      <nav className="mt-[-20px] bg-cover bg-[url(https://th.bing.com/th/id/R.284b2edc83453b61c140a43ed4a70f03?rik=Fiu15H6h5z%2bRjw&riu=http%3a%2f%2fwww.openailab.com%2fuploads%2fimg%2f20200814%2f5f36395bebc4e.jpg&ehk=gFvyMGkOMdwj0aQ1KCxWxDd9TBXGtxRSNbqFIiROVWQ%3d&risl=&pid=ImgRaw&r=0)]  ">
        <div className="max-sm:flex max-sm:w-full max-sm:justify-between max-sm:gap-2 max-sm:h-[60px] max-sm:mx-2   md:flex md:justify-around border-y-2 h-[110px] md:w-full">
          <div className="logo flex ">
            <div className="max-sm:mt-0 max-sm:mb-2 max-sm: mt-10">
              <div className="md:hidden">
                <button onClick={toggleMenu}>
                  {" "}
                  <IoMdMenu size={38} />
                </button>
                {mostrarMenu && (
                  <ul className="bg-cyan-700 justify-start items-center mt-[-10px] h-[700px] absolute w-[80%] text-sm flex flex-col gap-2 z-50 ">
                    <div className="mx-4 text-2xl mt-2 mb-2 flex items-start gap-10">
                      <div className="mr-32" onClick={toggleMenu}>
                        <IoMdArrowRoundBack size={38} />
                      </div>{" "}
                      Menu
                    </div>
                    <li className="py-2  bg-red-400 justify-center rounded-lg max-sm:flex w-52 text-2xl items-center">
                      <LuBadgePercent size={28} /> <Link to="/">Outlet</Link>
                    </li>
                    <li className="py-2 bg-purple-300 p-2 rounded-lg max-sm:flex justify-center w-52 text-2xl items-center">
                      <ImGift size={28} />

                      <Link to="/Novedades">Novedades</Link>
                    </li>
                    <li className="py-2  bg-lime-300 p-2 rounded-lg max-sm:flex justify-center w-52 text-2xl items-center">
                      <BsLightningCharge size={28} />

                      <Link to="/Viajes">Viaje</Link>
                    </li>

                    <li className=" py-2 bg-teal-200 p-2 rounded-2xl flex justify-center items-center max-sm:flex w-52 text-2xl">
                      <TiStarOutline size={30} />
                      <Link to="/Favoritos">favoritos</Link>
                    </li>
                    <div className="border p-2 w-[250px] text-2xl flex justify-center hover:bg-sky-400 bg-purple-50 ">
                      <Link
                        className=" text-decoration-none text-black"
                        to="/Accesorios"
                      >
                        Moda Y Accesorios
                      </Link>
                    </div>
                    <div className="border p-2 w-[190px] text-2xl flex justify-center  hover:bg-sky-400  bg-purple-50 ">
                      <Link
                        className=" text-decoration-none text-black"
                        to="/Hogar"
                      >
                        Hogar
                      </Link>
                    </div>
                    <div className="border p-2 w-[190px] text-2xl flex justify-center  hover:bg-sky-400  bg-purple-50 ">
                      <Link
                        className=" text-decoration-none text-black"
                        to="/Deporte"
                      >
                        Deporte
                      </Link>
                    </div>
                    <div className="border p-2 w-[190px] text-2xl flex justify-center  hover:bg-sky-400  bg-purple-50 ">
                      <Link
                        className=" text-decoration-none text-black"
                        to="/Electronica"
                      >
                        Electronica
                      </Link>
                    </div>

                    <div className="border p-2 w-[190px] text-2xl  flex justify-center  hover:bg-sky-400  bg-purple-50 ">
                      <Link
                        className=" text-decoration-none text-black"
                        to="/Ropa"
                      >
                        Tazas
                      </Link>
                    </div>
                    <h4 className="border p-2 w-[190px] text-2xl flex justify-center  hover:bg-sky-400  bg-purple-50 ">
                      <Link to="/Todos">Ver todos</Link>
                    </h4>
                  </ul>
                )}
              </div>
            </div>
            <Link to="/">
              {" "}
              <img
                src="https://github.com/mattyas2/E-commerce/blob/main/src/assets/logotipo.jpeg?raw=true"
                className="w-[120px] max-sm:w-[70px] "
              />
            </Link>
          </div>
          <SearchComponent/>

          <div className="iconos flex justify-center gap-8 w-[25%] max-sm:flex  max-sm:w-[20%] max-sm:justify-end max-sm:gap-2 max-sm:mx-4 text-[12px]">
            {user ? (
              <div className="mt-2 max-sm:mt-4 flex justify-center  gap-3 max-sm:gap-0">
                <div
                  className="mt-8 max-sm:mt-0 max-sm:me-4 cursor-pointer"
                  onClick={() => setActived(!actived)}
                >
                  <div className="flex justify-center rounded-full w-16">
                    <img className="rounded-full w-12 max-sm:w-12 " src={  user.photoURL || Avatar } alt="" />
                    </div>
                </div>
                <div
                  className={!actived ? " " : "hidden-cart"}
                  id="container-cart-products3"
                >
                  <div className="flex flex-col justify-center items-center">
                    <Link to="/Profile">
                    <div className="text-sm mb-1 hover:text-slate-400">
                      Visita tu perfil
                    </div>
                    </Link>
                

                    <h5 className=" mb-2 border w-40 p-2 text-primary text-center">
                      {user.displayName || user.email}
                    </h5>
                    <button
                      onClick={() => {
                        logout();
                        window.location.reload();
                      }}
                      className="text-black text-decoration-none mt-0 border text-center p-2 bg-green-300 rounded-lg hover:bg-green-500"
                    >
                      {" "}
                      <h1 className="flex gap-2 max-sm:flex justify-center items-center max-sm:mx-0">
                        {" "}
                        Cerrar Sesion <GrLogout size={20} />{" "}
                      </h1>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center mt-3 items-end max-sm:flex max-sm:justify-center max-sm:items-center cursor-pointer max-sm:mx-7 max-sm:mb-2 ">
                <Link className="text-black text-decoration-none " to="/Login">
                  {" "}
                  <IoPersonCircle size={48} />{" "}
                </Link>
              </div>
            )}
            <div className=" mt-7 max-sm:mt-[1px] max-sm:ms-[-20px] ">
              <div
                className="text-decoration-none text-black pointer-event mt-2 max-sm:mt-[-20px] cursor-pointer"
                onClick={() => setActive(!active)}
              >
                <GiShoppingCart size={48} />
              </div>

              <div className="count-products max-sm:ms-[24px] max-sm:mt-[-35px]  max-sm:w-6  max-sm:h-6">
                <span className=" " id="contador-productos">
                  {totalQuantity1}
                </span>
              </div>
              <div
                className={!active ? " " : "hidden-cart"}
                id="container-cart-products"
              >
                <div>
                  <h4 className="flex justify-content-center gap-6 text-center mt-4 mb-3">
                    <span className="text-primary text-2xl mt-2">
                      Productos:
                    </span>
                    <span className="badge bg-primary rounded-pill text-xl">
                      {totalQuantity1}
                    </span>
                  </h4>
                  <div className="mx-2 mb-2 max-sm:mx-4">
                    <li className="flex justify-between w-[380px] items-center border text-lg max-sm:w-[290px] max-sm:flex max-sm:justify-center">
                      <span className="mx-4">Total (COP)</span>
                      <strong className="mx-4">${total}.000</strong>
                    </li>
                  </div>
                </div>
                <br />

                {carrito && carrito.length > 0 ? (
                  <>
                    <div className="row-product w-[50%]  ">
                      {carrito &&
                        carrito.map((producto) => (
                          <>
                            <div
                              className="border w-[380px] mb-2 flex max-sm:w-[290px] justify-center mx-2 mr-6 "
                              key={producto.id}
                            >
                              <div className="info-cart-produc w-[100%] flex justify-center items-center col-12 ">
                                <span className=" col-1 ">
                                  {producto.cantidad}
                                </span>
                                <span className="col-6 text-lg mx-2">
                                  {producto.data.name || producto.name}
                                </span>

                                <span className="text-lg">
                                  ${producto.data.precio || producto.precio }.000
                                </span>
                                <button></button>
                              </div>
                              <div className="">
                                <button
                                  className="mr-8 "
                                  onClick={() => onDeleteProduct(producto.id)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className=" mt-2 w-8 mr-0 hover:stroke-red-500 cursor-pointer"
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
                      <h3>Total:</h3>
                      <span className="total-pagar">${total}.000</span>
                    </div>
                    <div className="flex  justify-center items-center gap-2 mx-4 mb-4">
                      <button
                        onClick={emptyCart}
                        className="btn-clear-all rounded-2xl mb-2"
                      >
                        Vaciar Carrito
                      </button>

                      <button className="btn-clear-all rounded-2xl  mb-2 ">
                      <Link to="/Carrito"> Ver Carrito</Link>
                    </button>
                    </div>
                  
                  </>
                ) : (
                  <div className=" flex justify-between p-4 items-center  bg-purple-50 rounded-lg">
                    <p className="text-2xl">Tu cesta está vacía</p>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="icon-close"
                        onClick={() => setActive(!active)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="w-full  bg-teal-50 p-3 ">
        <div className=" max-sm:w-[375px] flex justify-between  mx-7 max-sm:hidden">
          <div className="flex justify-start gap-4 mx-10 max-sm:flex max-sm:w-[375px] max-sm:flex-wrap ">
            <div className="flex justify-center items-center gap-1  bg-red-400 p-2 rounded-lg max-sm:flex">
              <LuBadgePercent size={28} />{" "}
              <Link onClick={() => window.location.reload()}>Outlet</Link>
            </div>
            <div className="flex justify-center items-center gap-1  bg-purple-300 p-2 rounded-lg">
              <ImGift size={28} />

              <Link to="/Novedades">Novedades</Link>

              <div></div>
            </div>
            <div className="flex justify-center items-center gap-1  bg-lime-300 p-2 rounded-lg">
              <BsLightningCharge size={28} />

              <Link to="/Viajes">Viaje</Link>
            </div>
          </div>

          <button className=" bg-teal-200 p-2 rounded-2xl flex justify-center items-center">
            <TiStarOutline size={30} />
            <Link to="/Favoritos">favoritos</Link>
          </button>
        </div>
      </div>
    </>
  );
};
