/* eslint-disable no-unused-vars */

import { GiShoppingCart } from "react-icons/gi";
import { IoPersonCircle } from "react-icons/io5";
import { VscSearch } from "react-icons/vsc";
import Carousel from "nuka-carousel";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../assets/config/firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { deleteDoc, doc, getDoc, getDocs, getFirestore, or } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { Modal } from "bootstrap";

// const auth = getAuth(app);

export const Navbar = (
) => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [active, setActive] = useState(true);
 

  const db = getFirestore(app);

  const {
    isAuthenticated,
    setIsAuthenticated,
    endSession,
    productos, setProductos,
    total, setTotal,
  countProducts, setCountProducts, coleccion, setColeccion,setNewProducto,newProducto,newColeccion,setNewColeccion,carrito,setCarrito
  } = useAuth();

  const EndSession = () => {
    endSession();
    setIsAuthenticated(false);
  };

  useEffect(() => {}, [isAuthenticated]);

  const Search = async () => {
    const q = query(collection(db, "Coleccion"), where("name", "==", input));
    // const q1 = query(
    //   collection(db, "productos"),
    //   where("name", "==", input)
    // );

    const newImpresion = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      newImpresion.push(doc.id, " => ", doc.data());
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    setResults(newImpresion);
  };

  const onDeleteProduct = async (productId) => {
    const productoEliminado = carrito.find((item) => item.id === productId);
    const nuevoCarrito = carrito.filter((producto) => producto.id !== productId);
    setCarrito(nuevoCarrito);
    setTotal(total - (productoEliminado.data.precio * productoEliminado.cantidad));
    setCountProducts(countProducts - productoEliminado.cantidad);
    }
   
  
  
	
  
		
	

	const onCleanCart = () => {
		setCarrito([]);
		setTotal(0);
		setCountProducts(0);
	};

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

      <nav className=" bg-cover bg-[url(https://th.bing.com/th/id/R.284b2edc83453b61c140a43ed4a70f03?rik=Fiu15H6h5z%2bRjw&riu=http%3a%2f%2fwww.openailab.com%2fuploads%2fimg%2f20200814%2f5f36395bebc4e.jpg&ehk=gFvyMGkOMdwj0aQ1KCxWxDd9TBXGtxRSNbqFIiROVWQ%3d&risl=&pid=ImgRaw&r=0)] ">
        <div className="max-sm:flex max-sm:w-full max-sm:justify-between max-sm:gap-2 max-sm:h-[60px] max-sm:mx-2   md:flex md:justify-around border-y-2 h-[110px] md:w-full">
          <div className="logo ">
            <Link to="/">
              {" "}
              <img
                src="https://github.com/mattyas2/E-commerce/blob/main/src/assets/logotipo.jpeg?raw=true"
                className="w-[120px] max-sm:w-[70px] "
              />
            </Link>
          </div>

          <div className="buscar mt-10 text-xs flex max-sm: max-sm:flex max-sm:ms-4  max-sm:mt-5 max-sm:justify-end">
            <div className="max-sm:flex max-sm:justify-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                className="md:w-[20rem] md:h-8 md:border border-teal-300  drop-shadow-2xl  md:p-2 md:shadow-2xl max-sm:w-[8rem] max-sm:shadow-2xl max-sm:h-6  "
                placeholder="Buscar...."
              />
              <ul className="relative z-50">
                {results.map((result) => (
                  <li key={result.id}>{result.name}</li>
                ))}
              </ul>
            </div>{" "}
            <button
              onClick={Search}
              className="text-black max-sm:mt-4 max-sm:ms-2"
            >
              <VscSearch
                style={{
                  marginTop: -26,
                  position: "relative",
                  fontSize: "20px",
                  marginLeft: -30,
                  marginBottom: 0,
                }}
              />
            </button>
          </div>

          <div className="iconos flex justify-around w-[15%] max-sm:flex  max-sm:w-[20%] max-sm:justify-end max-sm:gap-2 max-sm:mx-4 text-[12px]">
            {isAuthenticated ? (
              <div className="mt-4 max-sm:mt-4">
                <button
                  onClick={EndSession}
                  className="text-black text-decoration-none mt-0"
                >
                  {" "}
                  <IoPersonCircle FaBeer size={26} className="w-16" />
                  <h1> Cerrar Sesion</h1>
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-center max-sm:flex max-sm:justify-center max-sm:items-center ">
                <Link className="text-black text-decoration-none" to="/Login">
                  {" "}
                  <IoPersonCircle FaBeer size={38} className="w-16" />{" "}
                  <span className="max-sm:hidden">iniciar sesion </span>
                </Link>
              </div>
            )}
            <div className=" mt-7 max-sm:mt-[10px] max-sm:ms-[-20px]">
            
              <div
                className="text-decoration-none text-black pointer-event " 	onClick={() => setActive(!active)}>
           
                <GiShoppingCart FaBeer size={38}  className="w-12 icon-cart" />
              
              </div>
              <span className="max-sm:hidden ">ver carrito</span>
                <div className="count-products max-sm:ms-[20px] max-sm:mt-[-25px] max-sm:w-5 max-sm:h-5">
						<span className="" id="contador-productos">{countProducts}</span>
					</div>
            
				<div
					className= {!active ? " " : "hidden-cart"} id="container-cart-products">
					{carrito.length > 0 ? (
						<>
							<div className='row-product'>
								{ carrito.map(product => (
									<div className='cart-product' key={product.id}>
										<div className='info-cart-product'>
											<span className='cantidad-producto-carrito'>
												{product.cantidad}
                        
											</span>
											<p className='titulo-producto-carrito'>
												{product.data.name}
											</p>
											<span className='precio-producto-carrito'>
												${product.data.precio} 
											</span>
										</div>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='icon-close'
											onClick={() => onDeleteProduct(product.id)}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									</div>
								))}
							</div>
            
							<div className='cart-total'>
								<h3>Total:</h3>
								<span className='total-pagar'>${total}</span>
							</div>
  <div className="flex">
  <button className='btn-clear-all rounded-2xl' onClick={onCleanCart}>
								Vaciar Carrito
							</button>
              
              <button className='btn-clear-all rounded-2xl ' >
                <Link to="https://buy.stripe.com/test_4gwcOJ37h47Y7ZK288">		Comprar</Link>
					
							</button>
           
  </div>
           
             

						
						</>
					) : (
            
						<div className=" flex justify-between p-4 items-center  bg-purple-50 rounded-lg">
        <p className="text-2xl">Tu cesta está vacía</p>
   <div>
   <svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='icon-close'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
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
    </>
  );
};
