/* eslint-disable react/prop-types */
import { useAuth } from "../auth/AuthProvider";
import estrella from "../assets/img/estrella.png";
import reloj from "../assets/img/reloj.png";
import vector from "../assets/img/vect.png";
import flecha from "../assets/img/flecha.png";
import color from "../assets/img/colors.png";

import { Link } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { FcLike } from "react-icons/fc";

import { GiShoppingCart } from "react-icons/gi";

import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Keyboard, Mousewheel, Navigation } from "swiper/modules";

import { Tilt } from "@jdion/tilt-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { app } from "../assets/config/firebase";

import { LiaAngleRightSolid } from "react-icons/lia";
import { LiaAngleLeftSolid } from "react-icons/lia";

import Modal from "react-modal";

import { IoAddCircle } from "react-icons/io5";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
  },
};

export const ProductsItems = ({ agregarAlCarrito, agregarAFavoritos }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});


  let subtitle;
  const {
    productos,
    favorites,
    user,
    addToFavorites,
    onDeleteFavort,
    onAddProduct,
  } = useAuth();

  const db = getFirestore(app);
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

  const swiperRef = useRef(null);

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleClickCarrito = () => {
    agregarAlCarrito(); // Llama a la función agregarAlCarrito desde props
  };

  const handleClickFavoritos = () => {
    agregarAFavoritos(); // Llama a la función agregarAFavoritos desde props
  };

 
  return (
    <>
      <div className="flex justify-between mx-4 mt-5 mb-4 max-sm:hidden">
        <div className="LINKDEVENTAS flex gap-4 max-sm:flex-wrap ">
          <div className="border p-2 w-[200px] flex justify-center hover:bg-sky-400 bg-purple-50 ">
            <Link className=" text-decoration-none text-black" to="/Accesorios">
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
            <Link className=" text-decoration-none text-black" to="/Tazas">
              Tazas
            </Link>
          </div>
        </div>

        <div className="flex gap-4 max-sm:hidden">
          <Link className="hidden">
            <button className="mt-2" onClick={openModal}>
              <IoAddCircle size={26} />
            </button>
          </Link>
          <button onClick={handlePrev}>
            <LiaAngleLeftSolid size={30} />
          </button>
          <button onClick={handleNext}>
            <LiaAngleRightSolid size={30} />
          </button>
        </div>
      </div>

      <div className="modall hidden">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Agregar Productos"
        >
          <div className="">
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
                    type="text file"
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
                  onClick={enviarDatos}
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
          </div>
        </Modal>
      </div>

      <div className="md:hidden mb-16 mt-8 ">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={true}
          key={4}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            dynamicBullets: true,
          }}
          navigation={true}
          mousewheel={true}
          keyboard={true}
          loop={true}
          modules={[Autoplay, Navigation,Mousewheel, Keyboard]}
         
          className="mySwiper"
        >
          {productos.map((producto,index) => (
            <div
              className="relative  mx-4 mt-2 rounded-xl shadow-2xl w-[300px] flex flex-col justify-center  bg-purple-50 mb-8 h-[350px]"
              key={producto.id || index}
            >
              <SwiperSlide>
                <Tilt>
                  <div className="bg-red-500 w-fit px-2 text-white font-bold rounded-sm absolute top-4 left-6">
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
                <div className="flex items-start justify-start mt-3  mx-4  col-8 ">
                      <h6 className="text-cyan-500  font-bold  ">
                        {producto.data.name}
                      </h6>
                      <div className="bg-black text-white  flex items-center gap-1 col-2 absolute ms-[220px]">
                        <div className="w-20 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="yellow" className="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
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
                        <p className="text-cyan-500 font-bold flex gap-7">
                          <Link>
                            {" "}
                            {favorites.find(
                              (item) => item.id === producto.id
                            ) ? (
                              <FcLike
                             
                                size={36}
                                onClick={() => onDeleteFavort(producto.id)}
                              />
                            ) : (
                              <IoMdHeartEmpty
                          
                                size={36}
                                onClick={() => addToFavorites(producto)}
                              />
                            )}
                          </Link>{" "}
                          <Link   >
                            {" "}
                            <span
                              onClick={() => {
                                onAddProduct(producto);
                              }}
                            >
                              <GiShoppingCart  size={36}  />
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
                              
                                size={36}
                                onClick={handleClickFavoritos}
                             
                              />
                            ) : (
                              <IoMdHeartEmpty
                              
                                size={36}
                                onClick={handleClickFavoritos}
                              />
                            )}
                          </Link>{" "}
                          <Link>
                            {" "}
                            <span
                            onClick={handleClickCarrito}
                            >
                              <GiShoppingCart  size={36} className="" />
                            </span>
                          </Link>{" "}
                        </p>
                        <img src={flecha} alt="" />
                      </div>
                    )}


                </div>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
      <div className="max-sm:hidden mb-10  ">
        <Swiper
          modules={[Navigation]}
          slidesPerView={3.7}
          loop = {true}
          ref={swiperRef}
          freeMode={true}
          spaceBetween={48}
          pagination={{
            dynamicBullets: true,
          }}
          key={5}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="swipe "
        >
          {productos.map((producto) => (
            <div key={producto.id}>
              <SwiperSlide className="slide">
                <div className="relative  mx-4 mb-6 rounded-xl shadow-2xl w-[320px] flex flex-col justify-center  bg-purple-50  h-[530px]">
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
                      <h6 className="text-cyan-500  font-bold">
                        {producto.data.name}
                      </h6>
                      <div className="col-1 bg-slate-900 text-white flex items-center gap-2 w-14">
                        <div>
                          <img className="w-5 h-5" src={estrella} alt="" />
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
                                
                                size={36}
                                onClick={() => onDeleteFavort(producto.id)}
                              />
                            ) : (
                              <IoMdHeartEmpty
                              className="hover:text-cyan-800"
                                size={36}
                                onClick={() => addToFavorites(producto)}
                              />
                            )}
                          </Link>{" "}
                          <Link>
                            {" "}
                            <span className="hover:text-cyan-800"
                              onClick={() => {
                                onAddProduct(producto);
                              }}
                            >
                              <GiShoppingCart size={36} className="" />
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
                              
                                size={36}
                                onClick={handleClickFavoritos}
                             
                              />
                            ) : (
                              <IoMdHeartEmpty
                                
                                size={36}
                                onClick={handleClickFavoritos}
                              />
                            )}
                          </Link>{" "}
                          <Link>
                            {" "}
                            <span
                            onClick={handleClickCarrito}
                            >
                              <GiShoppingCart  size={36} className="" />
                            </span>
                          </Link>{" "}
                        </p>
                        <img src={flecha} alt="" />
                      </div>
                    )}


                  </div>
                </div>



              </SwiperSlide>
              
            </div>
          ))}
        </Swiper>
      </div>
    </>
  );
};
