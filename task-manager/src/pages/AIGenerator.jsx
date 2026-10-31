
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Sparkles,
  WandSparkles,
  RefreshCw,
  ListChecks,
  Clock3,
  AlertCircle,
} from "lucide-react";

import { generateTaskWithAI } from "../redux/thunks/aiThunk";
import { clearGeneratedTask } from "../redux/slices/aiSlice";

const examples = [
  "Create a task for building an ecommerce website",
  "Plan a portfolio website development",
  "Create a task for learning React and Redux",
];

const AIGenerator = () => {
  const dispatch = useDispatch();

  const { generatedTask, loading, error } = useSelector(
    (state) => state.ai
  );

  const [prompt, setPrompt] = useState("");

  const handleGenerate = (e) => {
    e.preventDefault();

    if (!prompt.trim() || loading) return;

    dispatch(generateTaskWithAI(prompt.trim()));
  };

  const handleReset = () => {
    setPrompt("");
    dispatch(clearGeneratedTask());
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-indigo-600">
            <Sparkles size={20} />
            <span className="text-sm font-semibold">AI POWERED</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            AI Task Generator
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Describe your goal and let AI create a structured task for you.
          </p>
        </div>

        {/* Generator */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <WandSparkles size={22} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                What do you want to accomplish?
              </h2>
              <p className="text-sm text-slate-500">
                Write your goal in natural language.
              </p>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              maxLength={1000}
              rows={5}
              placeholder="Example: I want to build a full-stack ecommerce application with authentication, products, cart and payment..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Minimum 5 characters</span>
              <span>{prompt.length}/1000</span>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-slate-600">
                Try an example
              </p>

              <div className="flex flex-wrap gap-2">
                {examples.map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => setPrompt(example)}
                    className="rounded-full border border-slate-200 px-3 py-2 text-xs text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || prompt.trim().length < 5}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {loading ? (
                <>
                  <RefreshCw size={17} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={17} />
                  Generate Task
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={19} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Generated Task */}
        {generatedTask && (
          <div className="space-y-5 rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-indigo-600">
                  <Sparkles size={17} />
                  <span className="text-xs font-semibold uppercase">
                    AI Generated Result
                  </span>
                </div>

                <h2 className="mt-2 text-lg font-bold text-slate-900">
                  Review Your Task
                </h2>
              </div>

              <button
                type="button"
                onClick={() => dispatch(clearGeneratedTask())}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                <RefreshCw size={15} />
                Clear
              </button>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <h3 className="text-lg font-bold text-slate-900">
                {generatedTask.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {generatedTask.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium capitalize text-indigo-700">
                  Priority: {generatedTask.priority}
                </span>

                {generatedTask.dueDate && (
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-700">
                    Due: {generatedTask.dueDate}
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2">
                <ListChecks size={19} className="text-indigo-600" />
                <h3 className="font-semibold text-slate-900">
                  Suggested Subtasks
                </h3>
              </div>

              <div className="space-y-3">
                {generatedTask.subtasks?.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-semibold text-indigo-600">
                      {index + 1}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-slate-800">
                        {task.title}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {task.description}
                      </p>

                      <span className="mt-2 inline-block text-xs capitalize text-indigo-600">
                        {task.priority} priority
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
              AI suggestions ko review karna zaroori hai. Abhi ye preview hai;
              database mein automatically save nahi hua hai.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIGenerator;
