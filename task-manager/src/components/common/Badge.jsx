const variants = {
    success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    warning: "bg-amber-50 text-amber-700 ring-amber-200",
    danger: "bg-red-50 text-red-700 ring-red-200",
    info: "bg-blue-50 text-blue-700 ring-blue-200",
    neutral: "bg-slate-100 text-slate-700 ring-slate-200",
};

const Badge = ({
    children,
    variant = "neutral",
    className = "",
}) => {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${variants[variant] || variants.neutral
                } ${className}`}
        >
            {children}
        </span>
    );
};

export default Badge;