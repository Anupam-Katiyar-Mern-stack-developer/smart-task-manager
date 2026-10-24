import { useState } from "react";
import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/common/Input";
import PasswordInput from "../../components/common/PasswordInput";
import Button from "../../components/common/Button";
import { loginUser } from "../../redux/thunks/authThunk";
import { clearAuthError } from "../../redux/slices/authSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (error) dispatch(clearAuthError());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email.trim() || !formData.password) return;

        try {
            await dispatch(loginUser({
                email: formData.email.trim(),
                password: formData.password,
            })).unwrap();

            navigate("/dashboard", { replace: true });
        } catch {
            // Error handled by authSlice
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
                        <span className="text-xl font-bold">T</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Sign in to manage your tasks
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        icon={Mail}
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                    />

                    <PasswordInput
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                    />

                    {error && (
                        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <Button type="submit" loading={loading} className="w-full">
                        Sign In
                    </Button>
                </form>

                <p className="mt-7 text-center text-sm text-slate-500">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;