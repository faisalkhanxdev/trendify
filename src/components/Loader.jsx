import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Loader = ({ fullscreen = false, size = "md", text = "Loading..." }) => {
  const sizeMap = {
    sm: 40,
    md: 56,
    lg: 72,
  };

  const dotSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      aria-label={fullscreen ? "Loading screen" : "Loading animation"}
      className={`flex flex-col items-center justify-center ${
        fullscreen
          ? "fixed inset-0 bg-linear-to-br from-gray-50 to-white backdrop-blur-sm z-50"
          : "py-20"
      }`}
    >
      {/* Background Decoration */}
      {fullscreen && (
        <>
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20 -z-10 animate-pulse" />
        </>
      )}

      {/* Main Loader Container */}
      <div className="relative">
        {/* Outer Ring with linear */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            background: "linear-linear(to right, #3b82f6, #8b5cf6)",
            padding: "3px",
          }}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
          }}
        >
          <div className="w-full h-full bg-white rounded-full" />
        </motion.div>

        {/* Inner Spinning Ring */}
        <motion.div
          className="rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            border: "4px solid transparent",
            borderTopColor: "#3b82f6",
            borderRightColor: "#8b5cf6",
          }}
          animate={{ rotate: -360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        />

        {/* Center Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-6 h-6 text-blue-600" />
        </motion.div>
      </div>

      {/* Text with Animation */}
      {text && (
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-lg font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {text}
          </p>

          {/* Animated Dots */}
          <div className="flex items-center justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-linear-to-r from-blue-600 to-purple-600 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Subtle Pulse Effect */}
      <motion.div
        className="absolute rounded-full bg-linear-to-r from-blue-400/20 to-purple-400/20 blur-xl"
        style={{
          width: dotSize * 1.5,
          height: dotSize * 1.5,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default Loader;
