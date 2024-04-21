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
 
  collection,

  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Alert } from "../components/Alert"


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
    return signInWithPopup(auth, googleProvider);
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
    onAuthStateChanged(auth,  (currentUser) => {
      const usuario = currentUser.uid;
      setUser(currentUser);
      setUidUsuario(usuario);
      if (currentUser) {
         setDoc(doc(db, 'usuarios', currentUser.uid), {
          Carrito: [],
          Favoritos: [],
        });
      }
    });
  }, []);

  const onAddProduct = async (producto) => {
    if(user){
      const userRef = doc(db, "usuarios", uidUsuario);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const Carrito = userData.Carrito || [];
  
        // agregarlo
        const updatedCarrito = [...Carrito, { ...producto, cantidad: 1,}];
          await setDoc(userRef, { Carrito: updatedCarrito }, { merge: true });
          console.log("Producto agregado al carrito correctamente");
        
        }
      

    }
      
   
    
  
    }

  

 


  const addToFavorites = async (productId) => {
    if(
      user
    ){

      const userRef = doc(db, "usuarios",user.uid);
      const userDoc = await getDoc(userRef)
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const favorites = userData.Favoritos || []
          // El producto no está en favoritos, agregarlo
          const updatedFavorites = [...favorites, productId];
          await setDoc(userRef, { Favoritos: updatedFavorites},{merge:true})
          console.log(<Alert message="producto agregado a favoritos" duration={3000} />);
        
        
      

    }
  
      }
    
  
    }
   
    const onDeleteFavort = async (productId)=>{
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
   
  return onDeleteFavort,favorites
  }



  // const onDeleteProduct = async (productId) => {
  //   const productoEliminado = carrito.find((item) => item.id === productId);
  //   const nuevoCarrito = carrito.filter(
  //     (producto) => producto.id !== productId
  //   );

  //   setCarrito(nuevoCarrito);
  //   setTotal(
  //     total - productoEliminado.data.precio * productoEliminado.cantidad
  //   );
  //   setCountProducts(countProducts - productoEliminado.cantidad);
  // };

  // const onCleanCart = () => {
  //   setCarrito([]);
  //   setTotal(0);
  //   setCountProducts(0);
  // };

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
        favorites,setFavorites,
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
