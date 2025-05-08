"use client";

import { useRef, useState } from "react";

export default function Home() {
    const [text, setText] = useState("");
    const [copy, setCopy] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleCopy = async () => {
        if (text.trim() === "") return;
        try {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopy(true);
        } catch {
            alert("Gagal menyalin teks!");
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        if (copy) setCopy(false);
    };

    const charCount = text.replace(/\s+/g, "").length;
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

    return (
        <div className="flex flex-col gap-5 p-5">
            <div className="py-1 font-mono text-xl text-center text-blue-500 bg-gray-900 rounded-lg shadow-lg shadow-black">
                ezType
            </div>

            <textarea
                value={text}
                ref={textareaRef}
                onChange={handleTextChange}
                placeholder="type here..."
                className="w-full p-2 overflow-auto text-lg text-black bg-gray-300 border rounded-lg shadow-inner outline-none shadow-black h-100"
            />

            <div className="flex flex-row justify-between p-2 bg-gray-900 rounded-lg shadow-inner shadow-black">
                <div className="flex flex-col gap-2 font-mono">
                    <p>Char Count: {charCount}</p>
                    <p>Word Count: {wordCount}</p>
                </div>
                <button
                    onClick={handleCopy}
                    className={`rounded-lg px-5 transition-all shadow-md shadow-black ${
                        copy
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                >
                    {copy ? "Success" : "Copy All"}
                </button>
            </div>
        </div>
    );
}
