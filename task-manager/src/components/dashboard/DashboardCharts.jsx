import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import { ChartNoAxesColumn, ChartPie } from "lucide-react";
import Card from "../common/Card";
import EmptyState from "../common/EmptyState";

const STATUS_COLORS = ["#F59E0B", "#6366F1", "#10B981"];
const PRIORITY_COLORS = ["#10B981", "#F59E0B", "#EF4444"];

const DashboardCharts = ({ stats = {} }) => {
    const statusData = [
        { name: "Pending", value: Number(stats.pending) || 0 },
        { name: "In Progress", value: Number(stats.inProgress) || 0 },
        { name: "Completed", value: Number(stats.completed) || 0 },
    ];

    const priorityData = [
        { name: "Low", value: Number(stats.lowPriority) || 0 },
        { name: "Medium", value: Number(stats.mediumPriority) || 0 },
        { name: "High", value: Number(stats.highPriority) || 0 },
    ];

    const hasStatusData = statusData.some((item) => item.value > 0);
    const hasPriorityData = priorityData.some((item) => item.value > 0);

    return (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <Card
                title="Task Status"
                description="Your tasks grouped by completion status"
            >
                {hasStatusData ? (
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={62}
                                    outerRadius={94}
                                    paddingAngle={4}
                                    stroke="none"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell
                                            key={entry.name}
                                            fill={STATUS_COLORS[index]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={32} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <EmptyState
                        icon={ChartPie}
                        title="No task data yet"
                        description="Create your first task to see your status breakdown."
                        className="py-8"
                    />
                )}
            </Card>

            <Card
                title="Tasks by Priority"
                description="Understand where your attention is needed"
            >
                {hasPriorityData ? (
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={priorityData}
                                layout="vertical"
                                margin={{ top: 10, right: 18, bottom: 10, left: 4 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis
                                    type="number"
                                    allowDecimals={false}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    width={65}
                                />
                                <Tooltip />
                                <Bar dataKey="value" name="Tasks" barSize={22} radius={[0, 6, 6, 0]}>
                                    {priorityData.map((entry, index) => (
                                        <Cell
                                            key={entry.name}
                                            fill={PRIORITY_COLORS[index]}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <EmptyState
                        icon={ChartNoAxesColumn}
                        title="No priority data yet"
                        description="Priority distribution will appear when you add tasks."
                        className="py-8"
                    />
                )}
            </Card>
        </div>
    );
};

export default DashboardCharts;