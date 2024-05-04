
import { Navbar } from "./Navbar";
import Avatar from '../assets/img/avatar.png'


import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../assets/config/firebase";
import { Link } from "react-router-dom";
import { VscChevronRight } from "react-icons/vsc";


export const Profile = ()=>{
    const [user,setUser] =useState([])
const [photo,setPhoto] = useState([])
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
            setPhoto(currentUser.photoURL);
             setUser(currentUser)
          } else {
            setPhoto(null);
            
          }
        });
    
        return () => unsubscribe();
      }, []);
    
    return (
    <>
    <Navbar/>
    <div className="text-xs bg-teal-50 flex items-center  ">
        <div className="flex items-center max-sm:mb-6">
        <Link to="/" className=" flex items-center ms-10 me-2 ">Home </Link>  <VscChevronRight size={14}/> <p className="mx-2">{user.displayName || user.email}</p>

        </div>
    </div>
   
    <div className="flex justify-center items-center mb-10 max-sm:flex max-sm:flex-col bg-teal-50">
    <div
    className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-2 bg-white shadow-xl rounded-lg text-gray-900">
    <div   className="rounded-t-lg h-32 overflow-hidden">
        <img   className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'/>
    </div>
    <div   className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img   className="object-cover object-center h-32" src={  photo || Avatar }  alt='Woman looking front'/>
    </div>
    <div   className="text-center mt-2">
        <h2   className="font-semibold">{user.displayName}</h2>
        <p   className="text-gray-500">{user.email}</p>
    </div>
    <ul   className="py-4 mt-2 text-gray-700 flex items-center justify-around">
        <li   className="flex flex-col items-center justify-around">
            <svg   className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <div>2k</div>
        </li>
        <li   className="flex flex-col items-center justify-between">
            <svg   className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                    d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
            </svg>
            <div>10k</div>
        </li>
        <li   className="flex flex-col items-center justify-around">
            <svg   className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                    d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
            </svg>
            <div>15</div>
        </li>

     
    </ul>
   
   
    <div   className="p-4 border-t mx-8 mt-2">
      
       
    </div>
</div>
<div className="flex justify-center">
    <div className="my-10 lg:w-[600px] lg:h-[390px] md:h-[14rem] max-sm:hidden xs:h-[10rem] ">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16258064.903562967!2d-85.03484505958286!3d5.819740540153444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e15a43aae1594a3%3A0x9a0d9a04eff2a340!2sColombia!5e0!3m2!1ses-419!2sco!4v1713928385693!5m2!1ses-419!2sco" width="500" height="400"  allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" ></iframe>

     </div>
    </div>

    </div>


    </>
    )
}