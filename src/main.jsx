/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import {createBrowserRouter,RouterProvider } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Home } from './pages/Home.jsx'
// import { Register } from './pages/Register.jsx'
// import Login from './pages/Login.jsx'
// import { ResetPassword } from './pages/resetpassword.jsx'
// import { Dashboard } from './pages/Dashboard.jsx'
// import { PrivateRoute } from './router/privateRoute.jsx'
// import { AuthProvider } from './auth/AuthProvider.jsx'

// export const router = createBrowserRouter([
//   {
//     path:"/",
//     element:<Home/>
//   },
//   {
//     path:"/Register",
//     element:<Register/>
//   },
//   {
//     path:"/Login",
//     element:<Login/>
//   },
//   {
//     path:"/Reset",
//     element:<ResetPassword/>
//   }, {
//     path:"/",
//     element:<PrivateRoute/>,
//     children:[
//       {
//         path:"/Dashboard",
//         element:<Dashboard/>
//       }
//     ]
//   },
// ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

<App/>

  
  </React.StrictMode>,
)
