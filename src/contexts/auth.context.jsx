import { createContext, useState, useContext, useEffect } from 'react';
import { fetchLogin, fetchLogout, fetchUserProfile } from '../api/auth';
import PropTypes from 'prop-types'; 

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetchLogin({ email, password });
      const { user, token } = response;

      // Save token to localStorage
      localStorage.setItem('accessToken', token);

      // Set user in state
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error.message);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await fetchLogout();

      // Clear token from localStorage
      localStorage.removeItem('accessToken');

      // Clear user from state
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error.message);
      throw error; 
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Fetch user profile if token exists
      fetchUserProfile()
        .then((user) => setUser(user))
        .catch(() => {
          localStorage.removeItem('accessToken');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };