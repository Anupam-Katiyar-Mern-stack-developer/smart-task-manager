import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import Input from "./Input";

const PasswordInput = ({
    label = "Password",
    name = "password",
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Input
                {...props}
                label={label}
                name={name}
                type={showPassword ? "text" : "password"}
                icon={Lock}
                className="pr-12"
            />

            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute right-3 top-[42px] text-slate-400 transition hover:text-slate-700"
            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    );
};

export default PasswordInput;