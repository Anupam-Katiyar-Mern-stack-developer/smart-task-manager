import { CalendarDays, CalendarClock, ListTodo } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../common/Card";
import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

const statusVariants = {
    completed: "success",
    pending: "warning",
    in_progress: "info",
};

const priorityVariants = {
    low: "success",
    medium: "warning",
    high: "danger",
};

const formatLabel = (value = "") =>
    String(value)
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatDate = (value) => {
    if (!value) return "No date";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "No date";

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const TaskListCard = ({ type = "recent", tasks = [] }) => {
    const isUpcoming = type === "upcoming";
    const title = isUpcoming ? "Upcoming Tasks" : "Recent Tasks";
    const description = isUpcoming
        ? "Tasks that need your attention next"
        : "Your latest created tasks";

    const Icon = isUpcoming ? CalendarClock : ListTodo;

    return (
        <Card
            title={title}
            description={description}
            action={
                <Link
                    to="/tasks"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                    View all
                </Link>
            }
            className="h-full"
        >
            {!tasks.length ? (
                <EmptyState
                    icon={Icon}
                    title={isUpcoming ? "No upcoming tasks" : "No recent tasks"}
                    description={
                        isUpcoming
                            ? "You have no scheduled incomplete tasks right now."
                            : "Your new tasks will appear here once you create them."
                    }
                    className="py-8"
                />
            ) : (
                <div className="divide-y divide-slate-100">
                    {tasks.slice(0, 5).map((task) => {
                        const date = isUpcoming ? task.due_date : task.created_at;

                        return (
                            <div
                                key={task.id}
                                className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="min-w-0 flex-1">
                                    <p className="break-words text-sm font-semibold text-slate-800">
                                        {task.title}
                                    </p>

                                    <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                                        <CalendarDays size={14} />
                                        {isUpcoming ? "Due" : "Created"} {formatDate(date)}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge variant={statusVariants[task.status] || "neutral"}>
                                        {formatLabel(task.status || "pending")}
                                    </Badge>

                                    <Badge
                                        variant={priorityVariants[task.priority] || "neutral"}
                                    >
                                        {formatLabel(task.priority || "medium")}
                                    </Badge>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </Card>
    );
};

export default TaskListCard;