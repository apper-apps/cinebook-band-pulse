import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text", 
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "w-full px-4 py-3 bg-surface border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;