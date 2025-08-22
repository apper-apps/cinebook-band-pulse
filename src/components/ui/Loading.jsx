import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Loading = ({ className, message = "Loading amazing content..." }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12", className)}>
      {/* Animated Film Reel */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 mb-6"
      >
        <div className="w-full h-full bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center relative">
          <div className="w-6 h-6 bg-background rounded-full" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-background rounded-full" />
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-background rounded-full" />
          <div className="absolute top-2 left-2 w-2 h-2 bg-background rounded-full" />
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-background rounded-full" />
        </div>
      </motion.div>

      {/* Loading Text */}
      <motion.h3
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="text-xl font-semibold text-white mb-2"
      >
        {message}
      </motion.h3>

      {/* Loading Dots */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="w-2 h-2 bg-primary rounded-full"
          />
        ))}
      </div>

      {/* Skeleton Content */}
      <div className="w-full max-w-4xl mt-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-surface rounded-xl overflow-hidden">
                <div className="aspect-[3/4] bg-gray-800" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-800 rounded w-1/2" />
                  <div className="flex gap-1">
                    <div className="h-5 bg-gray-800 rounded w-12" />
                    <div className="h-5 bg-gray-800 rounded w-16" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;