import { useItems } from '../hooks/use-items';
import { useAuth } from '../contexts/auth.context';
import ItemList from '../components/item-list';
import Navbar from '../components/navbar';
import Loading from '../components/loading'
import Error from '../components/error'

const HomePage = () => {
  const { user } = useAuth();
  const { data: items, isLoading, error } = useItems(); 

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      {/* Navbar for navigation */}
      <Navbar />

      {/* Welcome message */}
      <h1>Welcome, {user?.name || 'Guest'}!</h1>
      <p>Role: {user?.role}</p>

      {/* Display items */}
      <h2>Available Items</h2>
      <ItemList items={items} />

      {/* Conditional rendering based on user role */}
      {user?.role === 'admin' && (
        <div>
          <h3>Admin Actions</h3>
          <p>You have access to the admin dashboard.</p>
          <a href="/admin">Admin Dashboard</a>
        </div>
      )}

      {user?.role === 'seller' && (
        <div>
          <h3>Seller Actions</h3>
          <p>You can manage your items.</p>
          <a href="/seller">Seller Dashboard</a>
        </div>
      )}

      {/* Cart link (only for customers) */}
      {user?.role === 'customer' && (
        <div>
          <h3>Your Cart</h3>
          <a href="/cart">View Cart</a>
        </div>
      )}

    </div>
  );
};

export default HomePage;