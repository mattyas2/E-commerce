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

// const auth = getAuth(app);

export const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, endSession,getSession,isLogin } = useAuth();

  const EndSession = () => {
    endSession();
    setIsAuthenticated(false);
  };

  useEffect(() => {}, [isAuthenticated]);

  return (
    <>
      <Carousel wrapAround withoutControls slidesToShow={1} autoplay>
        <div className="bg-teal-300 w-full text-center text-sm">
          Imprescindibles para tus vacaciones
        </div>
        <div className="bg-teal-300 w-full text-sm text-center">
          ¡Envíos gratis en pedidos superiores a $100.000!
        </div>
      </Carousel>

      <nav className="flex justify-around border-y-2 h-[100px] w-[100%]">
        <div className="logo mt-3">
          <Link to="/">
            {" "}
            <img src="../src/icono.png" className="w-[200px]" />
          </Link>
        </div>

        <div className="buscar mt-10 text-xs">
          <input
            type="text"
            className="w-[20rem] h-8 border p-2 shadow-xl  "
            placeholder="Buscar...."
          />{" "}
          <a href="/" className="text-black">
            <VscSearch
              style={{
                position: "relative",
                marginTop: -26,
                fontSize: "20px",
                marginLeft: 290,
              }}
            />
          </a>
        </div>

        <div className="iconos flex justify-around w-[15%]  text-[12px]">
          {isAuthenticated ? (<div className="mt-4">
          
            <button
              onClick={EndSession}
              className="text-black text-decoration-none mt-0"
            >
              {" "}
              <IoPersonCircle FaBeer size={26} className="w-16" />
              <h1> Cerrar Sesion</h1>
            </button></div>
          ) : (
            <div className="flex flex-col justify-center">
              <Link className="text-black text-decoration-none" to="/Login">
                {" "}
                <IoPersonCircle FaBeer size={26} className="w-16" /> iniciar
                sesion{" "}
              </Link>
            </div>
          )}
          <div className="mt-6">
            <a className="text-decoration-none text-black">
              <GiShoppingCart FaBeer size={26} className="w-12" />
              ver carrito
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};
