"use client";

import { DownloadSimple } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import "./globals.css";

export default function Home() {
    const [text, setText] = useState("");
    const [filename, setFilename] = useState("");
    const [downloaded, setDownloaded] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const charCount = text.replace(/\s+/g, "").length;
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        if (downloaded) setDownloaded(false);
    };

    const handleDownload = async () => {
        if (text.trim() === "") return;
        if (filename.trim() === "") return;
        try {
            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${filename}.txt`;
            a.click();
            URL.revokeObjectURL(url);
            setDownloaded(true);
        } catch {
            alert("Failed!");
        }
    };

    return (
        <div className="flex flex-col gap-5 p-5">
            <div className="py-1 font-mono text-xl text-center text-blue-500 bg-gray-900 rounded-lg shadow-lg shadow-black">
                ez-Type
            </div>

            <textarea
                value={text}
                ref={textareaRef}
                onChange={handleTextChange}
                placeholder="type here..."
                className="w-full p-2 overflow-y-scroll text-lg text-black bg-gray-300 border rounded-lg shadow-inner outline-none resize-none scroll-ml-52 shadow-black h-100"
            />

            <div className="flex flex-col justify-between gap-2 p-2 bg-gray-900 rounded-lg shadow-inner shadow-black">
                <div className="flex flex-col font-mono">
                    <p className="">Char Count: {charCount}</p>
                    <p className="">Word Count: {wordCount}</p>
                </div>

                <div className="flex flex-row gap-2">
                    <input
                        type="text"
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                        className="w-full px-2 text-lg text-black bg-gray-300 rounded-md shadow-md outline-none shadow-black"
                        placeholder="name a file"
                    />
                    <button onClick={handleDownload}>
                        <DownloadSimple
                            size={40}
                            weight="light"
                            className="text-black bg-blue-500 rounded-md shadow-md shadow-black"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
