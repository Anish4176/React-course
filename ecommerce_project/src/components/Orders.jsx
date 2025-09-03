import { Link } from "react-router";
import "./Orders.css";
import Header from "./shared/Header";
import { Fragment, useEffect, useState } from "react";
import { centsToDollar } from "../utils/money";
import dayjs from "dayjs";

const Orders = ({ cart }) => {
  const [orders, setorders] = useState([]);
  useEffect(() => {
    fetch("/api/orders?expand=products").then((response) => {
      response.json().then((data) => {
        setorders(data);
      });
    });
  }, []);

  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders &&
            orders.map((order) => {
              return (
                <div key={order.id} className="order-container">
                  <div className="order-header">
                    <div className="order-header-left-section">
                      <div className="order-date">
                        <div className="order-header-label">Order Placed:</div>
                        <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                      </div>
                      <div className="order-total">
                        <div className="order-header-label">Total:</div>
                        <div>{centsToDollar(order.totalCostCents)}</div>
                      </div>
                    </div>

                    <div className="order-header-right-section">
                      <div className="order-header-label">Order ID:</div>
                      <div>{order.id}</div>
                    </div>
                  </div>

                  <div className="order-details-grid">
                    {order.products.map((item) => {
                      return (
                        <Fragment key={item.productId}>
                          <div className="product-image-container">
                            <img src={`${item.product.image}`} />
                          </div>

                          <div className="product-details">
                            <div className="product-name">
                              {item.product.name}
                            </div>
                            <div className="product-delivery-date">
                              Arriving on:{" "}
                              {dayjs(item.estimatedDeliveryTimeMs).format(
                                "MMMM D"
                              )}
                            </div>
                            <div className="product-quantity">
                              Quantity:{item.quantity}{" "}
                            </div>
                            <button className="buy-again-button button-primary">
                              <img
                                className="buy-again-icon"
                                src="images/icons/buy-again.png"
                              />
                              <span className="buy-again-message">
                                Add to Cart
                              </span>
                            </button>
                          </div>

                          <div className="product-actions">
                            <Link to="/tracking">
                              <button className="track-package-button button-secondary">
                                Track package
                              </button>
                            </Link>
                          </div>
                        </Fragment>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Orders;
