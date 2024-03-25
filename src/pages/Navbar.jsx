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
import { getDocs, getFirestore, or } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";

// const auth = getAuth(app);

export const Navbar = () => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const db = getFirestore(app);

  const {
    isAuthenticated,
    setIsAuthenticated,
    endSession,
    getSession,
    isLogin,
  } = useAuth();

  const EndSession = () => {
    endSession();
    setIsAuthenticated(false);
  };

  useEffect(() => {}, [isAuthenticated]);

  
    const Search = async () => {
      const q = query(
        collection(db, "Coleccion"),
        where("name", "==", input)
      );
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
  
   
 
  // useEffect(() => {
  //   const  handleSearch = async () => {

  //     const db = getFirestore(app);
  //     const q = query(collection(db, "productos") where("name", "==", query));
  //     const docRefs = await getDocs(q);
  //     const res = [];
  //     docRefs.forEach((doc) => {
  //       res.push({ id: doc.id, ...doc.data() });
  //     });
  //     setResults(res);
  //   };

  //   handleSearch()
  // }, [query]);

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

      <nav className="flex justify-around border-y-2 h-[110px] w-[100%] bg-cover bg-[url(https://th.bing.com/th/id/R.284b2edc83453b61c140a43ed4a70f03?rik=Fiu15H6h5z%2bRjw&riu=http%3a%2f%2fwww.openailab.com%2fuploads%2fimg%2f20200814%2f5f36395bebc4e.jpg&ehk=gFvyMGkOMdwj0aQ1KCxWxDd9TBXGtxRSNbqFIiROVWQ%3d&risl=&pid=ImgRaw&r=0)] ">
        <div className="logo ">
          <Link to="/">
            {" "}
            <img
              src="https://github.com/mattyas2/E-commerce/blob/main/src/assets/logotipo.jpeg?raw=true"
              className="w-[120px]"
            />
          </Link>
        </div>

        <div className="buscar mt-10 text-xs flex">
          <div>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="w-[20rem] h-8 border p-2 shadow-xl  "
              placeholder="Buscar...."
            />
            <ul className="relative z-50">
              {results.map((result) => (
                <li key={result.id}>{result.name}</li>
              ))}
            </ul>
          </div>{" "}
          <button onClick={Search}  className="text-black">
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

        <div className="iconos flex justify-around w-[15%]  text-[12px]">
          {isAuthenticated ? (
            <div className="mt-4">
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
            <div className="flex flex-col justify-center">
              <Link  className="text-black text-decoration-none" to="/Login">
                {" "}
                <IoPersonCircle FaBeer size={26} className="w-16" /> iniciar
                sesion{" "}
              </Link>
            </div>
          )}
          <div className="mt-7">
            <Link className="text-decoration-none text-black " to="/Car">
              <GiShoppingCart FaBeer size={26} className="w-12" />
              ver carrito
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
