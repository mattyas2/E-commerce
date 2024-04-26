/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { app } from "../assets/config/firebase"

import {
  getAuth

} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useAuth } from "../auth/AuthProvider";



const auth = getAuth(app);


export const Register = () => {

  const { signup} = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
    displayName:"",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password,user.displayName);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  
   
  return (
    <>
    <Navbar/>
  
      <div className="bg-teal-50 h-[540px] max-sm:h-[600px] ">

       <div className="flex justify-center w-full max-sm:flex max-sm:w-full max-sm:justify-center max-sm:flex-col ">
        
        <div className="w-[40%] mt-32 ms-28 text-5xl  max-sm:mt-4 max-sm:text-2xl max-sm:ms-0 max-sm:w-[100%] ">
        <div className="flex justify-center items-center font-bold sm:flex sm:justify-center">Registrarte</div>
            <div className="flex justify-center font-bold">Es rápido y fácil.</div>
    </div>
      
      <div className="w-[70%] ms-[-300px] max-sm:w-[100%] max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:ms-0">
      <div className="relative flex flex-1 flex-col items-center justify-center  pt-4 text-black max-sm:flex max-sm:justify-center ">
     
          <form onSubmit={ handleSubmit} className="w-full max-w-sm ">

          <div className="mb-6 max-sm:mb-3">
              
              <label
                type="text"
                className="block text-sm font-semibold leading-6 text-gray-900"
                id="usuario"
                >
                  
                Usuario:
              </label>
              <input
             name="displayName"
                onChange={(e) => setUser({ ...user, displayName: e.target.value })}
                type="text"
                id="displayName"
                className="mt-1 appearance-none text-slate-900 bg-white rounded-md block w-full px-2 h-10 shadow-sm max-sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
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
                name="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
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
             name="password"
             onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                id="password"
                className="mt-1 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-9 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                required=""
              />
            </div>
            <div className="mb-6">
              <label
                tabIndex="repeatPaswword"
                className="block text-sm font-semibold leading-7 text-gray-900"
              >
               Repeat Password
              </label>
              <input
              
               onChange={(e) => setUser({ ...user, repeatpassword: e.target.value })}
                type="password"
                id="password"
                name="repeatPaswword"
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
        <footer className="mb-6 max-sm-mb-10 ">
          <div className="space-y-2 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0 ">
      
            <span className="max-sm:mx-4">¿Ya Tienes Una Cuenta?</span>
                <button className="bg-slate-900 text-white p-2 rounded-lg " >
                  <Link to={"/Login"} className="text-white text-decoration-none">Iniciar Sesion </Link>
                  <span aria-hidden="true">→</span>
                  </button>
                
             
      
          </div>
        </footer>
      </div>
      </div>
      
      </div>
   
    
    </>
  );
};
