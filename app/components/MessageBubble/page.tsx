"use client";
interface Message {
    id: number;
    type: "user" | "ai";
    content: string;
}

interface MessageBubbleProps {
    msg: Message;
    isDark: boolean;
}

export default function MessageBubble({ msg, isDark }: MessageBubbleProps) {
    const isUser = msg.type === "user";
    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-md lg:max-w-xl px-4 py-3 rounded-2xl transition-all ${isUser
                    ? isDark
                        ? "bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg"
                        : "bg-slate-200/60 border border-slate-300/50"
                    : isDark
                        ? "bg-slate-800/60 border border-slate-700/50"
                        : "bg-slate-200/60 border border-slate-300/50"
                    }`}
            >
                <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</div>
            </div>
        </div>
    );
}
