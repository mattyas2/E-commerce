// ResetPassword.js

import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { app } from "../assets/config/firebase";
import { Navbar } from './Navbar';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState('');

  const auth = getAuth(app);

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetSent(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
<>

<Navbar/>
    <div className=' flex justify-start bg-teal-50 items-center flex-col  h-screen'>
      <h1 className='text-center text-2xl font-bold mt-5 mb-5'>¿Has olvidado tu contraseña?</h1>

      <h4 className='text-start col-5 max-sm:w-[90%] max-sm:mx-4 text-sm'>Por favor introduce tu dirección de correo electrónico para recibir un enlace de restablecimiento de contraseña.</h4>
      {resetSent ? (
        <p className='mt-12 text-md font-bold'>Se ha enviado un email de restablecimiento de contraseña a <span className='text-red-300'> {email}.</span></p>
      ) : (
        <>
         <div className="mb-6 flex  flex-col mt-4 max-sm:w-[90%] max-sm:mx-4">
                <label
                  type="text"
                  className="flex items-center justify-start"
                  id="email"
                >
                  Email <p className="text-red-600">*</p>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo Electrónico"
                 value={email}
                onChange={(e) => setEmail(e.target.value)}
                  className="border h-12 w-[570px] max-sm:w-[270px]"
                  required=""
                  autoComplete="off"
                />

                
              </div>
          <h2 className='text-sm col-5 text-start mb-4 max-sm:w-[90%] max-sm:mx-4'>Este sitio está protegido por reCAPTCHA y se aplican la Política de Privacidad y Terminos de Servicio de Google.</h2>
         <h4 className='text-red-400 text-sm col-5 text-start max-sm:w-[90%] max-sm:mx-4'>* Campos obligatorios</h4>
         <div className='col-5 flex justify-start mt-4 max-sm:w-[90%] max-sm:mx-4'> 
         <button className='border p-3 bg-cyan-300 text-sm hover:bg-cyan-500 text-white font-bold max-sm:w-full ' onClick={handleResetPassword}>Restablecer mi contraseña</button>
         </div>
         
          {error && <p>Error: {error}</p>}
        </>
      )}
    </div>
    </>
  );
};


