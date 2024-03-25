import { collection, doc, getDoc, getFirestore, setDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";


export const ShopingCar = () => {
  const [productos, setProductos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const db = getFirestore();

  
  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(collection(db, "Coleccion"));
      const productosData = querySnapshot.docs.map((doc) => doc.data());
      setProductos(productosData);
    };

    obtenerProductos();
  }, [db]);
  const agregarAlCarrito = async (producto) => {
    const db = getFirestore();
    const carritoRef = doc(db, "carritos", "miCarrito");
    const carritoDoc = await getDoc(carritoRef);

    if (carritoDoc.exists()) {
      // Si el carrito ya existe, actualizar los productos en el carrito
      const carritoData = carritoDoc.data();
      const nuevosProductos = [...carritoData.productos, producto];
      await setDoc(carritoRef, { productos: nuevosProductos });
      setCarrito(nuevosProductos);
    } else {
      // Si el carrito no existe, crear uno nuevo con el producto
      await setDoc(carritoRef, { productos: [producto] });
      setCarrito([producto]);
    }
 
  };   agregarAlCarrito()

  const agregarAFavoritos = async (producto) => {
    const db = getFirestore();
    const favoritosRef = doc(db, "usuarios", "miUsuario", "favoritos");
    const favoritosDoc = await getDoc(favoritosRef);

    if (favoritosDoc.exists()) {
      // Si la lista de favoritos ya existe, actualizar los productos en la lista
      const favoritosData = favoritosDoc.data();
      const nuevosFavoritos = [...favoritosData.productos, producto];
      await setDoc(favoritosRef, { productos: nuevosFavoritos });
      setFavoritos(nuevosFavoritos);
    } else {
      // Si la lista de favoritos no existe, crear una nueva con el producto
      await setDoc(favoritosRef, { productos: [producto] });
      setFavoritos([producto]);
    }
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <h2>Productos Disponibles</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <div>
               <img className="w-[100px]" src={producto.imagen}  alt="" />
            </div>
     
            {producto.name} - {producto.precio}
            <button
              onClick={() => agregarAFavoritos(producto)}
              style={{ color: favoritos.includes(producto) ? "red" : "black" }}
            >
              Me gusta
            </button>
          </li>
        ))}
      </ul>
      <h2>Favoritos</h2>
      <ul>
        {favoritos.map((producto) => (
          <li key={producto.id}>
            {producto.name} - {producto.precio}
          </li>
        ))}
      </ul>
      

      <h2>Carrito</h2>
      <ul>
        {carrito.map((producto) => (
          <li key={producto.id}>
            {producto.name} - {producto.precio}
          </li>
        ))}
      </ul>
      </div>
  );
};