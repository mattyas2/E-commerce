/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

export const ShopingCar =()=>{
  const [active, setActive] = useState(false);

  const {
    productos, setProductos,
    total, setTotal,
  countProducts, setCountProducts,
  } = useAuth();

  const onAddProduct = product => {
		if (productos.find(item => item.id !== product.id)) {
			const products = productos.map(item =>
				item.id === product.id
					? { ...item}
					: item
			);
			setTotal(total + product.precio * product.cantidad);
			setCountProducts(countProducts +  1);
			return setProductos([...products]);
		}

		setTotal(total + product.precio * product.cantidad);
		setCountProducts(countProducts + 1);
		setProductos([...productos, product]);
	};
  const onDeleteProduct = product => {
		const results = productos.filter(
			item => item.id !== product.id
		);

		setTotal(total - product.precio * product.cantidad);
		setCountProducts(countProducts - 1);
		setProductos(results);
	};

	const onCleanCart = () => {
		setProductos([]);
		setTotal(0);
		setCountProducts(0);
	};

  return(
    <>
     
              <div>

           
    
    <h1>Tienda</h1>

			<div className='container-icon'>
				<div
					className='container-cart-icon flex justify-between'
					onClick={() => setActive(!active)}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='icon-cart'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
						/>
					</svg>
					<div className='count-products'>
						<span id='contador-productos'>{countProducts}</span>
					</div>
				</div>

				<div
					className={`container-cart-products ${
						active ? '' : 'hidden-cart'
					}`}
				>
					{productos.length ? (
						<>
							<div className='row-product'>
								{productos.map(product => (
									<div className='cart-product' key={product.id}>
										<div className='info-cart-product'>
											<span className='cantidad-producto-carrito'>
												{product.cantidad}
											</span>
											<p className='titulo-producto-carrito'>
												{product.name}
											</p>
											<span className='precio-producto-carrito'>
												${product.precio}
											</span>
										</div>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='icon-close'
											onClick={() => onDeleteProduct({product})}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									</div>
								))}
							</div>

							<div className='cart-total'>
								<h3>Total:</h3>
								<span className='total-pagar'>${total}</span>
							</div>

							<button className='btn-clear-all' onClick={onCleanCart}>
								Vaciar Carrito
							</button>
						</>
					) : (
						<p className='cart-empty '>El carrito está vacío</p>
					)}
				</div>
			</div>
		
    	<div className='container-items'>
			{productos.map(product => (
				<div className='item' key={product.id}>
						<img  src={product.imagen} alt={product.name} />
					<div className='info-product'>
						<h2>{product.name}</h2>
						<p className='price'>${product.precio}</p>
						<button onClick={() => onAddProduct(product)}>
							Añadir al carrito
						</button>
					</div>
				</div>
			))}
		</div>
    </div>
    </>
  )
}

 
