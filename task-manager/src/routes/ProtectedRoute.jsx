
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import AIAssistant from "../components/ai/AIAssistant";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  if (loading) {
    return <Spinner fullScreen text="checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
      <AIAssistant />
    </>
  );
};

export default ProtectedRoute;
