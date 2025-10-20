import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();
        if (!prompt) return NextResponse.json({ error: "Prompt required" }, { status: 400 });

        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            }),
        });

        const data = await res.json();
        const message = data?.choices?.[0]?.message?.content || "⚠️ No response.";

        return NextResponse.json({ generatedText: message });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server failed to respond." }, { status: 500 });
    }
}
