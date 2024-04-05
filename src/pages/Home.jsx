/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import "firebase/firestore";
import react, { createContext, useRef } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { IoPersonCircle } from "react-icons/io5";
import { VscSearch } from "react-icons/vsc";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";
import { LiaAngleRightSolid } from "react-icons/lia";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { TiStarOutline } from "react-icons/ti";
import { ImGift } from "react-icons/im";
import { BsLightningCharge } from "react-icons/bs";
import { FcLike } from "react-icons/fc";

import { LuBadgePercent } from "react-icons/lu";
import { useEffect, useState } from "react";
import { app } from "../assets/config/firebase";
import { addDoc, deleteDoc, getDoc, getFirestore } from "firebase/firestore";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import Modal from "react-modal";
import { Modall } from "react-modal";
import { Tilt } from "@jdion/tilt-react";
import { IoAddCircle } from "react-icons/io5";
import { Navbar } from "./Navbar";
import { useAuth } from "../auth/AuthProvider";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
  },
};

export const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});
  const [iconoSeleccionado, setIconoSeleccionado] = useState(null);
  const db = getFirestore(app);
  const [modalIsOpen, setIsOpen] = useState(false);
  const carouselRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [Suscríbete, setSuscribete] = useState("");
  let subtitle;
  const {
    productos,
    setProductos,
    total,
    setTotal,
    countProducts,
    setCountProducts,
    coleccion,
    setColeccion,
    newProducto,
    setNewProducto,
    setNewColeccion,
    newColeccion,
    favorito,
    setFavorito,
    isLiked,
    setIsLiked,
    carrito,
    setCarrito,
  } = useAuth();

  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const newImpresion = [];
      querySnapshot.forEach((doc) => {
        newImpresion.push({ id: doc.id, data: doc.data() });
      });

      setProductos(newImpresion);
      setLoaded(true);
    };

    obtenerProductos();
  }, [db]);

  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(collection(db, "Coleccion"));
      const newImpresion = [];
      querySnapshot.forEach((doc) => {
        newImpresion.push({ id: doc.id, data: doc.data() });
      });

      setColeccion(newImpresion);
      setLoaded(true);
    };

    obtenerProductos();
  }, [db]);

  const enviarDatos = async (e) => {
    e.preventDefault();
    await setDoc(
      doc(db, "productos", String(Math.floor(Math.random() * 1000))),
      data
    );
  };

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

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
  const cambiarColor = (icono) => {
    if (iconoSeleccionado === icono) {
      setIconoSeleccionado(false);
    } else {
      setIconoSeleccionado(icono);
    }
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
    setTotal(total + product.data.precio);
    setCountProducts(countProducts + 1);
  };

  const addToFavorites = async (product) => {
    const personajeExistente = favorito.find((item) => item.id === product.id);
    if (personajeExistente) {
      const favoritosActualizados = favorito.filter(
        (item) => item.id !== product.id
      );
      setFavorito(favoritosActualizados);
    } else {
      setFavorito([...favorito, product]);
    }
  };

  const handlePrevious = () => {
    carouselRef.current.previousSlide();
    setSlideIndex(carouselRef.current.state.currentSlide);
  };

  const handleNext = () => {
    carouselRef.current.nextSlide();
    setSlideIndex(carouselRef.current.state.currentSlide);
  };

  const Suscripcion = (e) => {
    setSuscribete(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el envío de la suscripción
    console.log("Email de suscripción:", Suscríbete);
    setSuscribete("");
    // Puedes enviar los datos a un servidor, guardarlos en el almacenamiento local, etc.
    // También puedes mostrar un mensaje de éxito o error según sea necesario
  };

  return (
    <>
      <div className="bg-teal-50  ">
        <Navbar />

        <div className="max-sm:flex max-sm:w-[375px] flex justify-between mt-2 mb-3 mx-7 max-sm:hidden">
          <div className="flex justify-start gap-4 mx-10 max-sm:flex max-sm:w-[375px] max-sm:flex-wrap ">
            <div className="flex justify-center items-center gap-1  bg-red-400 p-2 rounded-lg max-sm:flex">
              <LuBadgePercent size={28} /> <Link to="/">Outlet</Link>
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

        <div className="carrusel">
          <Carousel
            slidesToShow={1}
            renderTopLeftControls
            swiping
            wrapAround
            autoplay={true}
            withoutControls
            pauseOnHover
          >
            <div>
              <img
                src="https://github.com/mattyas2/E-commerce/blob/main/src/assets/BBanner_B2C_ES-_Banner_Home_1921x574.jpg?raw=true"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://github.com/mattyas2/E-commerce/blob/main/src/assets/Vviajes-ES-_Banner_Home_-_1921x534_.jpg?raw=true"
                alt=""
              />
            </div>
          </Carousel>
        </div>

        <div className="VENTAS flex justify-start mt-16 mx-3  max-sm:text-center ">
          <h1 className="font-bold text-3xl max-sm:text-xl">
            PRODUCTOS RECIEN SALIDOS DEL HORNO{" "}
          </h1>
        </div>

        <div className="flex justify-between mx-4 mt-5  max-sm:hidden">
          <div className="LINKDEVENTAS flex gap-4 max-sm:flex-wrap ">
            <div className="border p-2 w-[200px] flex justify-center hover:bg-sky-400 bg-purple-50 ">
              <Link
                className=" text-decoration-none text-black"
                to="/Accesorios"
              >
                Moda Y Accesorios
              </Link>
            </div>
            <div className="border p-2 w-[90px] flex justify-center  hover:bg-sky-400  bg-purple-50 ">
              <Link className=" text-decoration-none text-black" to="/Hogar">
                Hogar
              </Link>
            </div>
            <div className="border p-2 w-[90px] flex justify-center  hover:bg-sky-400  bg-purple-50 ">
              <Link className=" text-decoration-none text-black" to="/Deporte">
                Deporte
              </Link>
            </div>
            <div className="border p-2 w-[100px] flex justify-center  hover:bg-sky-400  bg-purple-50 ">
              <Link
                className=" text-decoration-none text-black"
                to="/Electronica"
              >
                Electronica
              </Link>
            </div>

            <div className="border p-2 w-[90px] flex justify-center  hover:bg-sky-400  bg-purple-50 ">
              <Link className=" text-decoration-none text-black" to="/Ropa">
                Tazas
              </Link>
            </div>
          </div>

          <div className="flex gap-4 max-sm:hidden">
            <Link>
              <button className="mt-2" onClick={openModal}>
                <IoAddCircle FaBeer size={26} />
              </button>
            </Link>
            <button>
              <LiaAngleLeftSolid
                onClick={() => {
                  handlePrevious;
                }}
                size={30}
              />
            </button>
            <button>
              <LiaAngleRightSolid
                onClick={() => {
                  handleNext;
                }}
                size={30}
              />
            </button>
          </div>
        </div>

        <div className="modall">
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2
              className="text-center"
              ref={(_subtitle) => (subtitle = _subtitle)}
            >
              Insertar Producto
            </h2>

            <div className="flex flex-col justify-center items-center  mt-2">
              <form className="mt-2">
                <div>
                  <label className="flex flex-col mt-3 font-bold ">
                    Nombre:
                  </label>
                  <input
                    className="border form-control "
                    type="text"
                    placeholder="name"
                    onChange={(e) => {
                      setData({ ...data, name: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label className="flex flex-col mt-2  font-bold ">
                    Imagen:
                  </label>
                  <input
                    className="border form-control "
                    typeof="text file"
                    placeholder="Url"
                    onChange={(e) => {
                      setData({ ...data, imagen: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label className="flex flex-col mt-2  font-bold ">
                    {" "}
                    Category:
                  </label>
                  <select
                    className="border form-control "
                    name="select"
                    id="select"
                    onChange={(e) => {
                      setData({ ...data, category: e.target.value });
                    }}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="accesorios">Accesorios</option>
                    <option value="hogar">Hogar</option>
                    <option value="deporte">Deporte</option>
                    <option value="electronica">Electronica</option>
                    <option value="ropa">Ropa</option>
                    <option value="tazas">Tazas</option>
                    <option value="viaje">Viaje</option>
                    <option value="novedades">Novedades</option>
                  </select>
                </div>
                <div>
                  <label className="flex flex-col mt-2  font-bold ">
                    Precio:
                  </label>
                  <input
                    className="border form-control "
                    type="number"
                    placeholder="precio"
                    onChange={(e) => {
                      setData({ ...data, precio: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label className="flex flex-col  font-bold ">
                    descripcion:
                  </label>
                  <textarea
                    className="border form-control "
                    type="text"
                    placeholder="descripcion"
                    onChange={(e) => {
                      setData({ ...data, descripcion: e.target.value });
                    }}
                  />
                </div>
              </form>
              <div className="flex gap-8 mt-4">
                <button
                  className="bg-green-400 p-2 rounded-lg "
                  onClick={enviarDatos ? closeModal : Error}
                >
                  Guardar
                </button>
                <button
                  className="bg-red-400 p-2 rounded-lg"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </Modal>
        </div>
        <div className="md:hidden ">
          <Carousel
            cellSpacing={30}
            slidesToShow={1.5}
            dragging={true}
            renderTopLeftControls
            wrapAround
            autoplay={true}
            withoutControls
            pauseOnHover
            cellAlign="center"
          >
            {productos.map((producto) => (
              <div
                className=" flex flex-col justify-center items-center mx-[0] mt-5 mb-4 w-[100%] h-[300px] rounded-xl shadow-2xl   bg-purple-50 "
                key={producto.id}
              >
                <div className="flex justify-center items-center mb-6">
                  <Tilt
                    options={defaultOptions}
                    style={{ height: 90, width: 90 }}
                  >
                    <img
                      className="w-[200px] h-[100px]  "
                      src={producto.data.imagen}
                      alt=""
                    />
                  </Tilt>
                </div>
                <div className=" mb-4">
                  <h1 className="font-bold text-xl">{producto.data.name} </h1>
                </div>
                <div className="flex justify-between w-[100%] ">
                  <div className="mx-4 mt-4">${producto.data.precio}</div>
                  <div className="flex gap-2 mx-4 mt-4">
                    <Link>
                      {" "}
                      {favorito.find((item) => item.id === producto.id) ? (
                        <FcLike
                          FaBeer
                          size={26}
                          onClick={() => addToFavorites(producto)}
                        />
                      ) : (
                        <IoMdHeartEmpty
                          FaBeer
                          size={26}
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
                        <GiShoppingCart FaBeer size={26} className="" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="max-sm:hidden ">
          <Carousel
            slidesToShow={4}
            cellAlign="start"
            cellSpacing={0}
            dragging={true}
            renderTopLeftControls
            wrapAround
            autoplay={true}
            withoutControls
            pauseOnHover
            ref={carouselRef}
            slideIndex={slideIndex}
          >
            {productos.map((producto) => (
              <div
                className=" flex flex-col justify-center items-center mx-[10px] mt-5 mb-4 w-[90%] h-[360px] rounded-xl shadow-2xl  bg-purple-50 "
                key={producto.data.id}
              >
                <div className="flex justify-center items-center">
                  <Tilt
                    options={defaultOptions}
                    style={{ height: 200, width: 200 }}
                  >
                    <img
                      className="w-[200px] h-[200px] "
                      src={producto.data.imagen}
                      alt=""
                    />
                  </Tilt>
                </div>
                <div className=" mb-4">
                  <h1 className="font-bold text-xl">{producto.data.name} </h1>
                </div>
                <div className="flex justify-between w-[100%] ">
                  <div className="mx-4 mt-5">${producto.data.precio}</div>
                  <div className="flex gap-2 mx-4 mt-5">
                    <Link>
                      {" "}
                      {favorito.find((item) => item.id === producto.id) ? (
                        <FcLike
                          FaBeer
                          size={26}
                          onClick={() => addToFavorites(producto)}
                        />
                      ) : (
                        <IoMdHeartEmpty
                          FaBeer
                          size={26}
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
                        <GiShoppingCart FaBeer size={26} className="" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="text-center flex gap-3 max-sm:w-full max-sm:flex-wrap">
          <div>
            <img
              className="w-[600px] h-[400px]"
              src="https://www.mrwonderful.com/media/wysiwyg/2024/Marzo/Viaje/ES-destacados-viajes-600x600.jpg"
              alt=""
            />
            <h4 className="text-decoration-underline ">
              <Link to="/Viajes">ACCESORIOS DE VIAJE</Link>
            </h4>
          </div>

          <div>
            <img
              className="w-[600px] h-[400px]"
              src="https://www.mrwonderful.com/media/wysiwyg/2024/Febrero/2dasRebajas/carrousel-homecollection_slider-web-es.png"
              alt=""
            />
            <h4 className="text-decoration-underline">
              <Link to="/Novedades">NOVEDADES</Link>
            </h4>
          </div>
          <div>
            <img
              className="w-[600px] h-[400px]"
              src="https://www.mrwonderful.com/media/wysiwyg/2024/Marzo/Viaje/ES-destacados-infantil-600x600.jpg"
              alt=""
            />
            <h4 className="text-decoration-underline">
              <Link>PERSONAJES MATTYAS</Link>
            </h4>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between">
            <div className="max-sm:text-center">
              <h1 className="font-extrabold text-3xl mx-6">
                DESCUBRE LOS TOP VENTAS
              </h1>
              <h4 className="mx-6">Descubre Novedades</h4>
            </div>
            <div className="max-sm:hidden">
              <h4 className="text-decoration-underline">
                <Link to="/Todos">Ver todos</Link>
              </h4>
              <p className="flex mx-2 mt-2 gap-2">
                <button>
                  <LiaAngleLeftSolid size={30} />
                </button>
                <button>
                  <LiaAngleRightSolid size={30} />
                </button>
              </p>
            </div>
          </div>

          <div className="h-[500px] mt-10 max-sm:hidden">
            <Carousel
              slidesToShow={4}
              wrapAround
              autoplay={true}
              withoutControls
            >
              {loaded &&
                coleccion.length > 0 &&
                coleccion.map((producto) => (
                  <Tilt
                    options={defaultOptions2}
                    style={{ height: 600, width: 350 }}
                  >
                    <div
                      className=" bg-purple-50 flex flex-col justify-center items-center mx-[15px] mt-5 mb-4 w-[80%] h-[390px] rounded-xl shadow-2xl "
                      key={producto.data.id}
                    >
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
                            {favorito.find(
                              (item) => item.id === producto.id
                            ) ? (
                              <FcLike
                                size={26}
                                onClick={() => addToFavorites(producto)}
                              />
                            ) : (
                              <IoMdHeartEmpty
                                FaBeer
                                size={26}
                                onClick={() => addToFavorites(producto)}
                              />
                            )}
                          </Link>{" "}
                          <Link
                            onClick={() => {
                              onAddProduct(producto);
                            }}
                          >
                            {" "}
                            <GiShoppingCart FaBeer size={26} className="" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                ))}
            </Carousel>
          </div>
          <div className="h-[500px] mt-10 md:hidden ">
            <Carousel
              slidesToShow={1.2}
              wrapAround
              autoplay={true}
              withoutControls
              cellAlign="center"
              cellSpacing={2}
            >
              {loaded &&
                coleccion.length > 0 &&
                coleccion.map((producto) => (
                  <Tilt
                    options={defaultOptions2}
                    style={{ height: 600, width: 350 }}
                  >
                    <div
                      className=" bg-purple-50 flex flex-col justify-center items-center mx-[15px] mt-5 mb-4 w-[80%] h-[390px] rounded-xl shadow-2xl "
                      key={producto.data.id}
                    >
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
                            {favorito.find(
                              (item) => item.id === producto.id
                            ) ? (
                              <FcLike
                                size={26}
                                onClick={() => addToFavorites(producto)}
                              />
                            ) : (
                              <IoMdHeartEmpty
                                FaBeer
                                size={26}
                                onClick={() => addToFavorites(producto)}
                              />
                            )}
                          </Link>{" "}
                          <Link
                            onClick={() => {
                              onAddProduct(producto);
                            }}
                          >
                            {" "}
                            <GiShoppingCart FaBeer size={26} className="" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                ))}
            </Carousel>
          </div>
        </div>

        <div className="mt-10 bg-teal-100 h-[90vh] max-sm:h-[200vh] max-sm:flex-wrap">
          <div className="flex justify-between mx-2  ">
            <div className="max-sm:text-center">
              <h1 className="font-bold text-3xl mt-12">PREGUNTAS FRECUENTES</h1>
              <h4>resolvemos tus dudas mas frecuentes</h4>
            </div>
          </div>

          <div className="Preguntas flex justify-evenly w-full mt-10 max-sm:flex-wrap max-sm:flex max-sm:gap-5 max-sm:h-[100vh]">
            <div className="w-[30%]  bg-purple-50  p-4 rounded-lg h-[350px] shadow-2xl max-sm:w-[90%]">
              <h1 className="flex mt-6">
                <img
                  src="https://www.mrwonderful.com/media/wysiwyg/home-2023/FaqAguacate.png"
                  alt=""
                />
                <p className="font-bold ">
                  {" "}
                  ¿Cuánto tarda en llegar mi pedido?{" "}
                </p>
              </h1>

              <p>
                Los pedidos tardan entre 2 y 4 dias dias laborales de lunes a
                viernes en llegar a tu domicilio desde confirmas la compra{" "}
              </p>
            </div>
            <div className="w-[30%] max-sm:w-[90%] bg-purple-50  p-4 rounded-lg">
              <h1 className="flex">
                <img
                  src=" https://www.mrwonderful.com/media/wysiwyg/home-2023/FaqUnicornio.png"
                  alt=""
                />
                <p className="font-bold"> Nuestra política de devoluciones</p>
              </h1>

              <p className="text-sm">
                Hemos ampliado de 15 a 30 los días naturales de los que el
                USUARIO dispone para la devolución del mismo, contados a partir
                de la fecha de recepción del producto. Puedes devolvernos los
                productos que quieras siempre que estén en perfecto estado y que
                no sean kits/sets o productos personalizados. Cuando lo
                recibamos y comprobemos que está bien, te haremos el reembolso
                del importe del artículo que devuelves. Nosotros nos ocuparemos
                de organizar la recogida del producto que quieres devolver
                directamente con la empresa de reparto. La devolución es
                GRATUITA*{" "}
              </p>
            </div>
            <div className="w-[30%] max-sm:w-[90%] bg-purple-50  p-4 rounded-lg">
              <h1 className="flex">
                <img
                  src="https://www.mrwonderful.com/media/wysiwyg/home-2023/FaqCorazon.png"
                  alt=""
                />
                <p className="font-bold"> ¿ Qué métodos de pago ofrecemos? </p>
              </h1>

              <p>
                Las formas de pago aceptadas por Mr. Wonderful son PayPal,
                tarjeta de crédito/débito y Apple Pay. Puede ocurrir que algún
                método de pago esté desactivado momentáneamente por una
                incidencia informática. Si es así, elige otro método de pago por
                favor.{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="h-[20vh] flex justify-center items-center gap-4 max-sm:h-[60vh]">
          <div>
            <Link to="https://www.facebook.com/Ferney03">
              <FaFacebook size={40} />
            </Link>
          </div>
          <div>
            <Link to="https://www.instagram.com/mattyasaldana/">
              <FaInstagramSquare size={40} />
            </Link>
          </div>

          <div>
            <Link>
              <FaTwitterSquare size={40} />
            </Link>
          </div>

          <div>
            <Link to="https://www.messenger.com/t/1791731265">
              <FaFacebookMessenger size={40} />
            </Link>
          </div>
          <div>
            <Link to="https://web.whatsapp.com/">
              <FaWhatsappSquare size={40} />
            </Link>
          </div>
        </div>

        <div className="bg-teal-200 flex justify-around h-[25vh] max-sm:h-[100vh] items-center text-sm gap-6 max-sm:flex-wrap">
          <div className="flex w-[25%] gap-2 max-sm:w-[80%]">
            <div>
              <img
                className="w-[250px] p-2"
                alt=""
                src="https://www.mrwonderful.com/media/wysiwyg/home/NUEVA_WEB/01-envio-gratuito.svg"
              />
            </div>
            <div>
              <p>ENTREGA GRATUITA</p>
              <p>
                Envío gratuito, en domicilio a partir de +25€ gratuito y en
                puntos de conveniencia a partir de +15€
              </p>
            </div>
          </div>
          <div className="flex w-[25%] max-sm:w-[80%]  gap-2  p-2">
            <div>
              <img
                className="w-[100px]"
                alt=""
                src="https://www.mrwonderful.com/media/wysiwyg/home/NUEVA_WEB/02-devolucion-30-dias.svg"
              />
            </div>
            <div>
              <p>Devoluciones en 30 días</p>
              <p>Realízala de forma sencilla en 30 días naturales</p>
            </div>
          </div>
          <div className="flex w-[25%] max-sm:w-[80%]  gap-2  p-2">
            <div>
              <img
                className="w-[80px]"
                alt=""
                src="https://www.mrwonderful.com/media/wysiwyg/home/NUEVA_WEB/03-ayuda.svg"
              />
            </div>
            <div>
              <p>¿NECESITAS AYUDA?</p> <p>Llámanos al +57 321 691 224</p>
            </div>
          </div>
          <div className="flex w-[25%] max-sm:w-[80%]  gap-2  p-2">
            <div>
              <img
                className="w-[100px]"
                alt=""
                src="https://www.mrwonderful.com/media/wysiwyg/home/NUEVA_WEB/04-eco.svg"
              />
            </div>
            <div>
              <p>SOMOS ECO</p>
              <p>Usamos materiales 100% reciclables y bosques sostenibles</p>
            </div>
          </div>
        </div>

        <div className="h-[60vh]">
          <div>
            <img
              className="md:hidden"
              src="https://www.mrwonderful.com/media/wysiwyg/2024/Marzo/DiaPadre/banner-Editables_ES-Banner-mobile.png"
              alt=""
            />
            <img
              className="max-sm:hidden"
              src="https://www.mrwonderful.com/media/wysiwyg/2024/Marzo/DiaPadre/banner-Editables_ES-Banner.png"
            />
          </div>
        </div>

        <div className="my-8 h-[40vh] bg-cyan-200 max-sm:hidden">
          <section className="flex justify-center items-center">
            <div className=" flex justify-center items-center gap-10">
              <div className="flex">
                <div className="mt-16">
                  <span className="flex justify-center text-4xl">
                    Consigue un <span className="text-red-600">15% DTO.</span>
                  </span>
                  <span className="flex justify-center text-4xl">
                    EN TU PRIMERA COMPRA
                  </span>
                  <br></br>

                  <p>
                    <span className="flex justify-center">
                      Suscríbete a la newsletter y no te pierdas nada
                    </span>
                  </p>
                </div>
              </div>
              <div className="newsletter__content">
                <header className="newsletter__header"></header>
                <form
                  onSubmit={handleSubmit}
                  className="form subscribe flex flex-col justify-start items-start"
                >
                  <div className="flex justify-start flex-col items-start mt-3 mb-3">
                    <div className="control flex justify-start ">
                      <input
                        className="border-b border-black w-[500px] bg-slate-200 mt-3"
                        name="email"
                        type="email"
                        placeholder="Introduce tu email"
                        value={Suscríbete}
                        onChange={Suscripcion}
                      />
                      <button
                        className="action subscribe primary   "
                        title="Suscribirse"
                        type="submit"
                      >
                        <span className="p-3 bg-red-600 rounded-lg">
                          Suscribirse
                        </span>
                      </button>
                    </div>

                    <div className="flex justify-start items-center">
                      <input type="checkbox" className="required-entry" />
                      <label className="label">
                        <button type="button" className="action action-show">
                          <span>
                            He leído y acepto las condiciones contenidas en la
                            política de privacidad.
                          </span>
                        </button>
                      </label>
                    </div>

                    <div className="flex justify-start items-center">
                      <div className="g-recaptcha-text-box small">
                        Este sitio está protegido por reCAPTCHA y se aplican la{" "}
                        <a
                          href="https://policies.google.com/privacy"
                          className="text-decoration-underline"
                          target="_blank"
                        >
                          Política de Privacidad
                        </a>{" "}
                        y{" "}
                        <a
                          href="https://policies.google.com/terms"
                          className="text-decoration-underline"
                          target="_blank"
                        >
                          Terminos de Servicio
                        </a>{" "}
                        de Google.
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
        <div className="my-8 h-[45vh] bg-cyan-200 md:hidden">
          <section className="">
            <div className=" ">
              <div className="">
                <div className="">
                  <span className=" flex justify-center text-2xl">
                    Consigue un <span className="text-red-600">15% DTO.</span>
                  </span>
                  <span className=" flex justify-center text-2xl">
                    EN TU PRIMERA COMPRA
                  </span>
                  <br></br>

                  <p>
                    <span className="flex justify-center">
                      Suscríbete a la newsletter y no te pierdas nada
                    </span>
                  </p>
                </div>
              </div>
              <div className="newsletter__content">
                <form
                  onSubmit={handleSubmit}
                  className="form subscribe flex flex-col justify-center items-center"
                >
                  <div className="flex justify-center flex-col items-center mt-3 mb-3 mx-3">
                    <div className="control ">
                      <input
                        className="border-b border-black w-[230px] bg-slate-200 mt-1 ms-3"
                        name="email"
                        type="email"
                        placeholder="Introduce tu email"
                        value={Suscríbete}
                        onChange={Suscripcion}
                      />
                      <button
                        className="action subscribe primary   "
                        title="Suscribirse"
                        type="submit"
                      >
                        <span className="p-2 bg-red-600 rounded-lg">
                          Suscribirse
                        </span>
                      </button>

                      <div className="flex justify-start items-start text-xs mt-2">
                        <input
                          type="checkbox"
                          className="required-entry flex justify-center items-center"
                        />
                        <label className="label">
                          <button type="button" className="action action-show">
                            <span>
                              He leído y acepto las condiciones contenidas en la
                              política de privacidad. Este sitio está protegido
                              por reCAPTCHA y se aplican la {""}
                              <a
                                href="https://policies.google.com/privacy"
                                className="text-decoration-underline"
                                target="_blank"
                              >
                                Política de Privacidad
                              </a>{" "}
                              <a
                                href="https://policies.google.com/terms"
                                className="text-decoration-underline"
                                target="_blank"
                              >
                                Terminos de Servicio
                              </a>{" "}
                              de Google.
                            </span>
                          </button>
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>

        <div className="pie de pagina h-[50vh] w-full max-sm:h-[90vh] flex justify-evenly  bg-purple-400 text-black max-sm:flex max-sm:justify-evenly  max-sm:gap-4 max-sm:flex-wrap">
          <div className="max-sm:mx-4 max-sm:w-[40%] max-sm:h-[5%]">
            <div className="mt-20  max-sm:mt-4 text-black font-bold ">CONTACTO</div>
            <div>puntos de venta</div>
            <div>sobre Nosotros</div>
            <div>blog</div>
            <div>
                <Link to="https://www.facebook.com/Ferney03">
              <FaFacebook size={40} />
            </Link>
            </div>
            <div>
            <Link to="https://www.instagram.com/mattyasaldana/">
              <FaInstagramSquare size={40} />
            </Link>
          </div>
          <div>
            <Link to="https://web.whatsapp.com/">
              <FaWhatsappSquare size={40} />
            </Link>
          </div>
          </div>

          <div className="max-sm:mx-4 max-sm:w-[30%] max-sm:h-[15%]">
            <div className="mt-20 max-sm:mt-4 text-black font-bold">PRODUCTOS</div>
            <div>Accesorios</div>
            <div>Hogar</div>
            <div>Electronica</div>
            <div>Tazas</div>
            <div>Viajes</div>
            <div>Regalos</div>
            <div>Novedades</div>
            <div>Top Ventas</div>
          </div>

          <div className="max-sm:mx-4 max-sm:w-[45%]">
            <div className="mt-20 max-sm:mt-0 text-black font-bold">INFORMACION</div>
            <div>Condiciones de compra</div>
            <div>Gastos de envio</div>
            <div>Preguntas Frecuentes</div>
            <div>Politica de Privacidad</div>
            <div>Terminos Y Condiciones</div>
          </div>

          <div className="max-sm:mx-4 max-sm:w-[30%]"> 
            <div className="mt-20 max-sm:mt-0 text-black font-bold">Acceso Tiendas</div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};
