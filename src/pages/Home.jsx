/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import "firebase/firestore";
import {  useEffect, useRef, useState } from "react";


import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";

import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";


import { app, auth } from "../assets/config/firebase";
import { addDoc, getFirestore } from "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";

import { Navbar } from "./Navbar";
import { useAuth } from "../auth/AuthProvider";
import { register } from "swiper/element/bundle";


import { ProductsItems } from '../products/ProductsItems'
import { ColeccionItems } from "../products/ColeccionItems";
register();


export const Home = () => {

  const [data, setData] = useState({});
  const [iconoSeleccionado, setIconoSeleccionado] = useState(null);
  const db = getFirestore(app);

  const carouselRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [Suscríbete, setSuscribete] = useState("");
  const [email, setEmail] = useState('');
 

  
  const {
 
    total,
    setTotal,
    countProducts,
    setCountProducts,
    coleccion,
    setColeccion,
    loading,
    user,
    addToFavorites,loaded,setLoaded
   ,
    removeFavorite,
    removeFromCart,onAddProduct, carrito,
    productos,setProductos,
       handleNext,handlePrev
  } = useAuth();





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

  //
  //
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email) {
      const db = getFirestore();
      const usersCollection = collection(db,  "suscriptores");

      try {
        await addDoc(usersCollection, {
          email 
        });

        // Limpiar los campos del formulario después de enviar la información
      
        setEmail('');

        console.log('Información enviada correctamente a Firebase');
      } catch (error) {
        console.error('Error al enviar la información a Firebase', error);
      }
    }
  };

  



   

  return (
    <>
     
        <div className="bg-teal-50  ">
          <Navbar />

       
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
          
          <ProductsItems/>

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



            <ColeccionItems/>


          </div>

          <div className="mt-10 bg-teal-100 h-[90vh] max-sm:h-[200vh] max-sm:flex-wrap">
            <div className="flex justify-between mx-2  ">
              <div className="max-sm:text-center">
                <h1 className="font-bold text-3xl mt-12">
                  PREGUNTAS FRECUENTES
                </h1>
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
                  USUARIO dispone para la devolución del mismo, contados a
                  partir de la fecha de recepción del producto. Puedes
                  devolvernos los productos que quieras siempre que estén en
                  perfecto estado y que no sean kits/sets o productos
                  personalizados. Cuando lo recibamos y comprobemos que está
                  bien, te haremos el reembolso del importe del artículo que
                  devuelves. Nosotros nos ocuparemos de organizar la recogida
                  del producto que quieres devolver directamente con la empresa
                  de reparto. La devolución es GRATUITA*{" "}
                </p>
              </div>
              <div className="w-[30%] max-sm:w-[90%] bg-purple-50  p-4 rounded-lg">
                <h1 className="flex">
                  <img
                    src="https://www.mrwonderful.com/media/wysiwyg/home-2023/FaqCorazon.png"
                    alt=""
                  />
                  <p className="font-bold">
                    {" "}
                    ¿ Qué métodos de pago ofrecemos?{" "}
                  </p>
                </h1>

                <p>
                  Las formas de pago aceptadas por Mr. Wonderful son PayPal,
                  tarjeta de crédito/débito y Apple Pay. Puede ocurrir que algún
                  método de pago esté desactivado momentáneamente por una
                  incidencia informática. Si es así, elige otro método de pago
                  por favor.{" "}
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
                            value={email} onChange={(e) => setEmail(e.target.value)} 
                          
                          
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
                        <input type="checkbox" required />
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
                          Este sitio está protegido por reCAPTCHA y se aplican
                          la{" "}
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
                    <div className="flex justify-center flex-col items-center mt-3 mb-3 mx-6">
                      <div className="control ">
                        <input
                          className="border-b border-black w-[200px] bg-slate-200 mt-1 ms-3"
                          name="email"
                          type="email"
                          placeholder="Introduce tu email"
                          value={email} onChange={(e) => setEmail(e.target.value)} 
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
                            type="checkbox" required
                            className="required-entry flex justify-center items-center"
                          />
                          <label className="label">
                            <button
                              type="button"
                              className="action action-show"
                            >
                              <span>
                                He leído y acepto las condiciones contenidas en
                                la política de privacidad. Este sitio está
                                protegido por reCAPTCHA y se aplican la {""}
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

         
        </div>
      
    </>
  );
};
