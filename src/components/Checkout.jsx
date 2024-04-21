// import { useSelector } from 'react-redux'

import { useEffect, useState } from "react";
import { Navbar } from "../pages/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "../assets/config/firebase";
import { useAuth } from "../auth/AuthProvider";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

export const Checkout = () => {
  const [total, setTotal] = useState(0);
  const db = getFirestore(app);
  const auth = getAuth();
  const {user,carrito, setCarrito} = useAuth()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Obtener datos del usuario
        const userRef = doc(db, "usuarios",user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Imprimir productos del carrito
          if (userData.Carrito) {
            userData.Carrito.forEach((productId) => {
              console.log(productId);
              setCarrito(userData.Carrito || []);
            });
          }
        }
      } else {
        console.log('error al obtener el uid del usuario')
      }
    });
  }, []);
  useEffect(() => {
    let total = 0;
    carrito.forEach((producto) => {
      total += parseFloat(producto.data.precio);
    });
    setTotal(total);
  }, [carrito]);

  const onDeleteProduct = async (productId)=>{
    if (user) {     
      // Obtener datos del usuario
      const userRef = doc(db, "usuarios", user.uid);
        await updateDoc(userRef, {
   Carrito: carrito.filter((product) => product.id !== productId),
});
 setCarrito(carrito.filter((product) => product.id !== productId));

    } else {
      // Usuario sin iniciar sesión
    }
 
return onDeleteProduct,carrito
}

  

  return (
    <>
      <Navbar />
      <div className="flex justify-center max-sm:flex max-sm:flex-wrap max-sm:justify-center bg-teal-50">
        <div className="col-md-4 col-lg-4 flex flex-col justify-center mx-10 items-center mb-10 ">
        <div className="text-center font-bold text-2xl flex  justify-center gap-20 mb-10 max-sm:justify-start items-center max-sm:gap-16 max-sm:mx-4">
<Link to="/">
<IoMdArrowRoundBack size={38} /> 
</Link>

<h4 className="mb-3 text-3xl mt-6">Billing address</h4>


    </div>
          
          <div className="md:hidden">
          <ul className="list-group mb-10  mx-10 mt-10  ">
          <h4 className="flex justify-content-center gap-10 align-items-center mb-3">
            <span className="text-primary text-2xl">Your cart</span>
            <span className="badge bg-primary rounded-pill text-xl">
              {carrito.length}
            </span>
          </h4>
          <li className="list-group-item d-flex justify-content-between  bg-teal-50 ">
            <span className="font-bold">Total (COP)</span>
            <strong>${total}.000</strong>
          </li>

          <aside className=" flex justify-center items-center w-full mt-10 col-8 ">
            <ul className="w-full ">
              <>
                <div className="row-product w-[90%] max-sm:w-[70%] ">
                  {carrito &&
                    carrito.map((product) => (
                      <>
                        <div
                          className="border w-[400px] mb-2 flex  justify-center max-sm:w-[300px] "
                          key={product.id}
                        >
                          <div className="info-cart-produc w-[100%] flex justify-evenly items-center col-12 max-sm:w-[100%] ">
                            <span className="cantidad-producto-carrito col-1 mx-4">
                              {product.cantidad}
                            </span>
                            <span className="col-2">
                              <img
                                className="w-20"
                                src={product.data.imagen}
                                alt={product.name}
                              />
                            </span>

                            <span className="precio-producto-carrito">
                              ${product.data.precio}.000
                            </span>
                            <button></button>
                          </div>
                          <div className="">
                            <button className="mr-10 " onClick={()=>onDeleteProduct(product.id)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className=" mt-2 w-8  hover:stroke-red-500 cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </>
                    ))}
                </div>
                <div className="cart-total">
                  <h3>Total: ${total}.000</h3>
                  <span className="total-pagar"></span>
                </div>
              </>
            </ul>
          </aside>
        </ul>
          </div>
<div className="max-sm:w-[80%] max-sm:mb-10">
<form className="card p-2 col-lg-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Promo code"
              />
              <button
                type="submit"
                className="btn btn-primary text-black bg-teal-400"
              >
                Enviar
              </button>
            </div>
          </form>
          <form className="needs-validation">
            <div className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder=""
                  value=""
                  required=""
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>

              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder=""
                  value=""
                  required=""
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="input-group has-validation">
                  <span className="input-group-text">@</span>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    required=""
                  />
                  <div className="invalid-feedback">
                    Your username is required.
                  </div>
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                />
                <div className="invalid-feedback">
                  Please enter a valid email address htmlFor shipping updates.
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  required=""
                />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="address2" className="form-label">
                  Address 2 <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  placeholder="Apartment or suite"
                />
              </div>

              <div className="col-md-5">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <select className="form-select" id="country" required="">
                  <option value="">Choose...</option>
                  <option>United States</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>

              <div className="col-md-4">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <select className="form-select" id="state" required="">
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>

              <div className="col-md-3">
                <label htmlFor="zip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder=""
                  required=""
                />
                <div className="invalid-feedback">Zip code required.</div>
              </div>
            </div>

            <hr className="my-4" />

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="same-address"
              />
              <label className="form-check-label" htmlFor="same-address">
                Shipping address is the same as my billing address
              </label>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="save-info"
              />
              <label className="form-check-label" htmlFor="save-info">
                Save this information htmlFor next time
              </label>
            </div>

            <hr className="my-4" />

            <h4 className="mb-3">Payment</h4>

            <div className="my-3">
              <div className="form-check">
                <input
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  className="form-check-input"
                  checked=""
                  required=""
                />
                <label className="form-check-label" htmlFor="credit">
                  Credit card
                </label>
              </div>
              <div className="form-check">
                <input
                  id="debit"
                  name="paymentMethod"
                  type="radio"
                  className="form-check-input"
                  required=""
                />
                <label className="form-check-label" htmlFor="debit">
                  Debit card
                </label>
              </div>
              <div className="form-check">
                <input
                  id="paypal"
                  name="paymentMethod"
                  type="radio"
                  className="form-check-input"
                  required=""
                />
                <label className="form-check-label" htmlFor="paypal">
                  PayPal
                </label>
              </div>
            </div>

            <div className="row gy-3">
              <div className="col-md-6">
                <label htmlFor="cc-name" className="form-label">
                  Name on card
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-name"
                  placeholder=""
                  required=""
                />
                <small className="text-muted">
                  Full name as displayed on card
                </small>
                <div className="invalid-feedback">Name on card is required</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="cc-number" className="form-label">
                  Credit card number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-number"
                  placeholder=""
                  required=""
                />
                <div className="invalid-feedback">
                  Credit card number is required
                </div>
              </div>

              <div className="col-md-3">
                <label htmlFor="cc-expiration" className="form-label">
                  Expiration
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-expiration"
                  placeholder=""
                  required=""
                />
                <div className="invalid-feedback">Expiration date required</div>
              </div>

              <div className="col-md-3">
                <label htmlFor="cc-cvv" className="form-label">
                  CVV
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-cvv"
                  placeholder=""
                  required=""
                />
                <div className="invalid-feedback">Security code required</div>
              </div>
            </div>

            <hr className="my-4" />

            <button
              className="w-100 btn btn-primary btn-lg bg-teal-400"
              type="submit"
            >
              Continue to checkout
            </button>
          </form>
        </div>
</div>
         

        <ul className="list-group mb-10 w-[30%] mx-10 mt-10 max-sm:w-[100%] max-sm:hidden ">
          <h4 className="flex justify-content-center gap-10 align-items-center mb-3">
            <span className="text-primary text-2xl">Your cart</span>
            <span className="badge bg-primary rounded-pill text-xl">
              {carrito.length}
            </span>
          </h4>
          <li className="list-group-item d-flex justify-content-between  bg-teal-50 ">
            <span className="font-bold">Total (COP)</span>
            <strong>${total}.000</strong>
          </li>

          <aside className=" flex justify-center items-center w-full mt-10 col-8 ">
            <ul className="w-full ">
              <>
                <div className="row-product w-[90%] max-sm:w-[70%] ">
                  {carrito &&
                    carrito.map((product) => (
                      <>
                        <div
                          className="border w-[400px] mb-2 flex  justify-center max-sm:w-[300px] "
                          key={product.id}
                        >
                          <div className="info-cart-produc w-[100%] flex justify-evenly items-center col-12 max-sm:w-[100%] ">
                            <span className="cantidad-producto-carrito col-1 mx-4">
                              {product.cantidad}
                            </span>
                            <span className="col-2">
                              <img
                                className="w-20"
                                src={product.data.imagen}
                                alt={product.name}
                              />
                            </span>

                            <span className="precio-producto-carrito">
                              ${product.data.precio}.000
                            </span>
                            <button></button>
                          </div>
                          <div className="">
                            <button className="mr-10 " onClick={()=>onDeleteProduct(product.id)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className=" mt-2 w-8 hover:stroke-red-500 cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </>
                    ))}
                </div>
                <div className="cart-total">
                  <h3>Total: ${total}.000</h3>
                  <span className="total-pagar"></span>
                </div>
              </>
            </ul>
          </aside>
        </ul>
      </div>
    </>
  );
};

export default Checkout;
