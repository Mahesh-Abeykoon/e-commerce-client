import { useItems } from '../hooks/use-items';
import { useAuth } from '../contexts/auth.context';
import ItemList from '../components/item-list';
import Navbar from '../components/navbar';
import Loading from '../components/loading';
import Error from '../components/error';

const HomePage = () => {
  const { user } = useAuth();
  const { data: items, isLoading, error } = useItems();

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Welcome Section */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Welcome, {user?.name || 'Guest'}!
        </h1>
        <p className="text-gray-600">Role: {user?.role}</p>
      </div>

      {/* Items Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Available Items
        </h2>
        <ItemList items={items} />
      </div>

      {/* Role-Specific Actions */}
      {user?.role === 'admin' && (
        <div className="container mx-auto px-4 py-8">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            Admin Actions
          </h3>
          <p className="text-gray-600">You have access to the admin dashboard.</p>
          <a
            href="/admin"
            className="mt-2 inline-block rounded-md bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700"
          >
            Admin Dashboard
          </a>
        </div>
      )}

      {user?.role === 'seller' && (
        <div className="container mx-auto px-4 py-8">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            Seller Actions
          </h3>
          <p className="text-gray-600">You can manage your items.</p>
          <a
            href="/seller"
            className="mt-2 inline-block rounded-md bg-green-600 px-4 py-2 text-white transition-all hover:bg-green-700"
          >
            Seller Dashboard
          </a>
        </div>
      )}

      {user?.role === 'customer' && (
        <div className="container mx-auto px-4 py-8">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            Your Cart
          </h3>
          <a
            href="/cart"
            className="mt-2 inline-block rounded-md bg-purple-600 px-4 py-2 text-white transition-all hover:bg-purple-700"
          >
            View Cart
          </a>
        </div>
      )}
    </div>
  );
};

export default HomePage;