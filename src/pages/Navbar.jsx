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
import Avatar from "../assets/img/avatar.png";
import { SearchComponent } from "../components/Search";
import Alert from "../components/Alert";

import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import { MdRemoveShoppingCart } from "react-icons/md";

// const auth = getAuth(app);

export const Navbar = () => {
  const [active, setActive] = useState(true);
  const [actived, setActived] = useState(true);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [showModalTopLeft, setShowModalTopLeft] = useState(false);
 

  const db = getFirestore(app);

  const {
    logout,
    user,
    carrito,
    setCarrito,
    totalQuantity1,
    total,
    alertMessages,
    alertType,
    showAlerta,
    handleShowAlert,
  } = useAuth();

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

  const emptyCart = async () => {
    // Obtener datos del usuario
    const userRef = doc(db, "usuarios", user.uid);
    await updateDoc(userRef, {
      Carrito: [],
    });
    setCarrito([]);
    handleShowAlert(" ¡cesta vaciada exitosamente!", "error");
    return emptyCart, carrito;
  };

  const onDeleteProduct = async (productId) => {
    // Obtener datos del usuario
    const userRef = doc(db, "usuarios", user.uid);
    await updateDoc(userRef, {
      Carrito: carrito.filter((product) => product.id !== productId),
    });
    setCarrito(carrito.filter((product) => product.id !== productId));
    handleShowAlert("Producto eliminado de la cesta exitosamente!", "error");
    return onDeleteProduct, carrito;
  };

  return (
    <>
      {showAlerta && <Alert message={alertMessages} type={alertType} />}
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
              <div>
                {/* <!--Top left modal--> */}
                <TEModal show={showModalTopLeft} setShow={setShowModalTopLeft}>
                  <TEModalDialog
                    position="top-left"
                    theme={{
                      show: "translate-x-0 opacity-100",
                      hidden: "translate-x-[-100%] opacity-0",
                    }}
                    className=" ms-[-25px] mr-4"
                  >
                    <TEModalContent className="w-[400px] h-[150vh]">
                      <TEModalHeader>
                        {/* <!--Modal title--> */}
                        <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">Menu</h5>
                        {/* <!--Close button--> */}
                        <button
                          type="button"
                          className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                          onClick={() => setShowModalTopLeft(false)}
                          aria-label="Close"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-8 w-8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </TEModalHeader>
                      {/* <!--Modal body--> */}
                      <TEModalBody>
                        <Link
                          to="/"
                          className="mb-2  bg-red-400 flex justify-start text-sm items-center text-white h-20 rounded-lg p-4"
                        >
                          <div className="flex items-center gap-1">
                            <LuBadgePercent size={28} />{" "}
                            <p className="text-[22px]">Outlet</p>
                          </div>
                        </Link>
                        <Link
                          to="/Novedades"
                          className=" bg-purple-300 p-4 mb-2 rounded-lg  flex justify-start text-sm items-center h-20 "
                        >
                          <div className="flex items-center gap-1">
                            <ImGift size={28} />

                            <p className="text-[20px]">Novedades</p>
                          </div>
                        </Link>
                        <Link to="/Viajes" className=" bg-lime-300 p-4 mb-2 rounded-lg  flex justify-start text-sm items-center h-20">
                          <BsLightningCharge size={28} />

                          <p  className="text-[20px]">Viaje</p>
                        </Link>

                        <Link to="/Favoritos" className="  bg-teal-200 p-4 mb-2 rounded-lg  flex justify-start text-sm items-center h-20">
                          <TiStarOutline size={30} />
                          <p  className="text-[20px]">favoritos</p>
                        </Link>

                        <Link  to="/Accesorios" className="p-4 mb-2 rounded-lg  flex justify-start text-sm items-center h-20 bg-purple-100 ">
                          <p
                            className="text-[20px] "
                           
                          >
                            Moda Y Accesorios
                          </p>
                        </Link>

                        <Link  to="/Hogar" className="p-4 mb-2 rounded-lg  flex justify-start text-sm items-center h-20 bg-purple-100 ">
                          <p
                            className="text-[20px] "
                           
                          >
                             Hogar
                          </p>
                        </Link>
                        <Link  to="/Deporte" className="p-4 mb-2 rounded-lg  flex justify-start text-sm items-center h-20 bg-purple-100 ">
                          <p
                            className="text-[20px] "
                           
                          >
                            Deporte
                          </p>
                        </Link>
                        <Link  to="/Electronica" className="p-4 mb-2 rounded-lg  flex justify-start text-sm items-center h-20 bg-purple-100 ">
                          <p
                            className="text-[20px] "
                           
                          >
                            Electronica
                          </p>
                        </Link>
                        <Link  to="/Tazas" className="p-4 mb-2 rounded-lg  flex justify-start text-sm items-center h-20 bg-purple-100 ">
                          <p
                            className="text-[20px] "
                           
                          >
                            Tazas
                          </p>
                        </Link>
                        <Link  to="/Todos" className="p-4 mb-2 rounded-lg  flex justify-start text-sm items-center h-20 bg-purple-100 ">
                          <p
                            className="text-[20px] "
                           
                          >
                           Ver todos
                          </p>
                        </Link>

                      </TEModalBody>
                    </TEModalContent>
                  </TEModalDialog>
                </TEModal>
              </div>

              <div className="md:hidden">
                <button onClick={() => setShowModalTopLeft(true)}>
                  {" "}
                  <IoMdMenu size={38} />
                </button>
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
          <SearchComponent />

          <div className="iconos flex justify-center gap-8 w-[25%] max-sm:flex  max-sm:w-[20%] max-sm:justify-end max-sm:gap-2 max-sm:mx-4 text-[12px]">
            {user ? (
              <div className="mt-2 max-sm:mt-4 flex justify-center  gap-3 max-sm:gap-0">
                <div
                  className="mt-8 max-sm:mt-0 max-sm:me-4 cursor-pointer"
                  onClick={() => setActived(!actived)}
                >
                  <div className="flex justify-center rounded-full w-16">
                    <img
                      className="rounded-full w-12 max-sm:w-12  "
                      src={user.photoURL || Avatar}
                      alt=""
                    />
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
                <Link className="text-black text-decoration-none flex justify-center items-center flex-col  " to="/Login">
                  {" "}
                  <IoPersonCircle size={48} />
                  <p className="max-sm:hidden">Iniciar sesion</p>{" "}
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
              

                {carrito && carrito.length > 0 ? (
                  <>
                    <div>
                  <h4 className="flex justify-between mx-10 text-center mt-4 mb-3">
                    <span className="text-primary text-xl  mt-2">
                      Productos: <span className="badge bg-primary rounded-pill text-lg">
                      {totalQuantity1}
                    </span>
                    </span>
                   
                    <button
                        onClick={emptyCart}
                        className=" "
                      >
                        <MdRemoveShoppingCart onClick={() => setActive(!active)} size={30} className="hover:text-cyan-500" />
                      </button>
                  </h4>
                  <div className="mx-2 mb-2 max-sm:mx-4">
                    <li className="flex justify-between w-[380px] items-center border text-lg max-sm:w-[290px] max-sm:flex max-sm:justify-center">
                      <span className="mx-4">Total (COP)</span>
                      <strong className="mx-4">${total}.000</strong>
                    </li>
                  </div>
                </div>
                <br />
                    <div className="row-product w-[50%]   ">
                      {carrito &&
                        carrito.map((producto) => (
                          <>
                            <div
                              className="border w-[380px] mb-2 flex max-sm:w-[290px] justify-center mx-2 mr-6 "
                              key={producto.id}
                            >
                              <div className="info-cart-produc w-[100%] flex justify-center items-center col-12 ">
                                <span className=" col-1 ms-4 text-lg ">
                                  {producto.cantidad}
                                </span>
                                <span className="col-6 text-lg mx-2">
                                  {producto.data.name || producto.name}
                                </span>

                                <span className="text-lg">
                                  ${producto.data.precio || producto.precio}.000
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
                    <div className="flex flex-col justify-center items-center gap-2 mx-4 mb-4">
                     

                      <button    className="bg-blue-500 hover:bg-blue-300 text-white py-3 px-4 rounded-lg mt-2 w-full">
                        <Link className="text-lg" to="/Carrito"  onClick={() => setActive(!active)} > Ver Carrito</Link>
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
