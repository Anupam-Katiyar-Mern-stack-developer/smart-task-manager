import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthInitializer from "./components/auth/AuthInitializer";
import protectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoutes";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import PublicRoute from "./routes/PublicRoutes";


const App = () => {
  return (
    <BrowserRouter>
      <AuthInitializer>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<protectedRoute />}>
            <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthInitializer>
    </BrowserRouter>
  );
};

export default App;