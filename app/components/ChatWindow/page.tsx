"use client";
import { useState, useRef, useEffect } from "react";
import MessageBubble from "../MessageBubble/page";
import TypingIndicator from "../TypingIndicator/page";
import InputBar from "../InputBar/page";

export default function ChatWindow({ isDark }: any) {
    const [messages, setMessages] = useState<{ id: number; type: string; content: string }[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load messages from localStorage on first render
    useEffect(() => {
        const savedMessages = localStorage.getItem("chat_messages");
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        } else {
            // default AI greeting if no saved messages
            setMessages([
                { id: 1, type: "ai", content: "Hey there! 👋 I'm BeBo. How can I help you today?" },
            ]);
        }
    }, []);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        // Save messages to localStorage
        localStorage.setItem("chat_messages", JSON.stringify(messages));
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMsg = { id: Date.now(), type: "user", content: inputValue };
        setMessages((prev) => [...prev, userMsg]);
        const userPrompt = inputValue;
        setInputValue("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: userPrompt }),
            });

            const data = await res.json();
            const botMsg = {
                id: Date.now() + 1,
                type: "ai",
                content: data.generatedText || "⚠️ No response from AI.",
            };

            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 2, type: "ai", content: "❌ Server error. Please try again." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="flex-1 flex flex-col relative">
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="max-w-7xl mx-auto px-4 py-8 space-y-4">
                    {messages.map((m) => (
                        <MessageBubble key={m.id} msg={m} isDark={isDark} />
                    ))}
                    {isLoading && <TypingIndicator isDark={isDark} />}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <InputBar
                isDark={isDark}
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSend={handleSend}
                isLoading={isLoading}
            />
        </div>
    );
}
