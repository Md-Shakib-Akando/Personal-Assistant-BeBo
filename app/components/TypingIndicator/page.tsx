"use client";

interface TypingIndicatorProps {
    isDark: boolean;
}

export default function TypingIndicator({ isDark }: TypingIndicatorProps) {
    return (
        <div className="flex justify-start">
            <div
                className={`px-4 py-3 rounded-2xl ${isDark ? "bg-slate-800/60" : "bg-slate-200/60"}`}
            >
                <div className="flex gap-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-150" />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-300" />
                </div>
            </div>
        </div>
    );
}
