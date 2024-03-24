/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import react, { createContext } from "react";
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

import { useEffect, useState } from "react";
import { app } from "../assets/config/firebase";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import Modal from "react-modal";
import { Modall } from "react-modal";
import { Tilt } from "react-tilt";
import { IoAddCircle } from "react-icons/io5";
import { Navbar } from "./Navbar";
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
  const [coleccion, setColeccion] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});
  const [productos, setProductos] = useState([]);
  const db = getFirestore(app);
  const [modalIsOpen, setIsOpen] = useState(false);
  let subtitle;

  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const productosData = querySnapshot.docs.map((doc) => doc.data());
      setProductos(productosData);
    };

    obtenerProductos();
  }, []);

  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(collection(db, "Coleccion"));
      const newImpresion = [];
      querySnapshot.forEach((doc)=>{
       newImpresion.push({ id: doc.id, data: doc.data() });
      })
     
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
  const boton = createContext({
    mixins: [Carousel.ControllerMixin],
    render() {
      return (
        <Carousel
          ref={Carousel}
          data={this.setCarouselData.bind(this, "carousel")}
        >
          ...
        </Carousel>
      );
    },
  });

  return (
    <>
      <div>
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
            <div className="flex  gap-2">
              <img
                src="https://www.nerdwallet.com/assets/blog/wp-content/uploads/2020/01/GettyImages-183278704.jpg-What-to-Buy-and-Skip-in-February-2400x1440.jpg"
                style={{ width: 300, height: 300 }}
              />

              <img
                src="https://hdtvtest.co.uk/static_data/content/GettyImages-142547173-woman-tvs-5983293622fa3a001036d2c4-d7b7a93c-e5eb-4a61-a7f1-741ae9979017.jpg"
                style={{ width: 300, height: 300 }}
              />

              <img
                src="https://th.bing.com/th/id/R.8636eb96e800eda948853e56d2bd9237?rik=VxecRGlTxCkdFw&riu=http%3a%2f%2fwww.primecursos.com.br%2farquivos%2fuploads%2f2013%2f04%2frecepcionista.jpg&ehk=n5%2bt7n2v5cN6Gmxz5Dm1jsV%2fNksvbgEWeOAjf2eNwtY%3d&risl=&pid=ImgRaw&r=0"
                style={{ width: 300, height: 300 }}
              />

              <img
                src="https://th.bing.com/th/id/R.8636eb96e800eda948853e56d2bd9237?rik=VxecRGlTxCkdFw&riu=http%3a%2f%2fwww.primecursos.com.br%2farquivos%2fuploads%2f2013%2f04%2frecepcionista.jpg&ehk=n5%2bt7n2v5cN6Gmxz5Dm1jsV%2fNksvbgEWeOAjf2eNwtY%3d&risl=&pid=ImgRaw&r=0"
                style={{ width: 300, height: 300 }}
              />
              <img
                src="https://hdtvtest.co.uk/static_data/content/GettyImages-142547173-woman-tvs-5983293622fa3a001036d2c4-d7b7a93c-e5eb-4a61-a7f1-741ae9979017.jpg"
                style={{ width: 300, height: 300 }}
              />
            </div>
          </Carousel>
        </div>

        <div className="VENTAS flex justify-start mt-16 mx-3">
          <h1 className="font-bold text-3xl">
            PRODUCTOS RECIEN SALIDOS DEL HORNO{" "}
          </h1>
        </div>

        <div className="flex justify-between mx-4 mt-5">
          <div className="LINKDEVENTAS flex gap-4 ">
            <div className="border p-2 w-[90px] flex justify-center hover:bg-sky-400  ">
              <a className=" text-decoration-none text-black" href="">
                Accesorios
              </a>
            </div>
            <div className="border p-2 w-[90px] flex justify-center  hover:bg-sky-400 ">
              <a className=" text-decoration-none text-black" href="">
                Hogar
              </a>
            </div>
            <div className="border p-2 w-[90px] flex justify-center  hover:bg-sky-400 ">
              <a className=" text-decoration-none text-black" href="">
                Deporte
              </a>
            </div>
            <div className="border p-2 w-[100px] flex justify-center  hover:bg-sky-400 ">
              <a className=" text-decoration-none text-black" href="">
                Electronica
              </a>
            </div>

            <div className="border p-2 w-[90px] flex justify-center  hover:bg-sky-400 ">
              <a className=" text-decoration-none text-black" href="">
                Ropa
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <Link>
              <button className="mt-2" onClick={openModal}>
                <IoAddCircle FaBeer size={26} />
              </button>
            </Link>
            <button>
              <LiaAngleLeftSolid size={30} />
            </button>
            <button>
              <LiaAngleRightSolid size={30} />
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
                      setData({ ...data, Category: e.target.value });
                    }}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Hogar">Hogar</option>
                    <option value="Deporte">Deporte</option>
                    <option value="Electronica">Electronica</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Tazas">Tazas</option>
                    <option value="viaje">Viaje</option>
                  </select>
                </div>
                <div>
                  <label className="flex flex-col mt-2  font-bold ">
                    Precio:
                  </label>
                  <input
                    className="border form-control "
                    type="text"
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
          </Modal>
        </div>

        <Carousel
          slidesToShow={3}
          cellAlign="start"
          cellSpacing={0}
          dragging={true}
          renderTopLeftControls
          wrapAround
          autoplay={true}
          withoutControls
          pauseOnHover
        >
          {productos.map((producto) => (
            <div
              className=" flex flex-col justify-center items-center mx-[10px] mt-5 mb-4 w-[80%] h-[360px] rounded-xl shadow-2xl "
              key={producto.id}
            >
              <div className="flex justify-center items-center mt-[-40px]">
                <Tilt
                  options={defaultOptions}
                  style={{ height: 200, width: 260, marginLeft: 60 }}
                >
                  <img
                    className="w-[200px] h-[200px] "
                    src={producto.imagen}
                    alt=""
                  />
                </Tilt>
              </div>
              <div className="mt-1 mb-4">
                <h1 className="font-bold text-xl">{producto.name} </h1>
              </div>
              <div className="flex justify-between w-[100%] ">
                <div className="mx-4 mt-5">${producto.precio}</div>
                <div className="flex gap-2 mx-4 mt-5">
                  <Link>
                    {" "}
                    <IoMdHeartEmpty FaBeer size={26} className="" />
                  </Link>{" "}
                  <Link to="/Car">
                    {" "}
                    <GiShoppingCart FaBeer size={26} className="" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        <div className="text-center flex gap-3">
          <div>
            <img
              className="w-[600px] h-[400px]"
              src="https://www.mrwonderful.com/media/wysiwyg/2024/Marzo/Viaje/ES-destacados-viajes-600x600.jpg"
              alt=""
            />
            <h4 className="text-decoration-underline">
              <Link href="">ACCESORIOS DE VIAJE</Link>
            </h4>
          </div>

          <div>
            <img
              className="w-[600px] h-[400px]"
              src="https://www.mrwonderful.com/media/wysiwyg/2024/Febrero/2dasRebajas/carrousel-homecollection_slider-web-es.png"
              alt=""
            />
            <h4 className="text-decoration-underline">
              <Link href="">NOVEDADES</Link>
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
            <div>
              <h1 className="font-extrabold text-3xl">
                DESCUBRE LOS TOP VENTAS
              </h1>
              <h4>Descubre Novedades</h4>
            </div>
            <div>
              <h4 className="text-decoration-underline">
                <Link>Ver todos</Link>
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

          <div>
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
                    options={defaultOptions}
                    style={{ height: 450, width: 350, marginLeft: 60 }}
                  >
                    <div
                      className=" flex flex-col justify-center items-center mx-[10px] mt-5 mb-4 w-[80%] h-[360px] rounded-xl shadow-2xl "
                      key={producto.id}
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
                        <div className="mx-4 mt-5">${producto.data.Precio}</div>
                        <div className="flex gap-2 mx-4 mt-5">
                          <Link>
                            {" "}
                            <IoMdHeartEmpty FaBeer size={26} className="" />
                          </Link>{" "}
                          <Link to="/Car">
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

        <div className="mt-10 bg-teal-300 h-[90vh]">
          <div className="flex justify-between mx-2 ">
            <div>
              <h1 className="font-bold text-3xl mt-12">PREGUNTAS FRECUENTES</h1>
              <h4>resolvemos tus dudas mas frecuentes</h4>
            </div>
          </div>

          <div className="Preguntas flex justify-evenly w-full mt-10">
            <div className="w-[30%] bg-slate-50 p-4 rounded-lg h-[350px] shadow-2xl">
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
            <div className="w-[30%]  bg-slate-50 p-4 rounded-lg">
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
            <div className="w-[30%]  bg-slate-50 p-4 rounded-lg">
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

        <div className="h-[20vh] flex justify-center items-center gap-4">
          <div>
            <FaFacebook size={40} />
          </div>
          <div>
            <FaInstagramSquare size={40} />
          </div>

          <div>
            <FaTwitterSquare size={40} />
          </div>

          <div>
            <FaFacebookMessenger size={40} />
          </div>
          <div>
            <FaWhatsappSquare size={40} />
          </div>
        </div>

        <div className="bg-slate-400 flex justify-around h-[25vh] items-center text-sm gap-6">
          <div className="flex w-[25%] gap-2 ">
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
          <div className="flex w-[25%]  gap-2  p-2">
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
          <div className="flex w-[25%]  gap-2  p-2">
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
          <div className="flex w-[25%]  gap-2  p-2">
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

        <div className="h-[10vh]">
<div>
  <div>
    
  </div>
</div>



        </div>
      </div>
    </>
  );
};
