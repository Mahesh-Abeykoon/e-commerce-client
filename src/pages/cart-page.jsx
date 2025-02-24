import { useCart, useClearCart } from '../hooks/use-cart';
import Cart from '../components/cart';
import Loading from '../components/loading'
import Error from '../components/error'

const CartPage = () => {
  const { data: cart, isLoading, error } = useCart();
  const clearCartMutation = useClearCart();

  const handleClearCart = () => {
    clearCartMutation.mutate();
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <div>
      <h1>Cart</h1>
      <Cart cart={cart} />
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
};

export default CartPage;