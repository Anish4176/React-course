// import { useState } from "react"
import Header from "./shared/Header";
import "./Homepage.css";
import { products } from "../data/products";
const Homepage = () => {
  return (
    <>
      <Header />
      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            const { id, image, name, rating, priceCents } = product;
            return (
              <div key={id} className="product-container">
                <div className="product-image-container">
                  <img className="product-image" src={image} />
                </div>

                <div className="product-name limit-text-to-2-lines">{name}</div>

                <div className="product-rating-container">
                  <img
                    className="product-rating-stars"
                    src={`images/ratings/rating-${rating.stars * 10}.png`}
                  />
                  <div className="product-rating-count link-primary">
                    {rating.count}
                  </div>
                </div>

                <div className="product-price">
                  ${(priceCents / 100).toFixed(2)}
                </div>

                <div className="product-quantity-container">
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="product-spacer"></div>

                <div className="added-to-cart">
                  <img src="images/icons/checkmark.png" />
                  Added
                </div>

                <button className="add-to-cart-button button-primary">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Homepage;
