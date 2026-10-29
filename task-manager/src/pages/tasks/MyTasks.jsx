
import { useMemo, useState } from "react";
import {
    Search,
    Plus,
    ListTodo,
    CalendarDays,
    Clock3,
    CheckCircle2,
    Circle,
    MoreHorizontal,
    Pencil,
    Trash2,
    X,
    SlidersHorizontal,
    ArrowUpDown,
    Flag,
} from "lucide-react";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Pagination from "../../components/common/Pagination";

const initialTasks = [
    {
        id: 1,
        title: "Complete Task Manager UI",
        description: "Build the task listing page and reusable layouts.",
        status: "in_progress",
        priority: "high",
        due_date: "2026-10-30",
    },
    {
        id: 2,
        title: "Integrate Redux Toolkit",
        description: "Connect async thunks and manage API states.",
        status: "pending",
        priority: "high",
        due_date: "2026-11-01",
    },
    {
        id: 3,
        title: "Review PostgreSQL queries",
        description: "Practice joins, CTEs and window functions.",
        status: "completed",
        priority: "medium",
        due_date: "2026-10-25",
    },
    {
        id: 4,
        title: "Add API error handling",
        description: "Handle validation errors and server responses.",
        status: "completed",
        priority: "low",
        due_date: "2026-10-26",
    },
    {
        id: 5,
        title: "Write authentication tests",
        description: "Test login, registration and protected routes.",
        status: "pending",
        priority: "medium",
        due_date: "2026-11-03",
    },
];

const emptyForm = {
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    due_date: "",
};

const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
];

const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
];

const formatStatus = (status) => ({
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
}[status] || status);

const formatDate = (date) => {
    if (!date) return "No due date";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const statusStyles = {
    pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
    in_progress: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
    completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
};

const priorityStyles = {
    low: "bg-slate-100 text-slate-600",
    medium: "bg-orange-50 text-orange-700",
    high: "bg-red-50 text-red-700",
};

const MyTasks = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [page, setPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [deleteTaskId, setDeleteTaskId] = useState(null);
    const [formData, setFormData] = useState(emptyForm);
    const [formError, setFormError] = useState("");

    const limit = 4;

    const filteredTasks = useMemo(() => {
        const query = search.trim().toLowerCase();

        return tasks.filter((task) => {
            const matchesSearch =
                !query ||
                task.title.toLowerCase().includes(query) ||
                (task.description || "").toLowerCase().includes(query);

            const matchesStatus =
                !statusFilter || task.status === statusFilter;

            const matchesPriority =
                !priorityFilter || task.priority === priorityFilter;

            return matchesSearch && matchesStatus && matchesPriority;
        });
    }, [tasks, search, statusFilter, priorityFilter]);

    const totalPages = Math.ceil(filteredTasks.length / limit);
    const currentPage = Math.min(page, Math.max(totalPages, 1));

    const paginatedTasks = filteredTasks.slice(
        (currentPage - 1) * limit,
        currentPage * limit
    );

    const stats = [
        {
            label: "Total Tasks",
            value: tasks.length,
            icon: ListTodo,
            color: "bg-indigo-50 text-indigo-600",
        },
        {
            label: "In Progress",
            value: tasks.filter((task) => task.status === "in_progress").length,
            icon: Clock3,
            color: "bg-blue-50 text-blue-600",
        },
        {
            label: "Completed",
            value: tasks.filter((task) => task.status === "completed").length,
            icon: CheckCircle2,
            color: "bg-emerald-50 text-emerald-600",
        },
        {
            label: "Pending",
            value: tasks.filter((task) => task.status === "pending").length,
            icon: Circle,
            color: "bg-amber-50 text-amber-600",
        },
    ];

    const openCreateForm = () => {
        setEditingTask(null);
        setFormData(emptyForm);
        setFormError("");
        setShowForm(true);
    };

    const openEditForm = (task) => {
        setEditingTask(task);
        setFormData({
            title: task.title,
            description: task.description || "",
            status: task.status,
            priority: task.priority,
            due_date: task.due_date || "",
        });
        setFormError("");
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingTask(null);
        setFormData(emptyForm);
        setFormError("");
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setFormError("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formData.title.trim()) {
            setFormError("Task title is required.");
            return;
        }

        if (editingTask) {
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === editingTask.id
                        ? { ...task, ...formData, title: formData.title.trim() }
                        : task
                )
            );
        } else {
            setTasks((prev) => [
                {
                    ...formData,
                    title: formData.title.trim(),
                    id: Date.now(),
                },
                ...prev,
            ]);
            setPage(1);
        }

        closeForm();
    };

    const handleDelete = () => {
        setTasks((prev) =>
            prev.filter((task) => task.id !== deleteTaskId)
        );
        setDeleteTaskId(null);
    };

    const handleStatusChange = (task) => {
        const nextStatus =
            task.status === "pending"
                ? "in_progress"
                : task.status === "in_progress"
                    ? "completed"
                    : "pending";

        setTasks((prev) =>
            prev.map((item) =>
                item.id === task.id
                    ? { ...item, status: nextStatus }
                    : item
            )
        );
    };

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("");
        setPriorityFilter("");
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-slate-50/80 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-7">

                {/* Page header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                            <span>Workspace</span>
                            <span>/</span>
                            <span className="font-medium text-indigo-600">My Tasks</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            My Tasks
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Organize your work and keep track of your progress.
                        </p>
                    </div>

                    <Button onClick={openCreateForm}>
                        <Plus size={18} />
                        Create Task
                    </Button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map(({ label, value, icon: Icon, color }) => (
                        <div
                            key={label}
                            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-slate-500">
                                    {label}
                                </p>
                                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                                    <Icon size={20} />
                                </div>
                            </div>
                            <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                                {value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Tasks section */}
                <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                    <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                All Tasks
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""} found
                            </p>
                        </div>
                        <Button variant="outline" onClick={openCreateForm}>
                            <Plus size={16} />
                            New Task
                        </Button>
                    </div>

                    {/* Search and filters */}
                    <div className="grid grid-cols-1 gap-3 border-b border-slate-100 p-5 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="sm:col-span-2">
                            <Input
                                name="search"
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                    setPage(1);
                                }}
                                placeholder="Search tasks by title or description..."
                                icon={Search}
                            />
                        </div>

                        <Select
                            name="status"
                            value={statusFilter}
                            onChange={(event) => {
                                setStatusFilter(event.target.value);
                                setPage(1);
                            }}
                            placeholder="All statuses"
                            options={statusOptions}
                        />

                        <Select
                            name="priority"
                            value={priorityFilter}
                            onChange={(event) => {
                                setPriorityFilter(event.target.value);
                                setPage(1);
                            }}
                            placeholder="All priorities"
                            options={priorityOptions}
                        />
                    </div>

                    {/* Active filters */}
                    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-6">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                            <SlidersHorizontal size={15} />
                            <span>Filters</span>
                            {statusFilter && (
                                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-indigo-700">
                                    {formatStatus(statusFilter)}
                                </span>
                            )}
                            {priorityFilter && (
                                <span className="rounded-full bg-orange-50 px-2.5 py-1 text-orange-700">
                                    {priorityFilter} priority
                                </span>
                            )}
                        </div>

                        {(search || statusFilter || priorityFilter) && (
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>

                    {/* Task list */}
                    <div className="space-y-3 px-4 pb-4 sm:px-5">
                        {paginatedTasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-5 py-16 text-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                    <ListTodo size={26} />
                                </div>
                                <h3 className="mt-4 font-semibold text-slate-900">
                                    No tasks found
                                </h3>
                                <p className="mt-1 max-w-sm text-sm text-slate-500">
                                    Try changing your search or filters, or create a new task.
                                </p>
                                <Button className="mt-5" onClick={openCreateForm}>
                                    <Plus size={17} />
                                    Create your first task
                                </Button>
                            </div>
                        ) : (
                            paginatedTasks.map((task) => (
                                <article
                                    key={task.id}
                                    className="group rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:shadow-sm sm:p-5"
                                >
                                    <div className="flex items-start gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleStatusChange(task)}
                                            title="Change task status"
                                            aria-label={`Change status for ${task.title}`}
                                            className={`mt-1 shrink-0 ${task.status === "completed"
                                                ? "text-emerald-600"
                                                : "text-slate-300 hover:text-indigo-600"
                                                }`}
                                        >
                                            <CheckCircle2 size={22} />
                                        </button>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className={`font-semibold ${task.status === "completed"
                                                    ? "text-slate-400 line-through"
                                                    : "text-slate-900"
                                                    }`}>
                                                    {task.title}
                                                </h3>

                                                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[task.status]}`}>
                                                    {formatStatus(task.status)}
                                                </span>
                                            </div>

                                            <p className="mt-2 break-words text-sm leading-6 text-slate-500">
                                                {task.description || "No description provided."}
                                            </p>

                                            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                                                <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold capitalize ${priorityStyles[task.priority]}`}>
                                                    <Flag size={13} />
                                                    {task.priority} priority
                                                </span>

                                                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                                                    <CalendarDays size={14} />
                                                    Due {formatDate(task.due_date)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => openEditForm(task)}
                                                title="Edit task"
                                                className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                                            >
                                                <Pencil size={17} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeleteTaskId(task.id)}
                                                title="Delete task"
                                                className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                            >
                                                <Trash2 size={17} />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="px-5 sm:px-6">
                        <Pagination
                            page={currentPage}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </div>
                </section>
            </div>

            {/* Create / Edit modal */}
            {showForm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) closeForm();
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="task-form-title"
                        className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl"
                    >
                        <div className="flex items-start justify-between border-b border-slate-100 p-5 sm:p-6">
                            <div>
                                <h2 id="task-form-title" className="text-xl font-bold text-slate-900">
                                    {editingTask ? "Edit Task" : "Create New Task"}
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Add details to keep your work organized.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={closeForm}
                                aria-label="Close dialog"
                                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
                            <Input
                                label="Task title"
                                name="title"
                                value={formData.title}
                                onChange={handleFormChange}
                                placeholder="e.g. Complete dashboard UI"
                                required
                            />

                            <div>
                                <label htmlFor="description" className="mb-2 block text-sm font-medium text-slate-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    placeholder="Describe what needs to be done..."
                                    className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Select
                                    label="Status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleFormChange}
                                    options={statusOptions}
                                    required
                                />
                                <Select
                                    label="Priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleFormChange}
                                    options={priorityOptions}
                                    required
                                />
                            </div>

                            <Input
                                label="Due date"
                                name="due_date"
                                type="date"
                                value={formData.due_date}
                                onChange={handleFormChange}
                            />

                            {formError && (
                                <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                                    {formError}
                                </p>
                            )}

                            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={closeForm}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    {editingTask ? "Save Changes" : "Create Task"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete confirmation */}
            {deleteTaskId !== null && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
                    <div
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="delete-dialog-title"
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                            <Trash2 size={22} />
                        </div>
                        <h2 id="delete-dialog-title" className="mt-4 text-lg font-bold text-slate-900">
                            Delete this task?
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            This task will be removed from your list. This action cannot be undone.
                        </p>
                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                onClick={() => setDeleteTaskId(null)}
                            >
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                <Trash2 size={16} />
                                Delete Task
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTasks;
