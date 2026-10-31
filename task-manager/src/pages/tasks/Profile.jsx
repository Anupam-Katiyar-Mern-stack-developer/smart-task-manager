import { useEffect } from "react";
import {
    UserRound,
    Mail,
    ShieldCheck,
    CalendarDays,
    LockKeyhole,
} from "lucide-react";

import Card from "../../components/common/Card";

import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../../redux/thunks/authThunk";

const Profile = () => {
    const dispatch = useDispatch();

    // Get data from Redux
    const { user, loading, error, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    // Fetch profile if user data is not available
    useEffect(() => {
        if (!user && isAuthenticated) {
            dispatch(getProfile());
        }
    }, [dispatch, user, isAuthenticated]);

    // Loading
    if (loading && !user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-indigo-600 font-medium">
                    Loading profile...
                </p>
            </div>
        );
    }

    // Error
    if (error && !user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    // User not found
    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-slate-500">
                    Please login to view your profile.
                </p>
            </div>
        );
    }

    // User initials
    const initials = (user.name || "User")
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-5xl space-y-6">

                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        My Profile
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        View your personal information and account details.
                    </p>
                </div>

                {/* Profile Banner */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="h-32 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-500 sm:h-40" />

                    <div className="px-5 pb-6 sm:px-8">

                        <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end">

                            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-indigo-100 text-2xl font-bold text-indigo-700 shadow-sm sm:h-28 sm:w-28">
                                {initials}
                            </div>

                            <div className="pb-1">

                                <h2 className="text-xl font-bold text-slate-900">
                                    {user.name || "User"}
                                </h2>

                                <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                                    <Mail size={14} />
                                    {user.email || "Email not available"}
                                </p>

                                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                    <ShieldCheck size={14} />
                                    Active Account
                                </span>

                            </div>

                        </div>

                    </div>
                </div>

                {/* Profile Details */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* Personal Information */}
                    <div className="lg:col-span-2">

                        <Card>

                            <div className="mb-6 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <UserRound size={20} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-slate-900">
                                        Personal Information
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        Your personal account details
                                    </p>
                                </div>

                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                {/* Name */}
                                <div>
                                    <p className="mb-2 text-sm font-medium text-slate-500">
                                        Full Name
                                    </p>

                                    <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
                                        {user.name || "Not available"}
                                    </p>
                                </div>

                                {/* Email */}
                                <div>
                                    <p className="mb-2 text-sm font-medium text-slate-500">
                                        Email Address
                                    </p>

                                    <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
                                        {user.email || "Not available"}
                                    </p>
                                </div>

                                {/* Phone */}
                                <div>
                                    <p className="mb-2 text-sm font-medium text-slate-500">
                                        Phone Number
                                    </p>

                                    <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
                                        {user.phone || "Not available"}
                                    </p>
                                </div>

                                {/* User ID */}
                                <div>
                                    <p className="mb-2 text-sm font-medium text-slate-500">
                                        User ID
                                    </p>

                                    <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
                                        {user.userId || user.id || "Not available"}
                                    </p>
                                </div>

                            </div>

                        </Card>

                    </div>

                    {/* Account Sidebar */}
                    <div className="space-y-6">

                        <Card>

                            <h3 className="font-semibold text-slate-900">
                                Account Overview
                            </h3>

                            <div className="mt-5 space-y-4">

                                <div className="flex items-start gap-3">

                                    <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                                        <CalendarDays size={18} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-slate-800">
                                            Member Since
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {user.created_at
                                                ? new Date(user.created_at).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })
                                                : "Not available"}
                                        </p>
                                    </div>

                                </div>

                                <div className="flex items-start gap-3">

                                    <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                                        <ShieldCheck size={18} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-slate-800">
                                            Account Status
                                        </p>

                                        <p className="mt-1 text-sm text-emerald-600">
                                            {isAuthenticated ? "Active" : "Inactive"}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </Card>

                        <Card>

                            <div className="flex items-start gap-3">

                                <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                                    <LockKeyhole size={20} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-slate-900">
                                        Account Security
                                    </h3>

                                    <p className="mt-1 text-sm leading-5 text-slate-500">
                                        Your account information is protected.
                                    </p>
                                </div>

                            </div>

                        </Card>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Profile;