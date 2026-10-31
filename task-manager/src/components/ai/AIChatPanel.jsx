
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Sparkles,
  Send,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import { generateTaskWithAI } from "../../redux/thunks/aiThunk";
import { clearGeneratedTask } from "../../redux/slices/aiSlice";
import AITaskPreview from "./AITaskPreview";

const AIChatPanel = () => {
  const dispatch = useDispatch();

  const { generatedTask, loading, error } = useSelector(
    (state) => state.ai
  );

  const [prompt, setPrompt] = useState("");

  const handleGenerate = (e) => {
    e.preventDefault();

    if (prompt.trim().length < 5 || loading) return;

    dispatch(generateTaskWithAI(prompt.trim()));
    setPrompt("");
  };

  const examples = [
    "Create an ecommerce website task",
    "Plan my React learning roadmap",
    "Create a portfolio development task",
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Chat Content */}
      <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4">

        {!generatedTask && !loading && (
          <div className="py-5 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
              <Sparkles size={27} />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              How can I help you?
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Describe your goal and I'll break it into actionable tasks.
            </p>

            <div className="mt-5 space-y-2">
              {examples.map((example) => (
                <button
                  key={example}
                  onClick={() => setPrompt(example)}
                  className="block w-full rounded-xl border border-slate-200 bg-white p-3 text-left text-xs text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center gap-3 rounded-xl bg-white p-4 text-sm text-indigo-600">
            <RefreshCw size={18} className="animate-spin" />
            Gemini is generating your task...
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle size={17} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {generatedTask && (
          <>
            <AITaskPreview task={generatedTask} />

            <button
              onClick={() => dispatch(clearGeneratedTask())}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
            >
              Generate another task
            </button>
          </>
        )}
      </div>

      {/* Prompt Input */}
      <form
        onSubmit={handleGenerate}
        className="border-t border-slate-200 bg-white p-4"
      >
        <div className="flex items-end gap-2 rounded-xl border border-slate-200 p-2 focus-within:border-indigo-400">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your task..."
            rows={2}
            maxLength={1000}
            className="max-h-28 min-h-12 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-slate-400"
          />

          <button
            type="submit"
            disabled={loading || prompt.trim().length < 5}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Generate task"
          >
            <Send size={17} />
          </button>
        </div>

        <p className="mt-2 text-center text-[10px] text-slate-400">
          AI-generated suggestions may need review.
        </p>
      </form>
    </div>
  );
};

export default AIChatPanel;
