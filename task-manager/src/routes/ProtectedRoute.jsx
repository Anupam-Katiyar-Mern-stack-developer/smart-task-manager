import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";

const protectedRoute = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    if (loading) {
        return <Spinner fullScreen text="checking authentication..." />
    }

    return isAuthenticated ? <Outlet /> :<Navigate to='/login' replace />

}

export default protectedRoute;