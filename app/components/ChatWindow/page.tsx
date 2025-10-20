"use client";
import { useState, useRef, useEffect } from "react";
import MessageBubble from "../MessageBubble/page";
import TypingIndicator from "../TypingIndicator/page";
import InputBar from "../InputBar/page";

interface Message {
    id: number;
    type: "user" | "ai";
    content: string;
}

interface ChatWindowProps {
    isDark: boolean;
}

export default function ChatWindow({ isDark }: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const savedMessages = localStorage.getItem("chat_messages");
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        } else {
            setMessages([
                { id: 1, type: "ai", content: "Hey there! 👋 I'm BeBo. How can I help you today?" },
            ]);
        }
    }, []);


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        localStorage.setItem("chat_messages", JSON.stringify(messages));
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMsg: Message = { id: Date.now(), type: "user", content: inputValue };
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
            const botMsg: Message = {
                id: Date.now() + 1,
                type: "ai",
                content: data.generatedText || "⚠️ No response from AI.",
            };

            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error("Error:", error);
            const errorMsg: Message = { id: Date.now() + 2, type: "ai", content: "❌ Server error. Please try again." };
            setMessages((prev) => [...prev, errorMsg]);
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
