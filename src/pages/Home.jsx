/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import "firebase/firestore";
import { useEffect, useRef, useState } from "react";

import Carousel from "nuka-carousel";
import { Link, unstable_HistoryRouter, useNavigate } from "react-router-dom";

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

import { ProductsItems } from "../products/ProductsItems";
import { ColeccionItems } from "../products/ColeccionItems";
import Alert from "../components/Alert";

register();

export const Home = () => {
  const db = getFirestore(app);
  const [email, setEmail] = useState("");

  const {
    setColeccion,
    user,
    setLoaded,alertMessages, alertType, showAlerta, handleShowAlert,
    
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



  //
  //

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email) {
      const db = getFirestore();
      const usersCollection = collection(db, "suscriptores");

      try {
        await addDoc(usersCollection, {
          email,
        });

        // Limpiar los campos del formulario después de enviar la información

        setEmail("");

        handleShowAlert("¡Tu suscripcion a sido Exitosa!","success");
      } catch (error) {
        console.error("Error al enviar la información a Firebase", error);
      }
    }
  };

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
 



  return (
    <>
      <div className="bg-teal-50 ">
        <Navbar />
        <div>
        { showAlerta && (
        <Alert message={alertMessages}  type={alertType}/>
      )}

        </div>
        {showAlert && <Alert message={alertMessage} />}

        <div className="carrusel duration-300">
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
          <h1 className="font-bold text-3xl max-sm:text-xl ">
            PRODUCTOS RECIEN SALIDOS DEL HORNO{" "}
          </h1>
        </div>

        <ProductsItems  agregarAlCarrito={agregarAlCarrito}
        agregarAFavoritos={agregarAFavoritos} />

        <div className="max-w-screen-xl mx-auto p-2 sm:p-10 md:p-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
            <div className="rounded overflow-hidden shadow-lg">
              <div className="relative">
                <Link to="/Viajes">
                  <img
                    className="w-full"
                    src="https://www.mrwonderful.com/media/wysiwyg/2024/Marzo/Viaje/ES-destacados-viajes-600x600.jpg"
                    alt="Sunset in the mountains"
                  />
                  <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                </Link>
              </div>
              <div className="px-6 py-2">
                <span className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">
                  <Link to="/Viajes" className=" hover:text-indigo-600">
                    ACCESORIOS DE VIAJE
                  </Link>
                </span>
                <p className="text-gray-500 text-sm"></p>
              </div>
            </div>
            <div className="rounded overflow-hidden shadow-lg">
        
              <div className="relative">
                <Link to="/Novedades">
                  <img
                    className="w-full"
                    src="https://www.mrwonderful.com/media/wysiwyg/2024/Febrero/2dasRebajas/carrousel-homecollection_slider-web-es.png"
                    alt="Sunset in the mountains"
                  />
                  <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                </Link>
              </div>
              <div className="px-6 py-2">
                <span
                 
                  className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out"
                >
                  {" "}
                  <Link to="/Novedades">NOVEDADES</Link>
                </span>
              </div>
            </div>
            <div className="rounded overflow-hidden shadow-lg">
              <div className="relative">
                <img
                  className="w-full"
                  src="https://www.mrwonderful.com/media/wysiwyg/2024/Marzo/Viaje/ES-destacados-infantil-600x600.jpg"
                  alt="Sunset in the mountains"
                />
                <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
              </div>
              <div className="px-6 py-2">
                <div className="font-semibold text-lg text-center inline-block hover:text-indigo-600 transition duration-500 ease-in-out">
                  {" "}
                  <Link>PERSONAJES MATTYAS</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ColeccionItems  agregarAlCarrito={agregarAlCarrito}
        agregarAFavoritos={agregarAFavoritos} />
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
                Las formas de pago aceptadas por Mr. Mattyas son PayPal,
                 Puede ocurrir que algún
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
                Envío gratuito, en domicilio a partir de $100.000 gratuito y en
                puntos de conveniencia a partir de $70.000
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


        <div className="bg-cyan-200 py-6 sm:py-4 lg:py-12">
  <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
    <div className="flex flex-col items-center rounded-lg bg-cyan-200  p-4 sm:p-8 lg:flex-row lg:justify-between">
      <div className="mb-4 sm:mb-8 lg:mb-0">
        <h2 className="text-center text-xl font-bold text-black sm:text-2xl lg:text-left lg:text-3xl">
        <div className="mt-4">
                  <span className="flex justify-center text-4xl max-sm:flex-col">
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

        </h2>
      
      </div>

      <div className="flex flex-col items-center lg:items-end">
        <form    onSubmit={handleSubmit} className="mb-3 flex w-full max-w-md gap-2">
          <input  name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} className="bg-gray-white w-full flex-1 rounded border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 outline-none ring-indigo-300 transition duration-100 focus:ring max-sm:w-[200px]" />

          <button  className="inline-block rounded bg-red-500 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-red-600 focus-visible:ring active:bg-red-700 md:text-base max-sm:p-2"
          title="Suscribirse"
          type="submit">
            Suscribete
          </button>
        </form>

        <p className="text-center text-xs text-black lg:text-right">   Este sitio está protegido por reCAPTCHA y  <Link className="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600">Term of Service</Link> and <Link  className="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600">Privacy Policy</Link>.</p>
      </div>
    </div>
  </div>
</div>
      </div>
    </>
  );
};
