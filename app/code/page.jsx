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
          const output =
            result.data.stdout ||
            result.data.stderr ||
            result.data.compile_output ||
            "";
          setOutput(output);
          setIsLoading(false);
        }
      };

      checkStatus();
    } catch (error) {
      console.error(error);
      setOutput("Error");
      setIsLoading(false);
    }
  };

  return (
    <div>
        <Header/>
    <div className="p-4 bg-gray-900 rounded-xl text-white">
      <div className="mb-2 flex items-center gap-2">
        <label>Language:</label>
        <select
          className="p-1 rounded bg-gray-800 text-white"
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
        >
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="c">C</option>
        </select>
      </div>

      <Editor
        height="300px"
        defaultLanguage={language}
        language={language}
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="vs-dark"
        className="rounded"
      />

      <textarea
        className="w-full h-20 p-2 mt-3 rounded bg-black text-white"
        placeholder="Input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>

      <button
        onClick={handleRun}
        className="mt-3 bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>

      <div className="mt-4 bg-gray-800 p-3 rounded">
        <h4 className="font-semibold mb-2">Output:</h4>
        <pre className="text-green-300 whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
    </div>
  );
};

export default CodeEditor;
