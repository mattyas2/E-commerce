/* eslint-disable react/prop-types */


// export const Alert = ({ message }) => {
//   return (

    
// <div className=" mt-5 flex items-center justify-between p-5 leading-normal text-red-600 bg-red-100 rounded-lg" role="alert">
// <p>{message}</p>

// <svg  className="inline w-4 h-4 fill-current ml-2 hover:opacity-80 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//   <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM359.5 133.7c-10.11-8.578-25.28-7.297-33.83 2.828L256 218.8L186.3 136.5C177.8 126.4 162.6 125.1 152.5 133.7C142.4 142.2 141.1 157.4 149.7 167.5L224.6 256l-74.88 88.5c-8.562 10.11-7.297 25.27 2.828 33.83C157 382.1 162.5 384 167.1 384c6.812 0 13.59-2.891 18.34-8.5L256 293.2l69.67 82.34C330.4 381.1 337.2 384 344 384c5.469 0 10.98-1.859 15.48-5.672c10.12-8.562 11.39-23.72 2.828-33.83L287.4 256l74.88-88.5C370.9 157.4 369.6 142.2 359.5 133.7z"/>
// </svg>
// </div>
   
//   );
// };

// export default Alert;

import { useState, useEffect } from 'react';

export const Alert = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Ocultar la alerta después de 5 segundos (5000 milisegundos)
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="mt-2 mx-4 flex items-center justify-between p-2 leading-normal text-red-600 bg-red-100 rounded-xl" role="alert"
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '97%',
      zIndex: 9999, // Establecer un z-index alto para que esté por encima de otros elementos
      display: isVisible ? 'block' : 'none',
    }}
  >
<p className='flex justify-between items-center'>{message}
<svg  className="inline w-4 h-4 fill-current ml-2 hover:opacity-80 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM359.5 133.7c-10.11-8.578-25.28-7.297-33.83 2.828L256 218.8L186.3 136.5C177.8 126.4 162.6 125.1 152.5 133.7C142.4 142.2 141.1 157.4 149.7 167.5L224.6 256l-74.88 88.5c-8.562 10.11-7.297 25.27 2.828 33.83C157 382.1 162.5 384 167.1 384c6.812 0 13.59-2.891 18.34-8.5L256 293.2l69.67 82.34C330.4 381.1 337.2 384 344 384c5.469 0 10.98-1.859 15.48-5.672c10.12-8.562 11.39-23.72 2.828-33.83L287.4 256l74.88-88.5C370.9 157.4 369.6 142.2 359.5 133.7z"/>
 </svg>
</p>

   
  </div>

  );
};

export default Alert;



