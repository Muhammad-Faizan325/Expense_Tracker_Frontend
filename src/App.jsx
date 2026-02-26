import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import Home from "./pages/Dasboard/home";
import Income from "./pages/Dasboard/income";
import Expense from "./pages/Dasboard/expense";
import { ProtectedRoute, PublicRoute } from "./components/AuthWrapper/authWrapper";
import { Toaster } from "react-hot-toast"; // Ye zaroori hai container ke liye

function App() {
  return (
    <Router>
      {/* 1. Toaster Container: Ye custom design ko handle karega */}
      <Toaster 
        position="top-right" 
        reverseOrder={false} 
        gutter={8}
        toastOptions={{
          duration: 3000,
        }}
      />

      <Routes>
        {/* Auth / Public Routes */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        } />

        {/* Dashboard / Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/income" element={
          <ProtectedRoute>
            <Income />
          </ProtectedRoute>
        } />
        <Route path="/expense" element={
          <ProtectedRoute>
            <Expense />
          </ProtectedRoute>
        } />

        {/* Root Logic */}
        <Route path="/" element={<Root />} />
        
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

const Root = () => {
  const { token } = useSelector((state) => state.auth);
  return token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

export default App;