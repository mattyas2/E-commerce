/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {  useState } from "react";


import { Link, useNavigate } from "react-router-dom";


import { useAuth } from "../auth/AuthProvider";
import { Navbar } from "./Navbar";

import "firebase/auth";


export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle, resetPassword, loginWithFacebook, uidUsuario } =
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
  const handleFacebookSignin = async () => {
    try {
      await loginWithFacebook();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Write an email to reset password");
    try {
      await resetPassword(user.email);
      setError("We sent you an email. Check your inbox");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-[url(https://th.bing.com/th/id/R.88f09f198d34fa9bc6d646de6bf95498?rik=U%2fJtP2ewwiNptg&pid=ImgRaw&r=0)] bg-cover h-[534px]">
        <div className="max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
          <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12 text-black ">
         
            <form onSubmit={funcionAutenticacion} className="w-full max-w-sm ">
              <div className="mb-6 hidden">
                <label
                  type="text"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                  id="displayName"
                >
                  Email address
                </label>
                <input
                  type="text"
                  name="displayName"
                  id="displayName"
                  onChange={handleChange}
                  className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                  required=""
                  autoComplete="off"
                />
              </div>

              <div className="mb-6">
                <label
                  type="text"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                  id="email"
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                  required=""
                  autoComplete="off"
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
                  onChange={handleChange}
                  type="password"
                  name="password"
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
                <a className="text-sm hover:underline cursor-pointer font-bold text-white">
                  <button className="text-black">
                    <Link
                      to={"/Reset"}
                      onClick={handleResetPassword}
                      className="text-black text-decoration-none"
                    >
                      {" "}
                      Forgot password?
                    </Link>
                  </button>
                </a>
              </p>
            </form>
            <button
              onClick={handleGoogleSignin}
              className="bg-red-100 hover:bg-green-200 text-black max-sm:w-[90%] shadow rounded border-2 border-gray-300 mt-4 py-2 px-4 w-[20%]"
            >
              Google login
            </button>
            <div className="flex justify-center items-center w-full gap-4">
              <button
                onClick={handleFacebookSignin}
                className="bg-slate-50 hidden hover:bg-slate-200 text-black  shadow rounded border-2 border-gray-300 mt-4 py-2 px-4 w-[20%]"
              >
                Facebook login{" "}
                <p className="flex justify-center items-center mt-3">OR</p>
              </button>
            </div>
          </div>

          <footer className="relative shrink-0 shadow flex justify-center ">
            <div className=" text-sm text-gray-900 max-sm:flex max-sm:items-center max-sm:justify-center max-sm:mb-12 max-sm:gap-2">
              <span>¿ No Tienes Una Cuenta ?</span>
              <button className="bg-slate-900 p-2 rounded-xl">
                <Link
                  className="text-decoration-none text-white "
                  to={"/Register"}
                >
                  Crear Cuenta{" "}
                </Link>
                <span className="text-white" aria-hidden="true">
                  →
                </span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
export default Login;
