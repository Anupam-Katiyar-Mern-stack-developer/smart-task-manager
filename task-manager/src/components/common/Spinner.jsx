import { Loader2 } from "lucide-react";

const sizes = {
    sm: 16,
    md: 24,
    lg: 40,
};

const Spinner = ({
    size = "md",
    text,
    fullScreen = false,
    className = "",
}) => {
    return (
        <div
            role="status"
            className={`flex items-center justify-center gap-3 ${fullScreen ? "min-h-screen" : ""
                } ${className}`}
        >
            <Loader2
                size={sizes[size] || sizes.md}
                className="animate-spin text-indigo-600"
            />
            {text && <span className="text-sm text-slate-500">{text}</span>}
            <span className="sr-only">{text || "Loading..."}</span>
        </div>
    );
};

export default Spinner;