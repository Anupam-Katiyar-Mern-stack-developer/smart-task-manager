import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthInitializer from "./components/auth/AuthInitializer";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoutes";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import PublicRoute from "./routes/PublicRoutes";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import MyTasks from "./pages/tasks/MyTasks";
import Profile from "./pages/tasks/Profile";
import AIGenerator from "./pages/AIGenerator";


const App = () => {
  return (
    <BrowserRouter>
      <AuthInitializer>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Temporary placeholders: replace when these pages are built */}
              <Route
                path="/tasks"
                element={<MyTasks />}
              />
              <Route
                path="/profile"
                element={<Profile />}
              />
              <Route path="/ai-generator" element={<AIGenerator />} />
            </Route>
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthInitializer>
    </BrowserRouter>
  );
};

export default App;