"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Robot from '../components/ui/Robot';
export default function Home() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Left side - Content */}
      <div className="w-1/2 flex flex-col justify-center px-10">
        <motion.h1
          className="text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hi, I’m <span className="text-blue-400">Mocksy</span><br />
          Welcome to the <span className="text-purple-500">Universe</span> of Mock Interviews!
        </motion.h1>
        <motion.p
          className="text-lg mb-8 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
Practice AI-powered mock interviews, apply for jobs, prepare for interviews, and sharpen your coding skills — all in one place!        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Button className="bg-white text-black border-gray-300 hover:bg-white hover:text-black hover:cursor-pointer " onClick={() => router.push("/dashboard")}>
            Enter into the Universe
          </Button>
        </motion.div>
      </div>

      {/* Right side - Robot Image */}
      <div className="w-1/2 flex items-center justify-center relative">
      <Robot />

      </div>
    </div>
  );
}
