import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    CheckSquare,
    LayoutDashboard,
    ListTodo,
    LogOut,
    UserRound,
    X,
} from "lucide-react";
import { logout } from "../../redux/slices/authSlice";
import Button from "../common/Button";

const navItems = [
    { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { label: "My Tasks", path: "/tasks", icon: ListTodo },
    { label: "Profile", path: "/profile", icon: UserRound },
];

const Sidebar = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        onClose?.();
        navigate("/login", { replace: true });
    };

    return (
        <>
            <button
                type="button"
                aria-label="Close navigation"
                onClick={onClose}
                className={`fixed inset-0 z-40 bg-slate-950/40 transition-opacity lg:hidden ${isOpen ? "visible opacity-100" : "invisible opacity-0"
                    }`}
            />

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0`}
            >
                <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                            <CheckSquare size={22} />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight text-slate-900">
                                TaskFlow
                            </h1>
                            <p className="text-xs text-slate-500">Stay on track</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close menu"
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                    >
                        <X size={19} />
                    </button>
                </div>

                <div className="px-4 pt-7">
                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Workspace
                    </p>

                    <nav className="space-y-1">
                        {navItems.map(({ label, path, icon: Icon }) => (
                            <NavLink
                                key={path}
                                to={path}
                                end={path === "/dashboard"}
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive
                                        ? "bg-indigo-50 text-indigo-700"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`
                                }
                            >
                                <Icon size={19} />
                                <span>{label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto border-t border-slate-100 p-4">
                    <div className="mb-4 rounded-xl bg-slate-50 p-3">
                        <p className="text-sm font-semibold text-slate-800">
                            Keep going!
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            Small steps every day lead to big progress.
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="w-full justify-start"
                    >
                        <LogOut size={17} />
                        Sign Out
                    </Button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;