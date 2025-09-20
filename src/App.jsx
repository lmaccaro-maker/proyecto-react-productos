import React, { useState } from 'react';

// Estilos básicos inyectados para no depender de CSS externo
const styles = `
body{margin:0;font-family:sans-serif;background:#f6f7fb;}
.app{padding:20px;max-width:1200px;margin:auto;}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
.products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:20px;}
.card{background:#fff;border-radius:12px;padding:15px;box-shadow:0 4px 12px rgba(0,0,0,0.05);transition:0.3s;}
.card:hover{transform:translateY(-5px);box-shadow:0 8px 20px rgba(0,0,0,0.1);}
.card img{width:100%;height:160px;object-fit:cover;border-radius:8px;background:#eee;}
.card h3{margin:10px 0 5px;font-size:16px;}
.card p{margin:0;color:#555;}
.card button{margin-top:10px;padding:8px 12px;border:none;border-radius:8px;background:#4f46e5;color:white;cursor:pointer;}
`;

function injectStyles(){if(document.getElementById('app-styles'))return;const s=document.createElement('style');s.id='app-styles';s.innerText=styles;document.head.appendChild(s);}

const PRODUCTS=[
  {id:1,title:'Auriculares X1',price:79.99,image:'https://cdn.pixabay.com/photo/2017/05/10/19/05/headphones-2304098_1280.jpg',category:'Audio'},
  {id:2,title:'Teclado Pro',price:129.99,image:'https://cdn.pixabay.com/photo/2016/11/19/14/00/keyboard-1838984_1280.jpg',category:'Accesorios'},
  {id:3,title:'Cámara 24MP',price:399.0,image:'https://cdn.pixabay.com/photo/2015/01/21/14/14/camera-606824_1280.jpg',category:'Cámaras'}
];

function Header({cartCount}){
  return <div className='header'><h1>Mi Tienda</h1><div>Carrito ({cartCount})</div></div>;
}

function ProductCard({product,onAdd}){
  return (
    <div className='card'>
      <img src={product.image} alt={product.title} onError={(e)=>{e.target.src='https://via.placeholder.com/300x160?text=Producto';}} />
      <h3>{product.title}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={()=>onAdd(product)}>Añadir</button>
    </div>
  );
}

export default function App(){
  injectStyles();
  const [cart,setCart] = useState([]);
  const addToCart = (p)=>setCart(prev=>[...prev,p]);

  return (
    <div className='app'>
      <Header cartCount={cart.length} />
      <div className='products-grid'>
        {PRODUCTS.map(p=><ProductCard key={p.id} product={p} onAdd={addToCart} />)}
      </div>
    </div>
  );
}