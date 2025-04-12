"use client";
import { db } from '@/utils/db';
import { MockInterview, UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Webcam from 'react-webcam';
import { Camera, Mic, Volume2, Square } from 'lucide-react';
import useSpeechToText from 'react-hook-speech-to-text';
import { Toaster, toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAI';
import { useUser } from '@clerk/nextjs';

function Page() {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Added for getInterviewDetails
  const [isSaving, setIsSaving] = useState(false); // Renamed from loading
  const { interviewId } = useParams();
  const { user } = useUser();
  const router = useRouter();
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [activeQuestionIndex]: (prevAnswers[activeQuestionIndex] || '') + results[results.length - 1]?.transcript || '',
      }));
    }
  }, [results, activeQuestionIndex]);

  useEffect(() => {
    getInterviewDetails();
  }, [interviewId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    };
  }, [activeQuestionIndex]);

  const getInterviewDetails = async () => {
    try {
      setIsLoading(true);
      if (!interviewId) {
        toast.error('Invalid interview ID.');
        return;
      }
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId.trim()));
      if (result.length > 0) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
      } else {
        toast.error('Interview not found.');
      }
    } catch (err) {
      console.error('Error fetching interview details:', err);
      toast.error('Failed to load interview questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const speakQuestion = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else if (mockInterviewQuestion && mockInterviewQuestion[activeQuestionIndex]) {
      const utterance = new SpeechSynthesisUtterance(
        mockInterviewQuestion[activeQuestionIndex].question
      );
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleNext = () => {
    if (mockInterviewQuestion && activeQuestionIndex < mockInterviewQuestion.length - 1) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (activeQuestionIndex > 0) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };

  const handleQuestionSelect = (index) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setActiveQuestionIndex(index);
  };

  const SaveUserAnswer = async () => {
    if (isRecording) {
      setIsSaving(true);
      stopSpeechToText();
      const currentAnswer = userAnswers[activeQuestionIndex]?.trim() || '';
      if (currentAnswer.length < 10) {
        setIsSaving(false);
        toast.error('Your answer is too short. Please record again.');
        return;
      }
      try {
        const feedbackPrompt = `
          Question: ${mockInterviewQuestion[activeQuestionIndex].question}
          User Answer: ${currentAnswer}
          Based on the question and user answer, provide a rating (out of 10) and feedback for areas to improve in 3-5 lines.
          Return the response in JSON format with "rating" and "feedback" fields, addressing the user directly.
        `;
        const res = await chatSession.sendMessage(feedbackPrompt);
        const mockJSONResp = res.response.text().replace(/```json|```/g, '');
        const jsonFeedback = JSON.parse(mockJSONResp);

        if (!user?.primaryEmailAddress?.emailAddress) {
          throw new Error('User email not found.');
        }

        // Normalize feedback
        let feedbackText = jsonFeedback.feedback;
        if (Array.isArray(feedbackText)) {
          feedbackText = feedbackText.join(' ');
        } else if (typeof feedbackText === 'object' && feedbackText !== null) {
          feedbackText = Object.values(feedbackText).join(' ');
        } else {
          feedbackText = String(feedbackText || 'No feedback provided.');
        }

        const resp = await db.insert(UserAnswer).values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex].question,
          correctAns: mockInterviewQuestion[activeQuestionIndex].answer || 'N/A',
          userAns: currentAnswer,
          feedback: feedbackText,
          rating: jsonFeedback.rating?.toString() || 'N/A',
          userEmail: user.primaryEmailAddress.emailAddress,
          createdAt: new Date(), // Matches timestamp schema
        });

        if (resp) {
          toast.success('Answer saved successfully!');
          setUserAnswers((prev) => {
            const updated = { ...prev };
            delete updated[activeQuestionIndex]; // Clear current answer
            return updated;
          });
        }
      } catch (err) {
        console.error('Error saving answer:', err);
        toast.error('Failed to save answer. Please try again.');
      } finally {
        setIsSaving(false);
      }
    } else {
      startSpeechToText();
    }
  };

  const handleSubmit = () => {
    if (isSaving) return;
    router.push(`/dashboard/interview/${interviewId}/results`);
  };

  const buttonStyles =
    'backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl px-6 py-2 text-purple-300 hover:text-pink-400 hover:bg-purple-700/20 hover:shadow-purple-700 hover:scale-105 transition-all duration-300 ease-in-out text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed';
  const smallButtonStyles =
    'backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl px-4 py-1 text-purple-300 hover:text-pink-400 hover:bg-purple-700/20 hover:shadow-purple-700 hover:scale-105 transition-all duration-300 ease-in-out text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className="min-h-screen bg-black py-6 px-6">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8 animate-pulse">
        Mock Interview Questions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left Panel - Questions */}
        <div className="w-full max-w-lg">
          {isLoading ? (
            <p className="text-purple-300 text-center text-sm">Loading interview...</p>
          ) : mockInterviewQuestion && mockInterviewQuestion[activeQuestionIndex] ? (
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-purple-700 hover:scale-105 transition-all duration-300 ease-in-out">
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {mockInterviewQuestion.map((_, index) => (
                  <button
                    key={index}
                    className={`backdrop-blur-sm border border-white/20 rounded-xl px-3 py-1 text-purple-300 hover:text-pink-400 hover:bg-purple-700/20 hover:shadow-purple-700 hover:scale-105 transition-all duration-300 ease-in-out text-xs font-semibold ${
                      activeQuestionIndex === index
                        ? 'bg-purple-700/30 text-pink-400'
                        : 'bg-white/10'
                    }`}
                    onClick={() => handleQuestionSelect(index)}
                  >
                    Question {index + 1}
                  </button>
                ))}
              </div>
              <h3 className="text-lg font-semibold text-center text-white mb-4">
                Question {activeQuestionIndex + 1}
              </h3>
              <p className="text-purple-300 text-sm text-center">
                {mockInterviewQuestion[activeQuestionIndex].question}
              </p>
              <div className="flex justify-center mt-4">
                <button
                  className={`${smallButtonStyles} flex items-center gap-2`}
                  onClick={speakQuestion}
                  disabled={!mockInterviewQuestion || !mockInterviewQuestion[activeQuestionIndex]}
                >
                  {isSpeaking ? (
                    <>
                      <Square className="h-4 w-4" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4" />
                      Speak
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-purple-300 text-center text-sm">No questions available.</p>
          )}

          <div className="flex justify-center gap-4 mt-8">
            <button
              className={buttonStyles}
              onClick={handlePrevious}
              disabled={activeQuestionIndex === 0}
            >
              Previous
            </button>
            {activeQuestionIndex < (mockInterviewQuestion?.length - 1 || 0) ? (
              <button
                className={buttonStyles}
                onClick={handleNext}
                disabled={
                  !mockInterviewQuestion ||
                  activeQuestionIndex === mockInterviewQuestion.length - 1
                }
              >
                Next
              </button>
            ) : (
              <button
                className={buttonStyles}
                onClick={handleSubmit}
                disabled={isSaving || isLoading}
              >
                Submit
              </button>
            )}
          </div>
        </div>

        {/* Right Panel - Webcam and Recording */}
        <div className="w-full">
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-purple-700 hover:scale-105 transition-all duration-300 ease-in-out h-full flex flex-col items-center">
            {webCamEnabled ? (
              <Webcam
                audio
                mirrored
                className="rounded-xl"
                style={{ height: 300, width: 300 }}
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => {
                  setWebCamEnabled(false);
                  toast.error('Failed to access webcam. Please check permissions.');
                }}
              />
            ) : (
              <div className="h-[300px] w-[300px] flex items-center justify-center bg-white/5 rounded-xl border border-dashed border-purple-300">
                <Camera className="h-20 w-20 text-purple-300" />
              </div>
            )}
            <button
              className={`${buttonStyles} w-full mt-6`}
              onClick={() => setWebCamEnabled(!webCamEnabled)}
            >
              {webCamEnabled ? 'Disable Camera' : 'Enable Camera'}
            </button>

            <div className="w-full mt-6 space-y-4">
              <button
                className={`${buttonStyles} w-full flex items-center justify-center gap-2`}
                onClick={SaveUserAnswer}
                disabled={isSaving}
              >
                <Mic className="h-5 w-5" />
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
              <div className="text-purple-300 text-sm">
                <p>Recording: {isRecording.toString()}</p>
                {error && <p className="text-red-400">Error: {error}</p>}
                {interimResult && <p>Live: {interimResult}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Page;