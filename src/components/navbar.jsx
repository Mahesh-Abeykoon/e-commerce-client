import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/auth.context';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/home">Home</Link>
      {user && (
        <>
          <Link to="/profile">Profile</Link>
          {user.role === 'admin' && <Link to="/admin">Admin</Link>}
          {user.role === 'seller' && <Link to="/seller">Seller</Link>}
          {user.role === 'customer' && <Link to="/cart">Cart</Link>}
          <button onClick={logout}>Logout</button>
        </>
      )}
      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;