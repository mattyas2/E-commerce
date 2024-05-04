/* eslint-disable no-unused-vars */
// import { useSelector } from 'react-redux'

import { useEffect, useState } from "react";
import { Navbar } from "../pages/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { app } from "../assets/config/firebase";
import { useAuth } from "../auth/AuthProvider";
import { Breadcrumbs } from "./RutasActual";
import Alert from "./Alert";

export const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    nombre: "",
    direccion: "",
    telefono: "",
    observaciones: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [compraExitosa, setCompraExitosa] = useState(false); // Nuevo estado

  const db = getFirestore(app);
  const auth = getAuth();

  const { user, carrito, setCarrito, totalQuantity1, setTotalQuantity, total,alertMessages, alertType, showAlerta, handleShowAlert} =
    useAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Obtener datos del usuario
        const userRef = doc(db, "usuarios", user.uid);
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
        // Usuario sin iniciar sesión
      }
    });
  }, []);

  const onDeleteProduct = async (productId) => {
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

    return onDeleteProduct, carrito;
  };

  const realizarCompra = async (formData) => {
    try {
      setLoading(true);

      // Obtener la referencia de la colección de pedidos
      const pedidosRef = collection(db, "pedidos");

      // Crear un nuevo documento de pedido
      const newPedidoRef = await addDoc(pedidosRef, {
        total: `${total}.000`,
        userId: user.uid,
        items: carrito,
        totalQuantity: totalQuantity1,
        timestamp: Timestamp.now(),
        // Datos del formulario
        email: formData.email,
        nombre: formData.nombre,
        direccion: formData.direccion,
        telefono: formData.telefono,
        observaciones: formData.observaciones,
      });

      // Limpiar el carrito después de la compra
      await updateDoc(doc(db, "usuarios", user.uid), { Carrito: [] });
      setCarrito([]); // Actualizar estado local del carrito
      setTotalQuantity(0); // Resetear la cantidad total

      setCompraExitosa(true);
      // Limpiar el formulario después de la compra
      limpiarFormulario();

      handleShowAlert("Pedido realizado con éxito", "success");
      // Mostrar mensaje de confirmación al usuario
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      // Manejar errores, como mostrar un mensaje al usuario
      handleShowAlert(
        "Hubo un error al procesar tu compra. Por favor, intenta de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Limpiar el error al cambiar el valor
    }));
  };

  const handleCheckout = () => {
    const errors = {};
    // Validar que todos los campos estén llenos
    for (const key in formData) {
      if (formData[key].trim() === "") {
        errors[key] = (
          <div className="text-red-500 text-xs"> *este campo es requerido </div>
        );
      }
    }
    // Si hay errores, mostrarlos y no realizar la compra
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; // Detener la ejecución si hay errores
    }
    // No hay errores, realizar la compra
    realizarCompra(formData);
  };

  const limpiarFormulario = () => {
    setFormData({
      email: "",
      nombre: "",
      direccion: "",
      telefono: "",
      observaciones: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardHolder: "",
    });
    setFormErrors({}); // Limpiar también los errores del formulario
  };
  return (
    <>
      <Navbar />
      { showAlerta && (
        <Alert message={alertMessages}  type={alertType}/>
      )}
      <Breadcrumbs />
      <div>
        {compraExitosa ? (
          <div className="h-[500px] flex justify-center items-center m-auto bg-teal-50">
            <h2 className="text-7xl max-sm:text-3xl">
              ¡Gracias por tu compra! ....
            </h2>
            {/* Aquí podrías mostrar información adicional sobre la compra */}
          </div>
        ) : (
          <div className="flex justify-center max-sm:flex max-sm:flex-wrap max-sm:justify-center bg-teal-50">
            <div className="col-md-4 col-lg-4 flex flex-col justify-center mx-10 items-center mb-10 ">
              <div className="text-center font-bold text-2xl flex  justify-center gap-20 mb-10 max-sm:justify-start items-center max-sm:gap-16 max-sm:mx-4">
             
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
                                    <button
                                      className="mr-10 "
                                      onClick={() =>
                                        onDeleteProduct(product.id)
                                      }
                                    >
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

              <div className="max-sm:w-[80%] max-sm:mb-10">
                <form className="needs-validation">
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label htmlFor="firstName" className="form-label">
                        First name
                      </label>
                      <input
                        className="form-control"
                        id="FirstName"
                        placeholder=""
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                      />
                      {formErrors.nombre && (
                        <span className="error">{formErrors.nombre}</span>
                      )}
                    </div>

                    <div className="col-sm-6">
                      <label htmlFor="lastName" className="form-label">
                        Telefono:
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="form-control"
                        id="lastName"
                        placeholder=""
                        required
                      />
                      {formErrors.telefono && (
                        <span className="error">{formErrors.telefono}</span>
                      )}
                    </div>

                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-control"
                        id="email"
                        placeholder="you@example.com"
                      />
                      {formErrors.email && (
                        <span className="error">{formErrors.email}</span>
                      )}
                    </div>

                    <div className="col-12">
                      <label htmlFor="direccion" className="form-label">
                        Address
                      </label>
                      <input
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control"
                        id="direccion"
                        placeholder="1234 Main St"
                        required=""
                      />
                      {formErrors.direccion && (
                        <span className="error">{formErrors.direccion}</span>
                      )}
                    </div>
                  </div>

                  <hr className="my-4" />
                  <div className="flex gap-6 mb-4 ">
                    <div>
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        required
                        className="form-control"
                      />
                      {formErrors.cardNumber && (
                        <span className="error">{formErrors.cardNumber}</span>
                      )}
                    </div>
                    <div>
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength="3"
                        required
                        className="form-control"
                      />
                      {formErrors.cvv && (
                        <span className="error">{formErrors.cvv}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-6 mb-4">
                    <div>
                      <label htmlFor="expiryDate">Expiry Date</label>
                      <input
                        name="expiryDate"
                        type="date"
                        id="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                        className="form-control"
                      />
                      {formErrors.expiryDate && (
                        <span className="error">{formErrors.expiryDate}</span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="cardHolder">Card Holder</label>
                      <input
                        type="text"
                        name="cardHolder"
                        id="cardHolder"
                        value={formData.cardHolder}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        className="form-control"
                      />
                      {formErrors.cardHolder && (
                        <span className="error">{formErrors.cardHolder}</span>
                      )}
                    </div>
                  </div>
                  <hr className="my-4" />

                  <div className="col-12">
                    <label htmlFor="observaciones" className="form-label">
                      Observaciones:
                    </label>
                    <textarea
                      name="observaciones"
                      className="form-control"
                      value={formData.observaciones}
                      onChange={handleInputChange}
                    />
                    {formErrors.observaciones && (
                      <span className="error">{formErrors.observaciones}</span>
                    )}
                  </div>

                  <hr className="my-4" />

                  <button
                    className="w-100 btn btn-primary btn-lg bg-teal-400"
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    Continue to checkout
                  </button>
                  {loading && <p>Procesando la compra...</p>}
                </form>
              </div>
            </div>

            <ul className="list-group mb-10 w-[30%] mx-10 mt-10 max-sm:w-[100%] max-sm:hidden ">
              <h4 className="flex justify-content-center gap-10 align-items-center mb-3">
                <span className="text-primary text-2xl">Your cart</span>
                <span className="badge bg-primary rounded-pill text-xl">
                  {totalQuantity1}
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
                                <button
                                  className="mr-10 "
                                  onClick={() => onDeleteProduct(product.id)}
                                >
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
        )}
      </div>
    </>
  );
};

export default Checkout;
