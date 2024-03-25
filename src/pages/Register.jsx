/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { app } from "../assets/config/firebase"

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import {createUser} from "../assets/config/firebase"
import {startSession} from "./sesion";
import { Navbar } from "./Navbar";
import { useAuth } from "../auth/AuthProvider";


const auth = getAuth(app);


export const Register = () => {

  const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const {setIsAuthenticated} = useAuth();
  
    const registerAccount = async (e) => {
      e.preventDefault();
     // validate the inputs
     if (!email || !password || !repeatPassword) {
      setError("Please fill out all the fields.");
      return;
    }
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    // clear the errors
    setError("");
    try {
      let registerResponse = await createUser(email, password,usuario);
      startSession(registerResponse.user);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error(error.message);
      setError(error.message);
      alert('Error')
    }
  }
   
  return (
    <>
    <Navbar usuario={usuario} />
   
      <div className="bg-[url(https://image.slidesdocs.com/responsive-images/background/office-business-team-cooperation-data-simple-powerpoint-background_7cb3d2ee4a__960_540.jpg)] bg-cover bg-no-repeat h-[540px] flex  ">
        <div className="w-[40%] mt-32 ms-28 text-5xl ">
        <div className="flex justify-center items-center font-bold ">Registrarte</div>
            <div className="flex justify-center font-bold">Es rápido y fácil.</div>
    </div>
      
      <div className="w-[70%] ms-[-300px]">
      <div className="relative flex flex-1 flex-col items-center justify-center  pt-4 text-black ">
          <form onSubmit={registerAccount} className="w-full max-w-sm ">

          <div className="mb-6">
              
              <label
                type="text"
                className="block text-sm font-semibold leading-6 text-gray-900"
                id="usuario">
                Usuario:
              </label>
              <input
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                type="text"
                id="usuario"
                className="mt-1 appearance-none text-slate-900 bg-white rounded-md block w-full px-2 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                required="" autoComplete="off"
              />
            </div>
            <div className="mb-6">
              
              <label
                type="text"
                className="block text-sm font-semibold leading-6 text-gray-900"
                id="email">
                Email address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="mt-1 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                required="" autoComplete="off"
              />
            </div>
            <div className="mb-6">
              <label
                tabIndex="password"
                className="block text-sm font-semibold leading-7 text-gray-900"
              >
                Password
              </label>
              <input
               value={password}
               onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="mt-1 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-9 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                required=""
              />
            </div>
            <div className="mb-6">
              <label
                tabIndex="repeatpassword"
                className="block text-sm font-semibold leading-7 text-gray-900"
              >
               Repeat Password
              </label>
              <input
               value={repeatPassword}
               onChange={(e) => setRepeatPassword(e.target.value)}
                type="password"
                id="password"
                className="mt-1 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-9 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                required=""
              />
            </div>



            <button
            
              type="submit"
              className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
            >
              <span> Register</span>
            </button>
            <input type="hidden" name="remember" value="true" />
            <p className="mt-8 text-center">
            
            </p>
          </form>
          </div>
        <footer className="mb-6 ">
          <div className="space-y-2 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
      
            <span>¿Ya Tienes Una Cuenta?</span>
                <button className="bg-slate-900 text-white p-2 rounded-lg " >
                  <Link to={"/Login"} className="text-white text-decoration-none">Iniciar Sesion </Link>
                  <span aria-hidden="true">→</span>
                  </button>
                
             
      
          </div>
        </footer>
      </div>
      </div>
   
    
    </>
  );
};
