"use client";
import { Plus, MessageSquare, Trash2, Settings2 } from "lucide-react";

export default function Sidebar({ isDark, sidebarOpen, setSidebarOpen }: any) {
    return (
        <div
            className={`fixed md:relative w-full md:w-64 min-h-[calc(100vh-64px)] transition-all border-l ${isDark
                ? "bg-slate-950/95 border-slate-800/50 backdrop-blur-xl"
                : "bg-white/95 border-slate-200/50 backdrop-blur-xl"
                } ${sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"} md:translate-x-0 z-30`}
        >
            <div className="p-4 pt-20 md:pt-4 space-y-6">
                <button
                    className={`w-full py-2 px-3 rounded-lg border flex items-center justify-center gap-2 ${isDark
                        ? "border-slate-700/50 hover:bg-slate-800/50"
                        : "border-slate-300/50 hover:bg-slate-100/50"
                        }`}
                >
                    <Plus size={16} />
                    <span className="text-sm font-medium">New Chat</span>
                </button>

                <div>
                    <h3 className="text-xs font-semibold uppercase opacity-70 mb-3">Your Conversations</h3>
                    <div className="space-y-2">
                        <button
                            className={`flex items-center w-full gap-2 px-3 py-2 rounded-lg text-sm ${isDark ? "hover:bg-slate-800/60" : "hover:bg-slate-100/60"
                                }`}
                        >
                            <MessageSquare size={14} className="opacity-50" />
                            <span>Quantum Computing</span>
                            <Trash2 size={14} className="ml-auto text-red-500 opacity-0 group-hover:opacity-100" />
                        </button>
                    </div>
                </div>

                <button
                    className={`w-full py-2 px-3 rounded-lg border flex items-center justify-center gap-2 ${isDark
                        ? "border-slate-700/50 hover:bg-slate-800/50"
                        : "border-slate-300/50 hover:bg-slate-100/50"
                        }`}
                >
                    <Settings2 size={16} />
                    <span className="text-sm">Settings</span>
                </button>
            </div>
        </div>
    );
}
