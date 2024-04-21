import { FaFacebook, FaInstagramSquare, FaWhatsappSquare } from "react-icons/fa"
import { Link } from "react-router-dom"

export const Footer =()=>{

    return(
        <>
        
        <div className="pie de pagina h-[50vh] w-full max-sm:h-[90vh] flex justify-evenly mt-[-35px]  bg-teal-400 max-sm:flex max-sm:justify-evenly  max-sm:gap-4 max-sm:flex-wrap text-black" >
            <div className="max-sm:mx-4 max-sm:w-[40%] max-sm:h-[5%] w-[20%]  "  >

              <div className=" mt-20 font-mono font-bold max-sm:mt-4  flex" > 
            <p className="text-6xl max-sm:text-4xl"  style={{ background: 'linear-gradient(to right, red, blue)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> Mr</p> <p className="text-4xl mt-14 mb-10"  style={{ background: 'linear-gradient(to right, red, blue)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mattyas</p>
              </div>
          <div className="flex gap-4">
          <div className="flex ">
                <Link to="https://www.facebook.com/Ferney03">
                  <FaFacebook size={40} />
                </Link>
              </div>
              <div>
                <Link to="https://www.instagram.com/mattyasaldana/">
                  <FaInstagramSquare size={40} />
                </Link>
              </div>
              <div>
                <Link to="https://web.whatsapp.com/">
                  <FaWhatsappSquare size={40} />
                </Link>
              </div>
          </div>
             
            </div>

            <div className="max-sm:mx-4 max-sm:w-[30%] max-sm:h-[15%] text-black " >
              <div className="mt-20 max-sm:mt-4 font-bold text-black" >
                PRODUCTOS
              </div>
              <div >Accesorios</div>
              <div>Hogar</div>
              <div>Electronica</div>
              <div>Tazas</div>
              <div>Viajes</div>
              <div>Regalos</div>
              <div>Novedades</div>
              <div>Top Ventas</div>
            </div>

            <div className="max-sm:mx-4 max-sm:w-[45%]   text-black">
              <div className="mt-20 max-sm:mt-0 text-black font-bold">
                INFORMACION
              </div>
              <div>Condiciones de compra</div>
              <div>Gastos de envio</div>
              <div>Preguntas Frecuentes</div>
              <div>Politica de Privacidad</div>
              <div>Terminos Y Condiciones</div>
            </div>

            <div className="max-sm:mx-4 max-sm:w-[30%]   text-black">
              <div className="mt-20 max-sm:mt-0 text-black font-bold">
                Acceso Tiendas
              </div>
              <div></div>
            </div>
          </div>
        
        </>
    )
}