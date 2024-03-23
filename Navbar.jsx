/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import { Outlet,Link, useLocation, useNavigate, Navigate} from 'react-router-dom'
import { Dashboard } from './src/pages'



export const Navbar = ()=>{
    const {state} = useLocation()
    const Navegate = useNavigate()
    
    const onlogout = ()=>{
    Navigate(Dashboard,{
    replace: true,
})

    }

    return(
        <>
     

       
        <header className="header bg-sky-600">
           <Link className='logo' to='/'> lOGO </Link> 
     
       
{ state?.logged ? (
 <div className='user bg-slate-900'>
 <span className='username'> {state?.name} </span>
 <button className='boton' onClick={onlogout}> cerrar sesion</button>

</div>

) : ( <nav>
    <Link className="inicia sesion" to='/Login'> <button className="boton"> Iniciar Sesion</button> </Link>
    <Link className="register"  to='/Register'> Registrarse </Link>
</nav>
)
   
}

       
        </header>
     
<Outlet/>

        </>
    )

}
export default Navbar