import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    AlertTriangle,
    CheckCircle2,
    Clock3,
    Layers3,
} from "lucide-react";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";
import StatCard from "../../components/dashboard/StatCard";
import DashboardCharts from "../../components/dashboard/DashboardCharts";
import TaskListCard from "../../components/dashboard/TaskListCard";
import { fetchDashboardOverview } from "../../redux/thunks/dashboardThunks";

const Dashboard = () => {
    const dispatch = useDispatch();

    const {
        stats,
        recentTasks,
        upcomingTasks,
        loading,
        error,
    } = useSelector((state) => state.dashboard);

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(fetchDashboardOverview());
    }, [dispatch]);

    const firstName = user?.name?.split(" ")[0] ||
        user?.fullName?.split(" ")[0] ||
        "there";

    const total = Number(stats?.total) || 0;
    const completed = Number(stats?.completed) || 0;
    const completionRate = Math.min(
        100,
        Math.max(
            0,
            Number(stats?.completionRate) ||
            (total ? Math.round((completed / total) * 100) : 0)
        )
    );

    if (loading && !stats) {
        return (
            <div className="py-20">
                <Spinner text="Loading your dashboard..." />
            </div>
        );
    }

    if (error && !stats) {
        return (
            <Card title="Dashboard could not load">
                <p role="alert" className="text-sm text-red-600">
                    {error}
                </p>
                <Button
                    className="mt-4"
                    onClick={() => dispatch(fetchDashboardOverview())}
                    loading={loading}
                >
                    Try again
                </Button>
            </Card>
        );
    }

    const statCards = [
        {
            title: "Total Tasks",
            value: total,
            description: "All your tasks",
            icon: Layers3,
            tone: "indigo",
        },
        {
            title: "Completed",
            value: completed,
            description: "Successfully finished",
            icon: CheckCircle2,
            tone: "green",
        },
        {
            title: "Pending",
            value: stats?.pending,
            description: "Awaiting your attention",
            icon: Clock3,
            tone: "amber",
        },
        {
            title: "Overdue",
            value: stats?.overdue,
            description: "Past due and incomplete",
            icon: AlertTriangle,
            tone: "red",
        },
    ];

    return (
        <div className="mx-auto max-w-[1600px] space-y-7">
            {/* Page heading */}
            <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <p className="text-sm font-medium text-indigo-600">
                        YOUR OVERVIEW
                    </p>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Welcome back, {firstName}!
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Here is what's happening with your tasks. Let's make today
                        productive.
                    </p>
                </div>

                <Button
                    variant="outline"
                    loading={loading}
                    onClick={() => dispatch(fetchDashboardOverview())}
                >
                    Refresh
                </Button>
            </section>

            {/* Refresh errors when previously loaded data is available */}
            {error && stats && (
                <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    Refresh failed: {error}. Showing the last loaded dashboard data.
                </div>
            )}

            {/* KPI cards */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {statCards.map((item) => (
                    <StatCard key={item.title} {...item} />
                ))}
            </section>

            {/* Completion progress */}
            <Card
                title="Completion Progress"
                description="Track how much of your task list you have finished"
                action={
                    <Badge variant={completionRate === 100 ? "success" : "info"}>
                        {completionRate}% complete
                    </Badge>
                }
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-3xl font-bold text-slate-900">
                            {completed}
                            <span className="ml-2 text-base font-medium text-slate-400">
                                / {total} tasks
                            </span>
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            {total === 0
                                ? "Create a task to start tracking your progress."
                                : `${Math.max(total - completed, 0)} tasks left to complete`}
                        </p>
                    </div>

                    <div className="w-full sm:max-w-sm">
                        <div
                            className="h-3 overflow-hidden rounded-full bg-slate-100"
                            role="progressbar"
                            aria-label="Task completion"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={completionRate}
                        >
                            <div
                                className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                                style={{ width: `${completionRate}%` }}
                            />
                        </div>
                        <p className="mt-2 text-right text-xs text-slate-500">
                            {completionRate}% completed
                        </p>
                    </div>
                </div>
            </Card>

            {/* Charts */}
            <DashboardCharts stats={stats || {}} />

            {/* Tasks lists */}
            <section className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
                <TaskListCard type="recent" tasks={recentTasks} />
                <TaskListCard type="upcoming" tasks={upcomingTasks} />
            </section>
        </div>
    );
};

export default Dashboard;