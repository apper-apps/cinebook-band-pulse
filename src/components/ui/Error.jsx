import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  className, 
  title = "Something went wrong",
  message = "We encountered an error while loading your content. Please try again.",
  onRetry,
  showRetry = true 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex flex-col items-center justify-center py-12 px-6 text-center",
        className
      )}
    >
      {/* Error Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 mb-6 bg-error/20 rounded-full flex items-center justify-center"
      >
        <ApperIcon name="AlertCircle" className="w-10 h-10 text-error" />
      </motion.div>

      {/* Error Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-md"
      >
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 mb-6 leading-relaxed">{message}</p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRetry && onRetry && (
            <Button onClick={onRetry} className="min-w-[140px]">
              <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
          <Button 
            variant="ghost" 
            onClick={() => window.location.reload()}
            className="min-w-[140px]"
          >
            <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
            Refresh Page
          </Button>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-error/5 to-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr from-accent/5 to-error/5 rounded-full blur-3xl"
        />
      </div>
    </motion.div>
  );
};

export default Error;