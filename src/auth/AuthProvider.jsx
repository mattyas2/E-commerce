/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
  useRef,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  FacebookAuthProvider,
} from "firebase/auth";
import { app, auth } from "../assets/config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [productos, setProductos] = useState([]);

  const [countProducts, setCountProducts] = useState(0);
  const [coleccion, setColeccion] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [email, setEmail] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [user, setUser] = useState();
  const [uidUsuario, setUidUsuario] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const userId = userCredential.user;
        const userDataRef = doc(db, 'usuarios', userId.uid);
        setDoc(userDataRef, {
         Carrito: [],
         Favoritos: []
       });
        // ...
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
        const userDataRef = doc(db, 'usuarios', userId.uid);
         setDoc(userDataRef, {
          Carrito: [],
          Favoritos: []
        });
        console.log(userId);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);

        // ..
      });
  };
  const loginWithFacebook = () => {
    const FacebookProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, FacebookProvider);
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
       const userDataRef = doc(db, 'usuarios', user.uid);
         setDoc(userDataRef, {
          Carrito: [],
          Favoritos: []
        });
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
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
    console.log("has cerrado la sesion");
  };

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);
  const db = getFirestore(app);

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
    
    });

    return () => unsubscribe();
  }, []);


  const onAddProduct = async (item) => {
    if (user) {
      const userRef = doc(db, "usuarios", user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const Carrito = userData.Carrito || [];

        // agregarlo
        const updatedCarrito = [...Carrito, { ...item, cantidad: 1 }];
        await setDoc(userRef, { Carrito: updatedCarrito }, { merge: true });
        console.log("Producto agregado al carrito correctamente");
      }
    
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
        console.log();
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

  return (
    <AuthContext.Provider
      value={{
        productos,
        setProductos,

        countProducts,
        setCountProducts,
        coleccion,
        setColeccion,
        email,
        setEmail,
        signup,
        login,
        user,
        logout,
        loginWithGoogle,
        resetPassword,
        loginWithFacebook,
        addToFavorites,
        setCarrito,
        onAddProduct,
        uidUsuario,
        carrito,
        loaded,
        setLoaded,
        favorites,
        setFavorites,
        onDeleteFavort,
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
