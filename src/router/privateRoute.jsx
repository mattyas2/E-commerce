/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom"


export const PrivateRoute = ()=>{
const [isAuht, setIsAuht] = useState(false)

return isAuht ? <Outlet/> : <Navigate to={"/"}/>
}