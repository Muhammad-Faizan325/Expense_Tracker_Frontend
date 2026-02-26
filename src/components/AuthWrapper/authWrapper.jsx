import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../common/Loader/loader';

// Protected Route: Check if user is logged in
export const ProtectedRoute = ({ children }) => {
    const { token, loading } = useSelector((state) => state.auth);

    if (loading) return <Loader />;
    
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

// Public Route: Redirect to dashboard if already logged in
export const PublicRoute = ({ children }) => {
    const { token, loading } = useSelector((state) => state.auth);

    if (loading) return <Loader />;

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};