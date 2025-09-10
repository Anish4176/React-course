import axios from "axios";
import { centsToDollar } from "../utils/money";
import dayjs from "dayjs";
const DeliveryOptions = ({deliveryOptions,cartItem,loadCart}) => {
  const handleDeliveryChange=async(id)=>{
    await axios.put(`/api/cart-items/${cartItem.productId}`,{
        deliveryOptionId:id
    });
    await loadCart();
  }
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryItem) => {
        return (
          <div key={deliveryItem.id} className="delivery-option" onChange={()=>handleDeliveryChange(deliveryItem.id)} >
            <input
              type="radio"
              checked={deliveryItem.id == cartItem.deliveryOptionId}
              onChange={()=>{}}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryItem.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D"
                )}
              </div>
              <div className="delivery-option-price">
                {deliveryItem.priceCents > 0
                  ? `${centsToDollar(deliveryItem.priceCents)}- Shipping`
                  : "FREE Shipping"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DeliveryOptions;
