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
  
      <div className="bg-teal-50 h-screen max-sm:h-[120vh]">

       <div className="flex justify-center w-full max-sm:flex max-sm:w-full max-sm:justify-center max-sm:flex-col ">
        
        <div className="w-[40%] mt-32 ms-28 text-5xl  max-sm:mt-4 max-sm:text-2xl max-sm:ms-0 max-sm:w-[100%] ">
        <div className="flex justify-center items-center font-bold sm:flex sm:justify-center">Registrarte</div>
            <div className="flex justify-center font-bold">Es rápido y fácil.</div>
    </div>
      
      <div className="w-[70%] ms-[-300px] max-sm:w-[100%] max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:ms-0">
      <div className="relative flex flex-1 flex-col items-center justify-center  pt-4 text-black max-sm:flex max-sm:justify-center ">
     
          <form onSubmit={ handleSubmit} className="w-full max-w-sm ">

          <div className="mb-4 max-sm:mb-3">
              
              <label
                type="text"
                className="block text-sm font-semibold leading-6 text-gray-900"
                id="usuario"
                >
                  
                Username <span className="text-red-500">*</span>
              </label>
              <input
             name="displayName"
                onChange={(e) => setUser({ ...user, displayName: e.target.value })}
                type="text"
                id="displayName"
                className="border h-12 w-[400px]  max-sm:w-[270px]"
                required="" autoComplete="off"
              />
            </div>
            <div className="mb-4">
              
              <label
                type="text"
                className="block text-sm font-semibold leading-6 text-gray-900"
                id="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="email"
                id="email"
                className="border h-12 w-[400px] max-sm:w-[270px]"
                required
                 autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <label
                tabIndex="password"
                className="block text-sm font-semibold leading-7 text-gray-900"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
             name="password"
             onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                id="password"
                className="border h-12 w-[400px] max-sm:w-[270px]"
                required
              />
            </div>
            <div className="mb-4">
              <label
                tabIndex="repeatPaswword"
                className="block text-sm font-semibold leading-7 text-gray-900"
              >
               Repeat Password <span className="text-red-500">*</span>
              </label>
              <input
              
               onChange={(e) => setUser({ ...user, repeatpassword: e.target.value })}
                type="password"
                id="password"
                name="repeatPaswword"
                className="border h-12 w-[400px] max-sm:w-[270px]" 
                required
              />
<p className="text-red-500 text-xs">* Campos obligatorios</p>

            </div>



            <button
            
              type="submit"
              className='border p-3 bg-cyan-300 text-sm hover:bg-cyan-500 w-[200px] text-white font-bold max-sm:w-full '
            >
              <span> Register</span>
            </button>
            <input type="hidden" name="remember" value="true" />
            <p className="mt-8 text-center">
            
            </p>
          </form>
          </div>
        <footer className="mt-12 max-sm:mt-0 col-12  ">
          <div className=" flex justify-center gap-4 max-sm:flex-col max-sm:mb-6">
      
            <span className="max-sm:mx-4 flex justify-center items-center">¿Ya Tienes Una Cuenta?</span>
                <button className='border p-2.5 bg-cyan-300 text-sm hover:bg-cyan-500 text-white font-bold max-sm:w-[86%] max-sm:mx-6  gap-2 flex justify-center items-center w-[200px] '>
                  <Link className="max-sm:w-full" to={"/Login"} >Iniciar Sesion </Link>
                  <span className="text-2xl flex justify-center items-center" aria-hidden="true">→</span>
                  </button>
                
             
      
          </div>
        </footer>
      </div>
      </div>
      
      </div>
   
    
    </>
  );
};
