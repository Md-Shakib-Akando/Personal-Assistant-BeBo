"use client";
import React, { useState } from "react";
import ChatWindow from "../components/ChatWindow/page";
import Sidebar from "../components/Sidebar/page";
import Navbar from "../components/Navbar/page";


export default function ChatPage() {

  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={isDark ? "dark" : ""}>
      <div
        className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900"
          }`}
      >
        <Navbar isDark={isDark} setIsDark={setIsDark} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <div className="flex flex-1 pt-16 overflow-hidden">
          <ChatWindow isDark={isDark} />
          <Sidebar isDark={isDark} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
      </div>
    </div>
  );
}
