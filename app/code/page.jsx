"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import Header from "../dashboard/_components/Header";

const languages = {
  python: 71,
  cpp: 54,
  java: 62,
  c: 50,
};

const CodeEditor = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRun = async () => {
    setIsLoading(true);
    setOutput("");

    try {
      const res = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          language_id: languages[language],
          source_code: code,
          stdin: input,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_CODE_API,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      const token = res.data.token;

      const checkStatus = async () => {
        const result = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
          {
            headers: {
              "X-RapidAPI-Key": process.env.NEXT_PUBLIC_CODE_API,
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
          }
        );

        if (result.data.status.id <= 2) {
          setTimeout(checkStatus, 1000);
        } else {
          const resultOutput =
            result.data.stdout ||
            result.data.stderr ||
            result.data.compile_output ||
            "No output";
          setOutput(resultOutput);
          setIsLoading(false);
        }
      };

      checkStatus();
    } catch (error) {
      console.error(error);
      setOutput("An error occurred while compiling the code.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        {/* Language Selection */}
        <div className="mb-4 flex items-center gap-3">
          <label className="text-sm font-medium">Language:</label>
          <select
            className="p-2 rounded bg-gray-800 text-white"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="c">C</option>
          </select>
        </div>

        {/* Code Editor */}
        <Editor
          height="350px"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          className="rounded mb-3"
        />

        {/* Input */}
        <textarea
          className="w-full h-20 p-2 mb-4 rounded bg-gray-900 text-white"
          placeholder="Enter input (if any)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Run Button */}
        <button
          onClick={handleRun}
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition-all"
        >
          {isLoading ? "Running..." : "Run Code"}
        </button>

        {/* Output */}
        <div className="mt-5 bg-gray-800 p-4 rounded">
          <h4 className="font-semibold mb-2">Output:</h4>
          <pre className="text-green-300 whitespace-pre-wrap">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
