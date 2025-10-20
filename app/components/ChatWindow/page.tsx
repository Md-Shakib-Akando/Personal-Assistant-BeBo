"use client";
import { useState, useRef, useEffect } from "react";
import MessageBubble from "../MessageBubble/page";
import TypingIndicator from "../TypingIndicator/page";
import InputBar from "../InputBar/page";


export default function ChatWindow({ isDark }: any) {
    const [messages, setMessages] = useState([
        { id: 1, type: "ai", content: "Hey there! 👋 I'm Nova. How can I help you today?" },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        const userMsg = { id: Date.now(), type: "user", content: inputValue };
        setMessages([...messages, userMsg]);
        setInputValue("");
        setIsLoading(true);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, type: "ai", content: "This would be an AI-generated response." },
            ]);
            setIsLoading(false);
        }, 2000);
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
