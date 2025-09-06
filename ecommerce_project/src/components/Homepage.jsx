import Header from "./shared/Header";
import "./Homepage.css";
import { useEffect, useState } from "react";
import Product from "./Product";
const Homepage = ({ cart, loadCart }) => {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      let response = await fetch("/api/products");
      let data = await response.json();
      setproducts(data);
    }
    fetchProducts();
  }, []);
  return (
    <>
      <Header cart={cart} />
      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return (
              <Product key={product.id} product={product} loadCart={loadCart} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Homepage;
