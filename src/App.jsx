import React, { useState } from "react";

// Estilos inyectados

const styles = `
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f0f2f5;
}
.app {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  max-width: 1400px;
  margin: auto;
}
.main { flex: 3; min-width: 300px; }
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px 20px;
  background: #4f46e5;
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.header h1 { margin: 0; font-size: 1.8rem; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
.card {
  background: white;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}
.card:hover { transform: translateY(-8px); box-shadow: 0 10px 20px rgba(0,0,0,0.12); }
.card img { width: 100%; height: 180px; object-fit: cover; border-radius: 12px; }
.card h3 { margin: 12px 0 5px; font-size: 1.1rem; color: #333; }
.card p { margin: 0; color: #555; font-weight: bold; }
.card button {
  margin-top: auto;
  padding: 10px;
  border: none;
  border-radius: 12px;
  background: #6366f1;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s, box-shadow 0.3s, transform 0.2s;
}
.card button:hover {
  background: #4f46e5;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: translateY(-2px);
}

/* ----------------- Carrito flotante compacto ----------------- */
.sidebar {
  position: sticky;
  top: 20px;
  flex: 1;
  min-width: 260px;
  max-width: 300px;
  max-height: 80vh;
  overflow-y: auto;
  background: linear-gradient(145deg, #ffffff, #f9f9f9);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}
.sidebar::-webkit-scrollbar {
  width: 6px;
}
.sidebar::-webkit-scrollbar-thumb {
  background: rgba(100,100,100,0.3);
  border-radius: 3px;
}
.sidebar h2 {
  margin-top: 0;
  font-size: 1.5rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.cart-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  padding: 6px;
  border-radius: 10px;
  background: #f5f5f5;
  transition: background 0.2s;
}
.cart-item:hover { background: #e5e7eb; }
.cart-item img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.08);
}
.cart-item-info div { font-weight: 600; color: #111827; font-size: 0.9rem; }
.cart-item-info small { font-weight: 400; color: #6b7280; font-size: 0.8rem; }
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
}
.quantity-controls button {
  padding: 2px 6px;
  border: none;
  border-radius: 6px;
  background: #4f46e5;
  color: white;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.2s, transform 0.2s;
}
.quantity-controls button:hover {
  background: #3730a3;
  transform: scale(1.1);
}
.cart-remove {
  background: #ef4444;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  transition: background 0.2s, transform 0.2s;
}
.cart-remove:hover { background: #dc2626; transform: scale(1.1); }
.cart-total {
  margin-top: 15px;
  font-weight: bold;
  font-size: 1.3rem;
  text-align: right;
  color: #111827;
}

@media(max-width:768px){
  .app { flex-direction: column; }
  .sidebar {
    position: relative;
    width: 100%;
    max-height: none;
    order: 2;
    margin-top: 20px;
  }
  .main { order: 1; }
}
`;


function injectStyles() {
  if (document.getElementById("app-styles")) return;
  const s = document.createElement("style");
  s.id = "app-styles";
  s.innerText = styles;
  document.head.appendChild(s);
}

// ✅ Productos con links de Pexels que funcionan
const PRODUCTS = [
  { id: 1, title: "Auriculares X1", price: 79.99, image: "https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg" },
  { id: 2, title: "Teclado Pro", price: 129.99, image: "https://images.pexels.com/photos/414515/pexels-photo-414515.jpeg" },
  { id: 3, title: "Cámara 24MP", price: 399.0, image: "https://images.pexels.com/photos/340874/pexels-photo-340874.jpeg" },
  { id: 4, title: "Monitor 27'' 4K", price: 299.99, image: "https://images.pexels.com/photos/267614/pexels-photo-267614.jpeg" },
  { id: 5, title: "Mouse Gamer RGB", price: 49.99, image: "https://images.pexels.com/photos/392009/pexels-photo-392009.jpeg" },
  { id: 6, title: "Consola Retro", price: 199.99, image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg" },
  { id: 7, title: "Smartphone Z5", price: 699.99, image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg" },
  { id: 8, title: "Smartwatch Fit", price: 149.99, image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg" },
  { id: 9, title: "Tablet Pro 11''", price: 499.99, image: "https://cdn.pixabay.com/photo/2017/08/30/01/07/tablet-2695562_1280.jpg" },
  { id: 10, title: "Silla Gamer", price: 259.99, image: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg" },
];

function Header({ cartCount }) {
  return (
    <div className="header">
      <h1>Mi Tienda</h1>
      <div>Carrito ({cartCount})</div>
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.title} onError={(e)=>{e.target.src="https://via.placeholder.com/300x160?text=Producto";}} />
      <h3>{product.title}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => onAdd(product)}>Añadir</button>
    </div>
  );
}

function SidebarCart({ cart, onRemove }) {
  const total = cart.reduce((sum, p) => sum + p.price, 0);
  return (
    <div className="sidebar">
      <h2>🛒 Mi Carrito</h2>
      {cart.length === 0 ? <p>No hay productos aún</p> :
        <>
          {cart.map((item, idx) => (
            <div key={idx} className="cart-item">
              <img src={item.image} alt={item.title}/>
              <div className="cart-item-info">
                <div>{item.title}</div>
                <small>${item.price.toFixed(2)}</small>
              </div>
              <button className="cart-remove" onClick={()=>onRemove(idx)}>✕</button>
            </div>
          ))}
          <div className="cart-total">Total: ${total.toFixed(2)}</div>
        </>
      }
    </div>
  );
}

export default function App() {
  injectStyles();
  const [cart, setCart] = useState([]);
  const addToCart = (p) => setCart(prev=>[...prev,p]);
  const removeFromCart = (i) => setCart(prev=>prev.filter((_,index)=>index!==i));

  return (
    <div className="app">
      <div className="main">
        <Header cartCount={cart.length}/>
        <div className="products-grid">
          {PRODUCTS.map(p=><ProductCard key={p.id} product={p} onAdd={addToCart}/>)}
        </div>
      </div>
      <SidebarCart cart={cart} onRemove={removeFromCart}/>
    </div>
  );
}
