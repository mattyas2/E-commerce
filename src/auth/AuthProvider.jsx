/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
import  { useContext,createContext,useState } from "react"
import {endSession, startSession, getSession, isLogin} from '../pages/sesion'




const AuthContext = createContext({
    isAuthenticated: false,
});

export function AuthProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState (false)
    const [productos, setProductos] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);
    const [coleccion, setColeccion] = useState([]);
    const [newProducto, setNewProducto] = useState([]);
    const [newColeccion, setNewColeccion] = useState([]);
    

    return <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, startSession, endSession, getSession,isLogin, productos,setProductos,total,setTotal,countProducts,setCountProducts, coleccion, setColeccion, newProducto, setNewProducto,setNewColeccion,newColeccion}}>{children}</AuthContext.Provider>

} 

export const useAuth = ()=> useContext(AuthContext);




