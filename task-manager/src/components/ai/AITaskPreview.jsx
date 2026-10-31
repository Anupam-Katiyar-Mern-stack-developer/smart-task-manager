
import { ListChecks } from "lucide-react";

const AITaskPreview = ({ task }) => {
    if (!task) return null;

    return (
        <div className="space-y-4 rounded-xl border border-indigo-100 bg-white p-4">
            <div>
                <span className="text-xs font-semibold uppercase text-indigo-600">
                    AI Generated Task
                </span>

                <h3 className="mt-2 font-bold text-slate-900">
                    {task.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                    {task.description}
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium capitalize text-indigo-700">
                    {task.priority} Priority
                </span>

                {task.dueDate && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                        Due: {task.dueDate}
                    </span>
                )}
            </div>

            <div>
                <div className="mb-3 flex items-center gap-2">
                    <ListChecks size={17} className="text-indigo-600" />
                    <h4 className="text-sm font-semibold text-slate-800">
                        Suggested Subtasks
                    </h4>
                </div>

                <div className="space-y-2">
                    {task.subtasks?.map((subtask, index) => (
                        <div
                            key={index}
                            className="rounded-lg bg-slate-50 p-3"
                        >
                            <p className="text-sm font-medium text-slate-800">
                                {index + 1}. {subtask.title}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                {subtask.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AITaskPreview;
