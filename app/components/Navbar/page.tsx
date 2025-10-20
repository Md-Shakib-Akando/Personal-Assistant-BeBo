"use client";
import { Sun, Moon, Menu, X } from "lucide-react";
import logo from "../../../public/logo.png";
import Image from "next/image";
interface NavbarProps {
    isDark: boolean;
    setIsDark: (val: boolean) => void;
    sidebarOpen: boolean;
    setSidebarOpen: (val: boolean) => void;
}

export default function Navbar({ isDark, setIsDark, sidebarOpen, setSidebarOpen }: NavbarProps) {
    return (
        <nav
            className={`fixed top-0 w-full z-40 border-b transition-all duration-300 ${isDark
                ? "bg-slate-950/40 border-slate-800/50 backdrop-blur-xl"
                : "bg-white/40 border-slate-200/50 backdrop-blur-xl"
                }`}
        >
            <div className="max-w-11/12 mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <div className="w-8 h-8 rounded-lg  flex items-center justify-center">
                        <Image src={logo} alt="Logo" width={44} height={44} />
                    </div>
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        BeBo
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${isDark ? "hover:bg-slate-800/80" : "hover:bg-slate-200/80"
                            }`}
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={`p-2 rounded-lg md:hidden transition-all duration-200 hover:scale-110 ${isDark ? "hover:bg-slate-800/80" : "hover:bg-slate-200/80"
                            }`}
                    >
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
