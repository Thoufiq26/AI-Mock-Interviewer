import { UserButton } from '@clerk/nextjs';
import React from 'react';
import AddNewInterview from './_components/AddNewInterview';

function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-black py-16 px-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-12 animate-pulse">
        AI Mock Interview Dashboard
      </h1>

      <h2 className="text-center text-gray-400 text-lg mb-8">
        Create and Start Your AI Mock Interview
      </h2>

      <div className="flex justify-center">
        <div className="w-full max-w-md backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-purple-700 hover:scale-[1.02] transition-all duration-300 ease-in-out">
          <h2 className="text-white text-xl font-semibold mb-4 text-center">
             New Interview
          </h2>
          <p className="text-gray-400 text-sm text-center mb-6">
            Click below to begin a new mock interview session powered by AI.
          </p>
          <AddNewInterview />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
