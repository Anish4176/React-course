import { Link } from "react-router";
import "./checkout-header.css";
import "./Checkout.css";
import { centsToDollar } from "../utils/money";
import { useEffect, useState } from "react";
import "dayjs";
import dayjs from "dayjs";
const Checkout = ({ cart }) => {
  const [deliveryOptions, setdeliveryOptions] = useState([]);
  const [paymentSummary, setpaymentSummary] = useState(null);
  useEffect(() => {
    fetch("/api/delivery-options?expand=estimatedDeliveryTime").then(
      (response) => {
        response.json().then((data) => {
          setdeliveryOptions(data);
        });
      }
    );
    fetch("/api/payment-summary").then((response) => {
      response.json().then((data) => {
        setpaymentSummary(data);
      });
    });
  }, []);

  return (
    <>
      <title>Checkout</title>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              3 items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {deliveryOptions.length > 0 &&
              cart.map((cartItem) => {
                const deliveryDate = deliveryOptions.find((deliveryOption) => {
                  return deliveryOption.id == cartItem.deliveryOptionId;
                });
                return (
                  <div key={cartItem.productId} className="cart-item-container">
                    <div className="delivery-date">
                      Delivery date:{" "}
                      {dayjs(deliveryDate.estimatedDeliveryTimeMs).format(
                        "dddd, MMMM D"
                      )}
                    </div>

                    <div className="cart-item-details-grid">
                      <img
                        className="product-image"
                        src={`${cartItem.product.image}`}
                      />

                      <div className="cart-item-details">
                        <div className="product-name">
                          {cartItem.product.name}
                        </div>
                        <div className="product-price">
                          {centsToDollar(cartItem.product.priceCents)}{" "}
                        </div>
                        <div className="product-quantity">
                          <span>
                            Quantity:{" "}
                            <span className="quantity-label">
                              {cartItem.quantity}{" "}
                            </span>
                          </span>
                          <span className="update-quantity-link link-primary">
                            Update
                          </span>
                          <span className="delete-quantity-link link-primary">
                            Delete
                          </span>
                        </div>
                      </div>

                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        {deliveryOptions.map((deliveryItem) => {
                          return (
                            <div
                              key={deliveryItem.id}
                              className="delivery-option"
                            >
                              <input
                                type="radio"
                                checked={
                                  deliveryItem.id == cartItem.deliveryOptionId
                                }
                                className="delivery-option-input"
                                name={`delivery-option-${cartItem.productId}`}
                              />
                              <div>
                                <div className="delivery-option-date">
                                  {dayjs(
                                    deliveryItem.estimatedDeliveryTimeMs
                                  ).format("dddd, MMMM D")}
                                </div>
                                <div className="delivery-option-price">
                                  {deliveryItem.priceCents > 0
                                    ? `${centsToDollar(
                                        deliveryItem.priceCents
                                      )}- Shipping`
                                    : "FREE Shipping"}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>
            {paymentSummary && (
              <>
                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">
                    {centsToDollar(paymentSummary.productCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                     {centsToDollar(paymentSummary.shippingCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {centsToDollar(paymentSummary.totalCostBeforeTaxCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                     {centsToDollar(paymentSummary.taxCents)}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {centsToDollar(paymentSummary.totalCostCents)}
                  </div>
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
