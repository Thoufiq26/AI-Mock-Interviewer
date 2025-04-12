"use client";
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Toaster, toast } from 'sonner';

function ResultsPage() {
  const [answers, setAnswers] = useState([]);
  const { interviewId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        setLoading(true);
        const result = await db
          .select()
          .from(UserAnswer)
          .where(eq(UserAnswer.mockIdRef, interviewId.trim()));

        if (result.length > 0) {
          setAnswers(result);
        } else {
          toast.error('No answers found for this interview.');
        }
      } catch (err) {
        console.error('Error fetching answers:', err);
        toast.error('Failed to load answers. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [interviewId]);

  return (
    <div className="min-h-screen bg-black py-6 px-6">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8 animate-pulse">
        Interview Results
      </h2>

      <div className="max-w-4xl mx-auto">
        {loading ? (
          <p className="text-purple-300 text-center text-sm">Loading results...</p>
        ) : answers.length === 0 ? (
          <p className="text-purple-300 text-center text-sm">No answers recorded yet.</p>
        ) : (
          <div className="space-y-6">
            {answers.map((answer, index) => (
              <div
                key={index}
                className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-purple-700 hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  Question {index + 1}
                </h3>
                <p className="text-purple-300 text-sm mb-2">
                  <span className="text-pink-500 font-semibold">Question:</span> {answer.question}
                </p>
                <p className="text-purple-300 text-sm mb-2">
                  <span className="text-blue-500 font-semibold">Your Answer:</span> {answer.userAns}
                </p>
                <p className="text-purple-300 text-sm mb-2">
                  <span className="text-green-300 font-semibold">Correct Answer:</span> {answer.correctAns}
                </p>
                <p className="text-sm mb-2">
  <span
    className={
      answer.rating > 5
        ? 'text-green-400 font-semibold'
        : 'text-red-400 font-semibold'
    }
  >
    Rating:
  </span>{' '}
  <span
    className={
      answer.rating > 5 ? 'text-green-400 font-bold' : 'text-red-400 font-bold'
    }
  >
    {answer.rating}/10
  </span>
</p>
                {answer.feedback && (
                  <p className="text-purple-300 text-sm">
                    <span className=" text-yellow-500 font-semibold">Feedback:</span> {answer.feedback}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default ResultsPage;