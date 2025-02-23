import { useCart, useClearCart } from '../hooks/use-cart';
import Cart from '../components/cart';

const CartPage = () => {
  const { data: cart, isLoading, error } = useCart();
  const clearCartMutation = useClearCart();

  const handleClearCart = () => {
    clearCartMutation.mutate();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Cart</h1>
      <Cart cart={cart} />
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
};

export default CartPage;