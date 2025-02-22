import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/auth.context';
import LoginPage from './pages/login-page';
import HomePage from './pages/home-page';
import SignUpPage from './pages/sign-up-page';
import ProfilePage from './pages/profile-page';
import SellerPage from './pages/seller-page';
import CartPage from './pages/cart-page';
import ProtectedRoute from './components/protected-routes';

const queryClient = new QueryClient();

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <Router>
//           <Routes>
//             <Route path="/" element={<Navigate to="/login" />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/signup" element={<SignUpPage />} />
//             <Route path="/home" element={<HomePage />} />
//             <Route path="/profile" element={<ProfilePage />} />
//             <Route path="/admin" element={<AdminPage />} />
//             <Route path="/seller" element={<SellerPage />} />
//             <Route path="/cart" element={<CartPage />} />
//           </Routes>
//         </Router>
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute roles={['customer', 'seller', 'admin']} />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/cart" element={<CartPage />} />
            </Route>

            {/* Seller-Only Routes */}
            <Route element={<ProtectedRoute roles={['seller', 'admin']} />}>
              <Route path="/seller" element={<SellerPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
