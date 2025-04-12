"use client";
import { Button } from "@/components/ui/button";
import { MockInterview } from "@/utils/schema";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import Header from "../../_components/Header";

function InterviewClient({ interviewId }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    const getInterviewDetails = async () => {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId.trim()));
        console.log(interviewId);
      setInterviewData(result[0]);
    };

    getInterviewDetails();
  }, [interviewId]);

  return (
    <div>
  
    <div className="min-h-screen bg-black py-16 px-6">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-12 animate-pulse leading-tight">
        Let Us Start The Interview
      </h2>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left Panel - Webcam */}
        <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-purple-700 hover:scale-105 transition-all duration-300 ease-in-out transform flex flex-col items-center">
          {webCamEnabled ? (
            <Webcam
              audio
              mirrored
              className="rounded-xl"
              style={{ height: 300, width: 300 }}
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
            />
          ) : (
            <div className="h-[300px] w-[300px] flex items-center justify-center bg-white/5 rounded-xl border border-dashed border-purple-300">
              <WebcamIcon className="h-20 w-20 text-purple-300" />
            </div>
          )}
          <button
            className="w-full mt-6 backdrop-blur-sm bg-white/10 border  hover:cursor-pointer border-white/20 rounded-xl py-2 text-purple-300 hover:text-pink-400 hover:bg-purple-700/20 hover:shadow-purple-700 hover:scale-105 transition-all duration-300 ease-in-out text-sm font-semibold"
            onClick={() => setWebCamEnabled(true)}
          >
            Enable Web Cam and Microphone
          </button>
        </div>
  
        {/* Right Panel - Job Details and Info */}
        <div className="flex flex-col gap-6">
          {/* Job Details Card */}
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-purple-700 hover:scale-105 transition-all duration-300 ease-in-out transform space-y-4">
            <h3 className="text-lg font-semibold text-center text-white">
              <strong>Job Role:</strong> {interviewData?.jobPosition || "Loading..."}
            </h3>
            <h3 className="text-lg font-semibold text-center text-white">
              <strong>Job Description:</strong> {interviewData?.jobDescription || "Loading..."}
            </h3>
            <h3 className="text-lg font-semibold text-center text-white">
              <strong>Experience Required:</strong> {interviewData?.jobExp || "Loading..."}
            </h3>
          </div>
  
          {/* Info Card */}
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-purple-700 hover:scale-105 transition-all duration-300 ease-in-out transform">
            <div className="flex items-center gap-2 mb-3 text-lg font-semibold text-white">
              <Lightbulb className="text-purple-300" />
              Information
            </div>
            <p className="text-sm text-purple-300 leading-relaxed">
              Enable your webcam and microphone to begin the AI-powered mock interview. You'll face 10 questions and get a full report based on your responses.
              <br />
              <strong>All the best!</strong>
            </p>
          </div>
        </div>
      </div>
  
      <div className="flex justify-center mt-12">
        <a
          href={`/dashboard/interview/${interviewId}/start`}
          className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl px-10 py-2 text-purple-300 hover:text-pink-400 hover:bg-purple-700/20 hover:shadow-purple-700 hover:scale-105 transition-all duration-300 ease-in-out text-lg font-semibold"
        >
          Start Interview
        </a>
      </div>
    </div>
  </div>

  );
}

export default InterviewClient;
