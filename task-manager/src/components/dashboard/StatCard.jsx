import { ArrowUpRight } from "lucide-react";
import Card from "../common/Card";

const tones = {
    indigo: "bg-indigo-50 text-indigo-600",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-red-600",
};

const StatCard = ({
    title,
    value = 0,
    description,
    icon: Icon,
    tone = "indigo",
}) => {
    return (
        <Card className="h-full transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                        {Number(value) || 0}
                    </p>
                </div>

                {Icon && (
                    <div className={`rounded-xl p-3 ${tones[tone] || tones.indigo}`}>
                        <Icon size={21} />
                    </div>
                )}
            </div>

            <div className="mt-5 flex items-center gap-1.5 text-xs text-slate-500">
                <ArrowUpRight size={14} />
                <span>{description}</span>
            </div>
        </Card>
    );
};

export default StatCard;