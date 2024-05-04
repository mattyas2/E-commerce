/* eslint-disable react/prop-types */
import { GiShoppingCart } from "react-icons/gi";

import estrella from "../assets/img/estrella.png";
import reloj from "../assets/img/reloj.png";
import vector from "../assets/img/vect.png";
import flecha from "../assets/img/flecha.png";
import color from "../assets/img/colors.png";

import { Link } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import { useEffect, useRef } from "react";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { Tilt } from "@jdion/tilt-react";
import { useAuth } from "../auth/AuthProvider";

import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Keyboard, Mousewheel, Navigation } from "swiper/modules";
import { LiaAngleRightSolid } from "react-icons/lia";
import { LiaAngleLeftSolid } from "react-icons/lia";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const ColeccionItems = ({ agregarAlCarrito, agregarAFavoritos }) => {
  const {
    coleccion,
    setColeccion,
    favorites,
    onAddProduct,
    addToFavorites,
    loaded,
    setLoaded,
    onDeleteFavort,
    user,
  } = useAuth();

  const db = getFirestore();

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
  }, []);

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
      <div className="flex justify-between">
        <div className="max-sm:text-center">
          <h1 className="font-extrabold text-3xl mx-6">
            DESCUBRE LOS TOP VENTAS
          </h1>
          <h4 className="mx-6">Descubre Novedades</h4>
        </div>
        <div className="max-sm:hidden">
          <h4 className="text-decoration-underline flex justify-center p-3 border mx-8 bg-emerald-50 hover:bg-emerald-300">
            <Link to="/Todos">Ver todos</Link>
          </h4>
          <p className="flex  mt-2 gap-10 mx-9">
            <button onClick={handleNext}>
              <LiaAngleLeftSolid size={30} />
            </button>
            <button onClick={handlePrev}>
              <LiaAngleRightSolid size={30} />
            </button>
          </p>
        </div>
      </div>

      <div className="h-[540px] mt-6 max-sm:hidden mb-10">
        <Swiper
          modules={[Navigation]}
          slidesPerView={3.7}
          loop={true}
          ref={swiperRef}
          freeMode={true}
          spaceBetween={48}
          pagination={{
            dynamicBullets: true,
          }}
          key={2}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="swipe1 "
        >
          {loaded &&
            coleccion.length > 0 &&
            coleccion.map((producto) => (
              <div className="h-[100%]" key={producto.id}>
                <SwiperSlide className="slide1">
                  <div className="relative  mx-4 mt-2 mb-6 rounded-xl shadow-2xl w-[320px] flex flex-col justify-center  bg-purple-50  h-[535px]">
                    <Tilt>
                      <div className="bg-red-500 w-fit px-2 text-white font-bold rounded-sm absolute top-3 left-6">
                        <p>sale</p>
                      </div>
                      <Link to={`/ProductsPage/${producto.id}`}>
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
                            <span  className="hover:text-cyan-800"
                              onClick={() => {
                                onAddProduct(producto);
                              }}
                            >
                              <GiShoppingCart  size={36} className="" />
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
                              <GiShoppingCart size={36} className="" />
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

      <div className="h-[520px] mt-10 md:hidden ">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
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
          
          key={1}
          className="mySwiper"
        >
          {loaded &&
            coleccion.length > 0 &&
            coleccion.map((product) => (
              <div
                className="relative  mx-4 mt-2 rounded-xl shadow-2xl w-[320px] flex flex-col justify-center  bg-purple-50 mb-9 h-[520px]"
                key={product.id}
              >
                <SwiperSlide>
                  <Tilt>
                    <div className="bg-red-500 w-fit px-2 text-white font-bold rounded-sm absolute top-3 left-6">
                      <p>sale</p>
                    </div>

                    <Link to={`/ColeccionPage/${product.id}`}>
                      <img
                        className="w-full h-[300px]"
                        src={product.data.imagen}
                        alt=""
                      />
                    </Link>
                  </Tilt>
                  <div>
                    <div className="flex items-start justify-start mt-3  mx-4  col-7 ">
                      <h6 className="text-cyan-500  font-bold  ">
                        {product.data.name}
                      </h6>
                      <div className="bg-black text-white  flex items-center gap-1 col-2 absolute ms-[200px]">
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
                        ${product.data.precio}.000
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
                              (item) => item.id === product.id
                            ) ? (
                              <FcLike
                               
                                size={36}
                                onClick={() => onDeleteFavort(product.id)}
                              />
                            ) : (
                              <IoMdHeartEmpty
                              
                                size={36}
                                onClick={() => addToFavorites(product)}
                              />
                            )}
                          </Link>{" "}
                          <Link>
                            {" "}
                            <span
                              onClick={() => {
                                onAddProduct(product);
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
                              (item) => item.id === product.id
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
    </>
  );
};
