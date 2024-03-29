/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { app } from "../assets/config/firebase"
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged 
} from "firebase/auth";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { PrivateRoute } from "../router/privateRoute";
import {signInUser} from "../assets/config/firebase"
import { useAuth } from "../auth/AuthProvider";
import { Navbar } from "./Navbar";


// const Auth = useAuth()

// if(Auth.isAuthenticated){
//   return <Navigate to={"/Dashboard"}/>
// }
const auth = getAuth(app);

export const Login = () => {



  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setIsAuthenticated,startSession} = useAuth();


  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);




  const funcionAutenticacion = async (e) => {
    e.preventDefault();

    // validate the inputs
    if (!email || !password) {
      setError("Please enter your username and password.");
      return;
    }

    // clear the errors
    setError("");
    try {
      let loginResponse = await signInUser(email, password);
      startSession(loginResponse.user);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("error al iniciar sesion", error.message);
      setError(error.message);
      alert('el correo o la contraseña son incorrectos')
    }
  }
     
  //     await signInWithEmailAndPassword(auth, email, password);
  //     console.log("Inicio de sesion exitoso");
  //     setLoading(true);

 
    
  //   } catch (error) {
  //     console.error("error al iniciar sesion", error);
  //   }finally {
  //     setLoading(false);
  //   }
  // };

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     setLoading(true);
  //     await signInWithEmailAndPassword(auth, email, password);

    

  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
 



 

  return (
    <>
    <Navbar/>
      <div className="bg-[url(https://th.bing.com/th/id/R.88f09f198d34fa9bc6d646de6bf95498?rik=U%2fJtP2ewwiNptg&pid=ImgRaw&r=0)] bg-cover h-[534px]">
      <div className="max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">

      

      <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12 text-black ">
          <form onSubmit={funcionAutenticacion}  className="w-full max-w-sm ">

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
                className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
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
                className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full max-sm:w-full px-3 h-9 shadow-sm max-sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                required=""
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
            >
              <span>Sign in to account</span>
            </button>
            <input type="hidden" name="remember" value="true" />
            <p className="mt-8 text-center">
              <a
                
                className="text-sm hover:underline cursor-pointer font-bold text-white"
              >
               <button className="text-black">
                <Link to={"/Reset"} className="text-black text-decoration-none"> Forgot password?</Link></button>
               
               
              </a>
            </p>
          </form>
          </div>
        <footer className="relative shrink-0 shadow-">
          <div className="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0">
            <span>¿ No Tienes Una Cuenta ?</span>
<button className="bg-slate-900 p-2 rounded-xl">
                <Link className="text-decoration-none text-white " to={"/Register"}>Crear Cuenta </Link>
                <span className="text-white" aria-hidden="true">→</span>
                </button>
             
         
          </div>
        </footer>
      </div>
      </div>
    </>
  );
};
export default Login