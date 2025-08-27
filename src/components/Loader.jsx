import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 backdrop-blur-sm z-[9999] flex flex-col justify-center items-center">
      {/* Main Loading Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Al-Azhar Crescent Moon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-16 h-16"
        >
          {/* Crescent Shape */}
          <motion.div
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            {/* Outer Crescent */}
            <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" />
            {/* Inner Crescent (creates the crescent shape) */}
            <div className="absolute top-1 left-1 w-14 h-14 bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Al-Azhar Geometric Rings */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 border-2 border-emerald-300 rounded-full"
        />

        <motion.div
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.2, 0, 0.2],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5,
          }}
          className="absolute inset-0 border-2 border-teal-300 rounded-full"
        />

        {/* Al-Azhar Star Pattern */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-8 h-8 relative">
            {/* 8-pointed star */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, index) => (
              <motion.div
                key={index}
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1,
                }}
                className="absolute top-1/2 left-1/2 w-1 h-4 bg-emerald-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                style={{ transformOrigin: 'center', transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Al-Azhar University Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 text-center"
      >
        {/* University Name */}
        <motion.h2
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-xl font-bold text-emerald-700 mb-1"
        >
          Al-Azhar University
        </motion.h2>

        {/* Loading Text */}
        <motion.h3
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-lg font-semibold text-gray-700 mb-2"
        >
          Loading Medical Education Platform
        </motion.h3>

        {/* Subtitle */}
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-sm text-gray-600 mb-3"
        >
          Excellence in Islamic Medical Education
        </motion.p>

        {/* Islamic Pattern Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
              className="w-2 h-2 bg-emerald-500 rounded-full"
            />
          ))}
        </div>
      </motion.div>

      {/* Al-Azhar Geometric Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-full h-full opacity-5"
        >
          {/* Islamic Geometric Shapes */}
          <div className="absolute top-10 left-10 w-32 h-32 border border-emerald-200 rounded-full" />
          <div className="absolute top-20 right-20 w-24 h-24 border border-teal-200 rounded-full" />
          <div className="absolute bottom-20 left-20 w-20 h-20 border border-emerald-200 rounded-full" />
          <div className="absolute bottom-10 right-10 w-28 h-28 border border-teal-200 rounded-full" />

          {/* Islamic Star Patterns */}
          <div className="absolute top-1/4 left-1/4 w-16 h-16">
            <div className="w-full h-full border border-emerald-200 transform rotate-45" />
            <div className="absolute inset-0 border border-teal-200 transform -rotate-45" />
          </div>

          <div className="absolute bottom-1/4 right-1/4 w-12 h-12">
            <div className="w-full h-full border border-teal-200 transform rotate-45" />
            <div className="absolute inset-0 border border-emerald-200 transform -rotate-45" />
          </div>
        </motion.div>
      </div>

      {/* Al-Azhar Calligraphy-inspired Elements */}
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
      >
        {/* Decorative Islamic patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="w-full h-full border border-emerald-200 rounded-full" />
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-teal-200 rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-1/4 h-1/4 border border-emerald-200 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </motion.div>

      {/* Al-Azhar University Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-emerald-200 shadow-lg">
          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-xs font-medium text-emerald-700"
          >
            Founded 970 CE • Islamic Medical Excellence
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Loader;

