
import { collection, getDocs, getFirestore, query, where, } from "firebase/firestore";
import { app } from "../assets/config/firebase";
import { Tilt } from "react-tilt";
import { Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { IoMdHeartEmpty } from "react-icons/io";
import { useEffect, useState } from "react";
import { Navbar } from "../pages/Navbar";






export const Deporte = ()=>{
    const [coleccion, setColeccion] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [coleccion1, setColeccion1] = useState([]);
    
  useEffect(() => {

    const coleccions = async ()=>{
        
        
        const db = getFirestore(app)
        
            const citiesRef = collection(db, "productos");
            const querySnapshot = await getDocs( query(citiesRef, where("category", "==", "deporte")));
            const newImpresion = [];
            querySnapshot.forEach((doc)=>{
             newImpresion.push({ id: doc.id, data: doc.data() });
             console.log(newImpresion)
            })
            setColeccion(newImpresion);
          setLoaded(true);
              

    }
    coleccions();
}, []);
        
useEffect(() => {

  const coleccionss = async ()=>{
      const db = getFirestore(app)
          const citiesRef = collection(db, "Coleccion");
          const querySnapshot = await getDocs( query(citiesRef, where("category", "==", "deporte")));
          const newImpresion = [];
          querySnapshot.forEach((doc)=>{
           newImpresion.push({ id: doc.id, data: doc.data() });
           console.log(newImpresion)
          })
          setColeccion1(newImpresion);
        setLoaded(true);
            

  }
  coleccionss();
}, []);
    



      const defaultOptions = {
        reverse: true, // reverse the tilt direction
        max: 15, // max tilt rotation (degrees)
        perspective: 70, // Transform perspective, the lower the more extreme the tilt gets.
        scale: 1.3, // 2 = 200%, 1.5 = 150%, etc..
        speed: 100, // Speed of the enter/exit transition
        transition: true, // Set a transition on enter/exit.
        axis: null, // What axis should be disabled. Can be X or Y.
        reset: true, // If the tilt effect has to be reset on exit.
        easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
      };

return(

    <>
      <Navbar/>

<div className="text-center font-bold text-2xl">
  Deporte
</div>
<div className="flex w-[100%] gap-10 flex-wrap ">
      <div className="w-[30%]">
      {loaded &&
           coleccion.length > 0 &&
           coleccion.map((producto) => (
            <div
              className=" flex flex-col justify-center items-center mx-[50px] mt-5 mb-4 w-[80%] h-[400px] rounded-xl shadow-2xl "
              key={producto.id}
            >
              <div className="flex justify-center items-center ">
                <Tilt
                  options={defaultOptions}
                  style={{ height: 200, width: 260, marginLeft: 60 }}
                >
                  <img
                    className="w-[200px] h-[200px] "
                    src={producto.data.imagen}
                    alt=""
                  />
                </Tilt>
              </div>
              <div className="mt-1 mb-4">
                <h1 className="font-bold text-xl">{producto.data.name} </h1>
              </div>
              <div className="flex justify-between w-[100%] ">
                <div className="mx-4 mt-5">${producto.data.precio}</div>
                <div className="flex gap-2 mx-4 mt-5">
                  <Link>
                    {" "}
                    <IoMdHeartEmpty FaBeer size={26} className="" />
                  </Link>{" "}
                  <Link to="/Car">
                    {" "}
                    <GiShoppingCart FaBeer size={26} className="" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
  
<div className="w-[30%]">

{loaded &&
           coleccion1.length > 0 &&
           coleccion1.map((producto) => (
            <div
              className=" flex flex-col justify-center items-center mx-[10px] mt-5  w-[80%] h-[400px] rounded-xl shadow-2xl  "
              key={producto.id}
            >
              <div className="flex justify-center items-center">
                <Tilt
                  options={defaultOptions}
                  style={{ height: 200, width: 260, marginLeft: 60 }}
                >
                  <img
                    className="w-[200px] h-[200px] "
                    src={producto.data.imagen}
                    alt=""
                  />
                </Tilt>
              </div>
              <div className="mt-1 mb-4">
                <h1 className="font-bold text-xl">{producto.data.name} </h1>
              </div>
              <div className="flex justify-between w-[100%] ">
                <div className="mx-4 mt-5">${producto.data.precio}</div>
                <div className="flex gap-2 mx-4 mt-5">
                  <Link>
                    {" "}
                    <IoMdHeartEmpty FaBeer size={26} className="" />
                  </Link>{" "}
                  <Link to="/Car">
                    {" "}
                    <GiShoppingCart FaBeer size={26} className="" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
</div>
    </div>
    </>
)


}
