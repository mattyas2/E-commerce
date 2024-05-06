/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";
import { Navbar } from "./Navbar";

import "firebase/auth";


export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle, } =
    useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const funcionAutenticacion = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log("error");
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  

 

  return (
    <>
      <Navbar />
      <div className="bg-teal-50 h-screen max-sm:h-[153vh]">
        <h1 className="text-center text-3xl font-bold mb-6 p-4">
          Entrar / Salir
        </h1>
        <div className=" flex gap-8 col-12 justify-center max-sm:flex max-sm:flex-col  max-sm:justify-center max-sm:items-center">
          <div className="flex flex-col gap-4 col-5 max-sm:flex max-sm:flex-col max-sm:w-[90%]">
            <span className="text-2xl font-bold">¿Ya estás registrado?</span>

            <span>
              Si tiene una cuenta, inicia sesión con su dirección de correo
              electrónico.
            </span>

            <div className="w-56 h-12 bg-white flex justify-start items-center ">
              <span className="h-full w-16 flex items-center justify-center border">
                <img
                  src={`https://www.material-tailwind.com/logos/logo-google.png`}
                  alt="google"
                  className="h-6 w-6  bg-white"
                />{" "}
              </span>

              <button
                className="bg-cyan-400 h-full w-full hover:bg-cyan-500"
                onClick={handleGoogleSignin}
              >
                Login with google
              </button>
            </div>

            <div className="">
              <form onSubmit={funcionAutenticacion} className="">
                <div className="mb-6 flex flex-col">
                  <label
                    type="text"
                    className="flex items-center justify-start"
                    id="email"
                  >
                    Email <p className="text-red-600">*</p>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    className="border h-12"
                    required=""
                    autoComplete="off"
                  />
                </div>
                <div className="mb-2 flex flex-col">
                  <label tabIndex="password" className=" flex">
                    Password<p className="text-red-600">*</p>
                  </label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="password"
                    className="border h-12"
                    required=""
                  />
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-red-500 text-xs max-sm:text-[10px]">
                    * Campos obligatorios
                  </p>
                  <button className="hover:text-cyan-400 text-sm max-sm:text-[11px]">
                    <Link to="/Reset" className="text-decoration-none">
                      {" "}
                      ¿Has olvidado tu contraseña?
                    </Link>
                  </button>
                </div>
                <p className="text-xs mt-2 mb-2">
                  Este sitio está protegido por reCAPTCHA y se aplican la
                  Política de Privacidad y Terminos de Servicio de Google.
                </p>

                <button
                  type="submit"
                  className=" border p-2.5 mt-3 bg-cyan-400 hover:bg-cyan-500 text-white font-bold max-sm:w-full"
                >
                  <span>Iniciar Sesion</span>
                </button>
              </form>
            </div>
          </div>

          <div className="relative shrink-0 flex flex-col col-5 max-sm:flex max-sm:flex-col  max-sm:w-[90%] ">
            <div className=" text-sm text-gray-900 max-sm:flex max-sm:flex-col max-sm:w-full  max-sm:justify-center max-sm:mb-12 max-sm:gap-2">
              <span className="font-bold text-2xl ">Nuevo cliente</span>
              <br /> <br />
              <span className="">
                Crear una cuenta tiene muchos beneficios: Pago más rápido,
                guardar más de una dirección, seguimiento de pedidos y mucho
                más.
              </span>
              <br />
              <button className="bg-cyan-400 p-2.5  hover:bg-cyan-500 mt-4 max-sm:w-full ">
                <Link
                  className="text-decoration-none text-white font-bold "
                  to={"/Register"}
                >
                  Crea una Cuenta{" "}
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
