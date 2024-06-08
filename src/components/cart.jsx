import React, { useState } from "react";

function Cart({ cart }) {
  const aggregatedCart = {};

  // Aggregate quantities for each pizzaId
  cart.forEach((item) => {
    if (aggregatedCart[item.pizzaId]) {
      aggregatedCart[item.pizzaId].quantity =
        parseInt(aggregatedCart[item.pizzaId].quantity) +
        parseInt(item.pizzaQuantity);
    } else {
      aggregatedCart[item.pizzaId] = { ...item, quantity: item.pizzaQuantity };
    }
  });

  // Convert aggregated cart to JSON message
  const jsonMessage = JSON.stringify(Object.values(aggregatedCart));

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonMessage,
      });

      if (response.ok) {
        setIsOrderPlaced(true);
      } else {
        console.error("Error placing order:", await response.text());
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div class="cart">
      <h2>Basket</h2>

      {cart.length === 0 ? (
        <p>No items in basket.</p>
      ) : (
        <table class="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(aggregatedCart).map((item, index) => (
              <tr key={index}>
                <td>{item.pizzaName}</td>
                <td>x {item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!isOrderPlaced && (
        <button class="place-order-button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      )}
      {isOrderPlaced && <p>Order placed successfully!</p>}
    </div>
  );
}

export default Cart;

// import React from "react";

// const Cart = ({ cart }) => {
//   console.log(Cart type: ${typeof(cart)});
//  // console.log(Cart length: ${cart.length});
//   return (
//     <div>
//       <h2>Your Cart</h2>
//       {/* Display cart items and functionality using cart and updateCart */
//           <div>
//           <h2>Your Cart</h2>
//           {

//           // cart.length === 0 ? (
//           //   <p>Your cart is empty.</p>
//           // ) : (
//             <ul>
//               {cart.map((item, index) => (
//                 <li key={index}>
//                   {item.pizzaName} x {item.pizzaQuantity}
//                   {/* Add buttons or functionality to update or remove items here */}
//                 </li>
//               ))}
//             </ul>
//           // )
//           }
//         </div>
//       }
//     </div>
//   );
// };

// export default Cart;
