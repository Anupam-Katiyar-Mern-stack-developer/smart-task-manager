
import { useState } from "react";
import { Sparkles, X, MessageCircle } from "lucide-react";
import AIChatPanel from "./AIChatPanel";

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 transition hover:scale-105 hover:bg-indigo-700"
                    aria-label="Open AI Assistant"
                >
                    <Sparkles size={25} />
                </button>
            )}

            {/* Assistant Panel */}
            {isOpen && (
                <div className="fixed bottom-5 right-5 z-50 flex h-[min(680px,calc(100dvh-40px))] w-[min(420px,calc(100vw-40px))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-indigo-600 px-5 py-4 text-white">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-white/15 p-2">
                                <Sparkles size={21} />
                            </div>

                            <div>
                                <h2 className="font-semibold">AI Assistant</h2>
                                <p className="text-xs text-indigo-100">
                                    Powered by Gemini
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg p-2 transition hover:bg-white/15"
                            aria-label="Close AI Assistant"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <AIChatPanel />
                </div>
            )}
        </>
    );
};

export default AIAssistant;
