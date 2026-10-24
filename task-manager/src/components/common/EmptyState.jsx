import { Inbox } from "lucide-react";

const EmptyState = ({
    icon: Icon = Inbox,
    title = "No data found",
    description = "There is nothing to display right now.",
    action,
    className = "",
}) => {
    return (
        <div className={`flex flex-col items-center justify-center px-6 py-14 text-center ${className}`}>
            <div className="mb-4 rounded-2xl bg-slate-100 p-4 text-slate-400">
                <Icon size={30} />
            </div>
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 max-w-sm text-sm text-slate-500">{description}</p>
            {action && <div className="mt-5">{action}</div>}
        </div>
    );
};

export default EmptyState;