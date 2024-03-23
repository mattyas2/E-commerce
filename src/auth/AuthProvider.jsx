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
    return <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, startSession, endSession, getSession,isLogin}}>{children}</AuthContext.Provider>

} 

export const useAuth = ()=> useContext(AuthContext);




