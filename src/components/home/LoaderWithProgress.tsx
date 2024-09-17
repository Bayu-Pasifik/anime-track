import React from "react";
import { motion } from "framer-motion";

interface LoaderWithProgressProps {
  progress: number;
}

const LoaderWithProgress: React.FC<LoaderWithProgressProps> = ({
  progress,
}) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {/* Circular Loader Container */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Circular background (static circle) */}
        <svg className="w-40 h-40" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="10"
            stroke="#2d3748" // Static grey background circle
            fill="none"
          />
        </svg>

        {/* Circular progress (dynamic, animated circle) */}
        <motion.svg
          className="w-40 h-40 absolute"
          viewBox="0 0 100 100"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="10"
            stroke="#2563EB" // Dynamic circle color (e.g., slate-900)
            fill="none"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress) / 100} // Calculate stroke offset based on progress
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
            transition={{ duration: 0.5 }}
          />
        </motion.svg>

        {/* Animated number inside the circle with pulse effect */}
        <motion.div
          className="absolute text-white text-2xl font-semibold text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <p>Loading</p>
          <p>{progress}%</p>
        </motion.div>
      </div>

      {/* Animated "Please wait while we load your data" with pulse effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <p className="text-white text-2xl font-semibold text-center">
          Please wait while we load your data
        </p>
      </motion.div>
    </div>
  );
};

export default LoaderWithProgress;
