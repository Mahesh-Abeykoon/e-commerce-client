import PropTypes from 'prop-types';
import { useUpdateCartItemQuantity, useRemoveCartItem } from '../hooks/use-cart';

const Cart = ({ cart }) => {
  const updateItemQuantityMutation = useUpdateCartItemQuantity();
  const removeItemFromCartMutation = useRemoveCartItem();

  const handleUpdateQuantity = (productId, quantity) => {
    updateItemQuantityMutation.mutate({ productId, quantity });
  };

  const handleRemoveItem = (productId) => {
    removeItemFromCartMutation.mutate(productId);
  };

  return (
    <ul>
      {cart.items.map((item) => (
        <li key={item.productId._id}>
          <p>Name: {item.productId.name}</p>
          <p>Quantity: {item.quantity}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleUpdateQuantity(item.productId._id, Number(e.target.value))}
            min="1"
          />
          <p>Only {item?.productId?.stock} item(s) left in stock</p>
          <p>Price: ${item?.productId?.price}</p>
          <button onClick={() => handleRemoveItem(item.productId._id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
};

export default Cart;