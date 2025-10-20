"use client";
import { Send, Mic, Paperclip } from "lucide-react";
interface InputBarProps {
    isDark: boolean;
    inputValue: string;
    setInputValue: (value: string) => void;
    handleSend: () => void;
    isLoading: boolean;
}

export default function InputBar({
    isDark,
    inputValue,
    setInputValue,
    handleSend,
    isLoading,
}: InputBarProps) {
    return (
        <div
            className={`sticky bottom-0 border-t transition-all ${isDark
                ? "bg-slate-950/40 border-slate-800/50 backdrop-blur-xl"
                : "bg-white/40 border-slate-200/50 backdrop-blur-xl"
                }`}
        >
            <div className="max-w-4xl mx-auto px-4 py-4">
                <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all focus-within:ring-2 ${isDark
                        ? "bg-slate-900/80 border-slate-700/50 focus-within:ring-blue-500/50"
                        : "bg-white/80 border-slate-300/50 focus-within:ring-blue-400/50"
                        }`}
                >
                    <Paperclip size={20} className="opacity-70" />
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Ask me anything…"
                        className={`flex-1 bg-transparent outline-none text-sm ${isDark ? "placeholder-slate-500" : "placeholder-slate-400"
                            }`}
                    />
                    <Mic size={20} className="opacity-70" />
                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isLoading}
                        className={`p-2 rounded-lg ${inputValue.trim() && !isLoading
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-110"
                            : "bg-slate-700/50 opacity-50"
                            }`}
                    >
                        <Send size={18} className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
