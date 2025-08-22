import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  className,
  title = "Nothing here yet",
  description = "It looks like there's nothing to show at the moment.",
  icon = "Film",
  action,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
      {...props}
    >
      {/* Empty State Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: 0.2, 
          type: "spring", 
          stiffness: 200,
          damping: 15
        }}
        className="w-24 h-24 mb-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center relative overflow-hidden"
      >
        <ApperIcon name={icon} className="w-12 h-12 text-gray-500" />
        
        {/* Animated Background */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
        />
      </motion.div>

      {/* Empty State Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-md"
      >
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 mb-8 leading-relaxed">{description}</p>

        {/* Action */}
        {action && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            {action}
          </motion.div>
        )}
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full"
        />
        <motion.div
          animate={{
            y: [20, -20, 20],
            rotate: [360, 180, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-accent rounded-full"
        />
        <motion.div
          animate={{
            y: [-15, 15, -15],
            x: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-info rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default Empty;