import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Rating = forwardRef(({ 
  className, 
  rating, 
  maxRating = 10, 
  showValue = true,
  ...props 
}, ref) => {
  const percentage = (rating / maxRating) * 100;
  
  const getRatingColor = (rating) => {
    if (rating >= 8) return "text-success";
    if (rating >= 6) return "text-accent";
    return "text-error";
  };

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <div className="flex items-center">
        <ApperIcon 
          name="Star" 
          className={cn("w-4 h-4 fill-current", getRatingColor(rating))}
        />
      </div>
      {showValue && (
        <span className={cn("text-sm font-semibold", getRatingColor(rating))}>
          {rating}
        </span>
      )}
    </div>
  );
});

Rating.displayName = "Rating";

export default Rating;