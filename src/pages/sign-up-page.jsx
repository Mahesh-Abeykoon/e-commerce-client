import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import  fetchWithAuthorization  from '../api/fetch-with-authorization';
import { END_POINTS } from '../api/end-points';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: (userData) => fetchWithAuthorization({
      path: END_POINTS.AUTH.SIGN_UP,
      method: 'POST',
      body: userData,
    }),
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error) => {
      console.error('Sign up error:', error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp({ name, email, password, role });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="customer">Customer</option>
        <option value="seller">Seller</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignUpPage;