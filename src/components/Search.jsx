import {  collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { app } from "../assets/config/firebase";
import { VscSearch } from "react-icons/vsc";

 export const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    useEffect(() => {
        const fetchSearchResults = async () => {
          const db = getFirestore(app);
    
          // Realizar la búsqueda solo si hay un término de búsqueda
          if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
          }
        
          const searchTermLowerCase = searchTerm.trim().toLowerCase(); // Convertir a minúsculas
          const q = query(collection(db, 'productos'), where('name', '>=', searchTermLowerCase));
        
          try {
            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log('Resultados de la consulta:', results); // Mensaje de depuración
            setSearchResults(results);
          } catch (error) {
            console.error('Error al realizar la búsqueda:', error);
          }
    
        
        };
    
        // Llamar a la función de búsqueda al cambiar el término de búsqueda
        fetchSearchResults();
      }, [searchTerm]);
    
      const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      };
    return (

        
        <div className="buscar mt-10 text-xs flex max-sm: max-sm:flex max-sm:ms-4 h-[100%]  max-sm:mt-5 max-sm:justify-end">
        <div className="max-sm:flex max-sm:justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="md:w-[20rem] md:h-8 md:border max-sm:hidden border-teal-300  drop-shadow-2xl  md:p-2 md:shadow-2xl max-sm:w-[8rem] max-sm:shadow-2xl max-sm:h-6  "
            placeholder="Buscar...."
          />
          <div className="absolute z-50 w-[320px] max-sm:w-[150px] bg-gray-200 bg-opacity-60 max-sm:mt-8">
            <div className="relative z-50  w-full">
              { searchResults.length > 0 &&
               searchResults.map((results) => (
                  <div key={results.id}>
                   
                      <div> {results.name}</div>
                      
                   
                  </div>
                ))}
            </div>
          </div>
        </div>{" "}
        <button
         
          className="text-black max-sm:mt-4 max-sm:ms-2 mx-sm:flex max-sm:justify-center max-sm:items-center max-sm:hidden "
        >
          <VscSearch
            style={{
              marginTop: -46,
              position: "relative",
              fontSize: "20px",
              marginLeft: -30,
              marginBottom: 0,
            }}
          />
        </button>
      </div>
   
    );
  };
  