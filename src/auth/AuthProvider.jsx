/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,

} from "firebase/auth";
import { app, auth } from "../assets/config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Cookies from "js-cookie";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [coleccion, setColeccion] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [email, setEmail] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalQuantity1, setTotalQuantity1] = useState(0);
  const db = getFirestore(app);

  const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const userId = userCredential.user;
        const userDataRef = doc(db, "usuarios", userId.uid);
        setDoc(userDataRef, {
          Carrito: [],
          Favoritos: [],
        });
        // ...
        handleShowAlert("Cuenta creada exitosamente", "success");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
        // ..
      });
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const userId = userCredential.user;
        // ...
        const userDataRef = doc(db, "usuarios", userId.uid);
        setDoc(userDataRef, {
          Carrito: [],
          Favoritos: [],
        });
        handleShowAlert("Haz Iniciado sesion exitosamente", "success");

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);

        // ..
      });
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const userDataRef = doc(db, "usuarios", user.uid);
        setDoc(userDataRef, {
          Carrito: [],
          Favoritos: [],
        });
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        handleShowAlert("Haz Iniciado sesion exitosamente", "success");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const logout = () => {
    if (user) {
      signOut(auth);
    }
   
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        currentUser.getIdToken().then((token) => {
          Cookies.set("authToken", token, { expires: 7, secure: true });
          console.log(Cookies);
        });
      } else {
        setUser(null);
        Cookies.remove("authToken");
      }
    });

    return () => unsubscribe();
  }, []);

  const onAddProduct = async (product) => {
    if (user) {
      const userRef = doc(db, "usuarios", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const carrito = userData.Carrito || [];

        // Verificar si el producto ya está en el carrito
        const existingItem = carrito.find((item) => item.id === product.id);

        if (existingItem) {
          // Si el producto existe, aumentar la cantidad
          const updatedCartItems = carrito.map((item) => {
            if (item.id === product.id) {
              return { ...item, cantidad: item.cantidad + 1 };
            }
            return item;
          });

          await updateDoc(userRef, { Carrito: updatedCartItems });
          setCarrito(updatedCartItems);
          console.log("Cantidad del producto aumentada en el carrito.");

          const total = updatedCartItems.reduce(
            (acc, item) => acc + item.cantidad,
            0
          );
          setTotalQuantity(total);
        } else {
          // Si el producto no existe, agregarlo al carrito

          const updatedCarrito = [...carrito, { ...product, cantidad: 1 }];
          await setDoc(userRef, { Carrito: updatedCarrito }, { merge: true });
          setCarrito(updatedCarrito);
          const total = updatedCarrito.reduce(
            (acc, item) => acc + item.cantidad,
            0
          );
          setTotalQuantity(total);
          handleShowAlert("¡Producto agregado a la cesta correctamente!", "success");
        }
      } else {
        console.log("El documento de usuario no existe.");
      }
    } else {
      console.log("Usuario no autenticado.");
    }
  };

  const addToFavorites = async (productId) => {
    if (user) {
      const userRef = doc(db, "usuarios", user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const favorites = userData.Favoritos || [];
        // El producto no está en favoritos, agregarlo
        const updatedFavorites = [...favorites, productId];
        await setDoc(userRef, { Favoritos: updatedFavorites }, { merge: true });
        handleShowAlert("¡producto agregado a la lista de deseos!", "success");
      }
    }
  };

  const onDeleteFavort = async (productId) => {
    if (user) {
      // Obtener datos del usuario
      const userRef = doc(db, "usuarios", user.uid);
      await updateDoc(userRef, {
        Favoritos: favorites.filter((product) => product.id !== productId),
      });
      setFavorites(favorites.filter((product) => product.id !== productId));
      handleShowAlert("¡producto eliminado de la lista de deseos!");
    
    } else {
      // Usuario sin iniciar sesión
    }

    return onDeleteFavort, favorites;
  };

  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const newImpresion = [];
      querySnapshot.forEach((doc) => {
        newImpresion.push({ id: doc.id, data: doc.data() });
      });

      setProductos(newImpresion);
      setLoaded(true);
      console.log(newImpresion);
    };

    obtenerProductos();
  }, [db]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) return; // No hay usuario logeado

      const userRef = doc(db, "usuarios", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists) {
        const items = userDoc.data().Carrito || [];
        setCarrito(items);
        // Calcular la cantidad total al cargar los items
        const total = items.reduce((acc, item) => acc + item.cantidad, 0);
        setTotalQuantity(total);
      }
    };

    fetchCartItems();
  }, [user]);

  const increaseQuantity = async (productId) => {
    const userRef = doc(db, "usuarios", user.uid);

    // Incrementar la cantidad del producto en el carrito
    const updatedCartItems = carrito.map((item) => {
      if (item.id === productId) {
        return { ...item, cantidad: item.cantidad + 1 };
      }
      return item;
    });

    // Actualizar el documento del carrito en Firestore
    await updateDoc(userRef, { Carrito: updatedCartItems });
    setCarrito(updatedCartItems);

    // Actualizar la cantidad total
    const total = updatedCartItems.reduce(
      (acc, item) => acc + item.cantidad,
      0
    );
    setTotalQuantity(total);
  };

  const decreaseQuantity = async (productId) => {
    const userRef = doc(db, "usuarios", user.uid);
    const updatedCartItems = carrito.map((item) => {
      if (item.id === productId) {
        const newQuantity = item.cantidad - 1;
        return { ...item, cantidad: newQuantity >= 0 ? newQuantity : 0 };
      }
      return item;
    });

    await updateDoc(userRef, { Carrito: updatedCartItems });
    setCarrito(updatedCartItems);

    // Actualizar la cantidad total
    const total = updatedCartItems.reduce(
      (acc, item) => acc + item.cantidad,
      0
    );
    setTotalQuantity(total);
  };

  useEffect(() => {
    let total = 0;
    carrito.forEach((producto) => {
      total += parseFloat(producto.data.precio) * producto.cantidad;
    });
    setTotal(total);
  }, [carrito]);

  useEffect(() => {
    const totel = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    setTotalQuantity1(totel);
  }, [carrito]);

  const [alertMessages, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('error');
  const [showAlerta, setShowAlert] = useState(false);

  const handleShowAlert = (message, type = 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // Oculta la alerta después de 5 segundos
  };

  return (
    <AuthContext.Provider
      value={{
        productos,
        setProductos,
        total,
        coleccion,
        setColeccion,
        email,
        setEmail,
        signup,
        login,
        user,
        logout,
        loginWithGoogle,
        addToFavorites,
        setCarrito,
        onAddProduct,
        carrito,
        loaded,
        setLoaded,
        favorites,
        setFavorites,
        onDeleteFavort,
        increaseQuantity,
        decreaseQuantity,
        totalQuantity,
        setTotalQuantity,
        totalQuantity1, alertMessages, alertType, showAlerta, handleShowAlert
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};
