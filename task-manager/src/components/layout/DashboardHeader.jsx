import { Menu, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const DashboardHeader = ({ onMenuClick }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const displayName =
        user?.name || user?.fullName || user?.email?.split("@")[0] || "User";

    const initials = displayName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("");

    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open navigation"
                    className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
                >
                    <Menu size={22} />
                </button>

                <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-500">Workspace</p>
                    <p className="truncate text-sm font-semibold text-slate-900 sm:text-base">
                        Task Manager
                    </p>
                </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
                <Button
                    size="sm"
                    onClick={() => navigate("/tasks")}
                    className="hidden sm:inline-flex"
                >
                    <Plus size={17} />
                    View Tasks
                </Button>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                    {initials || "U"}
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;