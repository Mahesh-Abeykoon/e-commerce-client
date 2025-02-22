import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login-page/login";
import HomePage from "./pages/login-page/home-page"; // Create a HomePage component

function App() {
  return (
    <Router>
      <div className="text-gray-700 text-3xl bg-blue-100 p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
