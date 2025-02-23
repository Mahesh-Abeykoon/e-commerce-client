import PropTypes from 'prop-types';
import { useAddItemToCart } from '../hooks/use-cart';
import { useAuth } from '../contexts/auth.context';

const ItemList = ({ items }) => {
  const { user } = useAuth();
  const addItemToCartMutation = useAddItemToCart();

  const handleAddToCart = (productId) => {
    addItemToCartMutation.mutate({ productId, quantity: 1 });
  };

  return (
    <ul>
      {items.map((item) => (
        <li key={item._id}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          <p>Stock: {item.stock}</p>
          {user?.role === 'customer' && (
          <button onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
        )}
        </li>
      ))}
    </ul>
  );
};

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default ItemList;