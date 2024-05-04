
import { useState, useEffect } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../assets/config/firebase";
import { VscSearch } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { TERipple, TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody } from "tw-elements-react";
import { FcLike } from "react-icons/fc";
import { GiShoppingCart } from "react-icons/gi";
import { IoMdHeartEmpty } from "react-icons/io";
import estrella from "../assets/img/estrella.png";
import reloj from "../assets/img/reloj.png";
import vector from "../assets/img/vect.png";
import flecha from "../assets/img/flecha.png";
import color from "../assets/img/colors.png";
import { useAuth } from "../auth/AuthProvider";

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export const SearchComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { favorites, user } = useAuth();
  const firestore = getFirestore(app);

  useEffect(() => {
    const debouncedSearch = debounce(async (term) => {
      setIsLoading(true);
      try {
        const searchTermCaseInsensitive = term.trim().toUpperCase();
        if (searchTermCaseInsensitive === '') {
          setSearchResults([]);
          return;
        }

        const collection1Query = query(
          collection(firestore, "productos"),
          where("name", ">=", searchTermCaseInsensitive),
          where("name", "<=", searchTermCaseInsensitive + '\uf8ff')
        );

        const collection2Query = query(
          collection(firestore, "Coleccion"),
          where("name", ">=", searchTermCaseInsensitive),
          where("name", "<=", searchTermCaseInsensitive + '\uf8ff')
        );

        const [collection1Snapshot, collection2Snapshot] = await Promise.all([
          getDocs(collection1Query),
          getDocs(collection2Query)
        ]);

        const collection1Results = collection1Snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const collection2Results = collection2Snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        const combinedResults = [...collection1Results, ...collection2Results];
        setSearchResults(combinedResults);
      } catch (error) {
        setError(error.message);
        console.error("Error al buscar:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    debouncedSearch(searchTerm);
  }, [searchTerm, firestore]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setShowModal(true); // Mostrar el modal al empezar a escribir
  };

  return (
    <div>
      <TERipple rippleColor="black">
        <form className="mt-10">
          <input
            type="text"
            onClick={() => setShowModal(true)}
            className="md:w-[23rem] ms-28 md:h-10 md:rounded-lg   md:border max-sm:hidden border-teal-300  drop-shadow-2xl  md:p-4 md:shadow-2xl max-sm:w-[8rem] max-sm:shadow-2xl max-sm:h-6  "
            placeholder="Buscar...."
          
          />
          <button
            className="text-black max-sm:max-sm:mt-4 max-sm:max-sm:ms-2 mx-sm:flex max-sm:max-sm:justify-center max-sm:max-sm:items-center max-sm:max-sm:hidden  "
          >
            <VscSearch
              style={{
                position: "relative",
                fontSize: "22px",
                marginLeft: -30,
                marginBottom: -4,
              }}
            />
          </button>
        </form>
      </TERipple>

      <TEModal show={showModal} setShow={setShowModal} scrollable>
        <TEModalDialog size="fullscreen">
          <TEModalContent>
            <TEModalHeader>
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200 ">
                <div className="flex items-end mx-20 gap-4">
                  <img
                    src="https://github.com/mattyas2/E-commerce/blob/main/src/assets/logotipo.jpeg?raw=true"
                    className="w-[120px] max-sm:w-[70px] "
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onInput={handleSearch}
                    placeholder="Que buscas...?"
                    className="w-[1000px] h-12 border-b-2 border-b-cyan-400 "
                  />
                </div>
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none me-16"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-16 w-16"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </TEModalHeader>
            <TEModalBody>
              {searchTerm && (
                <div className="px-10 text-center flex justify-start flex-wrap gap-4 leading-[5rem] h-screen  text-xs">
                  {isLoading ? (
                    <p>Cargando...</p>
                  ) : error ? (
                    <p>Error al buscar</p>
                  ) : searchResults.length === 0 ? (
                    <p>No se encontraron resultados</p>
                  ) : (
                    <div className="px-10 text-center flex justify-start flex-wrap gap-3 leading-[1rem] h-screen mt-10 text-xs">
                      <div className="absolute z-50 max-sm:max-sm:w-[150px] bg-white flex gap-24 max-sm:max-sm:mt-8 ">
                        <div className="relative z-50 w-full flex flex-wrap justify-center mx-6 mb-4">
                          {searchResults.length > 0 &&
                            searchResults.map((producto) => (
                              <>
                                <div className="relative mx-4 mt-2 rounded-xl shadow-2xl w-[250px] flex flex-col justify-center bg-purple-50 mb-9 h-[390px]" key={producto.id}>
                                  <Link to={`/ProductsPage/${producto.id}`}>
                                    <img className="w-full h-[220px]" src={producto.imagen} alt="" />
                                  </Link>
                                  <div>
                                    <div className="flex items-center mt-3 justify-between me-3 mx-6">
                                      <h6 className="text-cyan-500 text-xs font-bold">{producto.name}</h6>
                                      <div className="bg-slate-900 text-white flex items-center gap-1 w-16 h-5">
                                        <div>
                                          <img src={estrella} alt="" />
                                        </div>{" "}
                                        4.9
                                      </div>
                                    </div>

                                    <div className="flex gap-5 my-2 mt-1 mx-4">
                                      <h3 className="text-green-700 font-bold">
                                        ${producto.precio}.000
                                      </h3>
                                    </div>
                                    <img className="mx-4" src={color} alt="" />
                                    <div className="flex gap-3 mt-2 mx-4 mb-4">
                                      <div className="flex gap-1 items-center">
                                        <img src={reloj} alt="" />
                                        Pro...
                                      </div>
                                      <div className="flex gap-1 items-center">
                                        <img src={vector} alt="" />
                                        64 Las...
                                      </div>
                                      <div className="flex gap-1 items-center">
                                        <img src={reloj} alt="" />
                                        22 hr..
                                      </div>
                                    </div>
                                    {user ? (
  <div className="flex items-center justify-center gap-3 border-sky-500 border rounded-full w-[120px]
    p-2 mb-14 mx-16 ">
    <p className="text-cyan-500 font-bold flex gap-7 ">
      <Link>
        {" "}
        {favorites.find(
          (item) => item.id === producto.id
        ) ? (
          <FcLike
            FaBeer
            size={26}
            
          />
        ) : (
          <IoMdHeartEmpty
            FaBeer
            size={26}
         
          />
        )}
      </Link>{" "}
      <Link>
        {" "}
        <span
        
        >
          <GiShoppingCart FaBeer size={26} className="" />
        </span>
      </Link>{" "}
    </p>
    <img src={flecha} alt="" />
  </div>
) : (
  <div className="flex items-center justify-center gap-3 border-sky-500 border rounded-full w-[100px] mt-3 p-2 mx-16 ">
    <p className="text-cyan-500 font-bold flex gap-7 ">
      <Link>
        {" "}
        {favorites.find(
          (item) => item.id === producto.id
        ) ? (
          <FcLike
            FaBeer
            size={26}
      
         
          />
        ) : (
          <IoMdHeartEmpty
            FaBeer
            size={26}
        
          />
        )}
      </Link>{" "}
      <Link>
        {" "}
        <span
   
        >
          <GiShoppingCart FaBeer size={26} className="" />
        </span>
      </Link>{" "}
    </p>
    <img src={flecha} alt="" />
  </div>
)}
                                  </div>
                                </div>
                              </>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
};






