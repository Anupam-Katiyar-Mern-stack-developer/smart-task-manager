
// src/pages/Profile.jsx
import { useState } from "react";
import {
    UserRound,
    Mail,
    ShieldCheck,
    CalendarDays,
    Pencil,
    Camera,
    LockKeyhole,
    Save,
    X,
} from "lucide-react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Card from "../../components/common/Card";

const initialProfile = {
    name: "Anupam Katiyar",
    email: "anupam@example.com",
    phone: "",
    bio: "Full Stack Developer passionate about building useful applications.",
};

const Profile = () => {
    const [profile, setProfile] = useState(initialProfile);
    const [formData, setFormData] = useState(initialProfile);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleEdit = () => {
        setFormData(profile);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setFormData(profile);
        setIsEditing(false);
    };

    const handleSave = (e) => {
        e.preventDefault();
        setProfile(formData);
        setIsEditing(false);
    };

    const initials = profile.name
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
                        Manage your personal information and account settings.
                    </p>
                </div>

                {/* Profile Banner */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="h-32 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-500 sm:h-40" />
                    <div className="px-5 pb-6 sm:px-8">
                        <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
                            <div className="flex items-end gap-4">
                                <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-indigo-100 text-2xl font-bold text-indigo-700 shadow-sm sm:h-28 sm:w-28">
                                    {initials}
                                    <button
                                        type="button"
                                        aria-label="Change profile picture"
                                        className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-white transition hover:bg-indigo-700"
                                    >
                                        <Camera size={15} />
                                    </button>
                                </div>
                                <div className="pb-1">
                                    <h2 className="text-xl font-bold text-slate-900">
                                        {profile.name}
                                    </h2>
                                    <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                                        <Mail size={14} />
                                        {profile.email}
                                    </p>
                                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                        <ShieldCheck size={14} />
                                        Active Account
                                    </span>
                                </div>
                            </div>

                            {!isEditing && (
                                <Button onClick={handleEdit} variant="outline">
                                    <span className="inline-flex items-center gap-2">
                                        <Pencil size={16} />
                                        Edit Profile
                                    </span>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
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
                                        Your basic personal details
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSave} className="space-y-5">
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <Input
                                        label="Full Name"
                                        name="name"
                                        value={isEditing ? formData.name : profile.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        icon={UserRound}
                                        required
                                        disabled={!isEditing}
                                    />
                                    <Input
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={isEditing ? formData.email : profile.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        icon={Mail}
                                        required
                                        disabled={!isEditing}
                                    />
                                    <Input
                                        label="Phone Number"
                                        name="phone"
                                        type="tel"
                                        value={isEditing ? formData.phone : profile.phone}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                        disabled={!isEditing}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="bio"
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        About Me
                                    </label>
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        value={isEditing ? formData.bio : profile.bio}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        rows={4}
                                        placeholder="Write a short introduction..."
                                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                                    />
                                </div>

                                {isEditing && (
                                    <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleCancel}
                                        >
                                            <span className="inline-flex items-center gap-2">
                                                <X size={16} />
                                                Cancel
                                            </span>
                                        </Button>
                                        <Button type="submit">
                                            <span className="inline-flex items-center gap-2">
                                                <Save size={16} />
                                                Save Changes
                                            </span>
                                        </Button>
                                    </div>
                                )}
                            </form>
                        </Card>
                    </div>

                    {/* Account Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <h3 className="font-semibold text-slate-900">Account Overview</h3>
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
                                            October 2026
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
                                        <p className="mt-1 text-sm text-emerald-600">Active</p>
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
                                        Security
                                    </h3>
                                    <p className="mt-1 text-sm leading-5 text-slate-500">
                                        Keep your account secure by updating your password
                                        regularly.
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                className="mt-4 w-full"
                                onClick={() => alert("Change password UI coming next!")}
                            >
                                Change Password
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
