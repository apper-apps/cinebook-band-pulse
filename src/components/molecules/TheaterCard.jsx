import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const TheaterCard = ({ 
  theater, 
  selectedShowtime,
  onShowtimeSelect,
  onBookNow,
  className,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("p-6", className)} {...props}>
        {/* Theater Info */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2">{theater.name}</h3>
          <div className="flex items-center gap-2 text-gray-400">
            <ApperIcon name="MapPin" className="w-4 h-4" />
            <span className="text-sm">{theater.address}</span>
          </div>
        </div>

        {/* Showtimes */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
            Available Shows
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {theater.showtimes.map(time => (
              <button
                key={time}
                onClick={() => onShowtimeSelect && onShowtimeSelect(time)}
                className={cn(
                  "px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200",
                  selectedShowtime === time
                    ? "bg-primary border-primary text-white"
                    : "bg-transparent border-gray-600 text-gray-300 hover:border-primary hover:text-primary"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Book Button */}
        {selectedShowtime && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={() => onBookNow && onBookNow(theater, selectedShowtime)}
              className="w-full"
              size="lg"
            >
              <ApperIcon name="ArrowRight" className="w-5 h-5 mr-2" />
              Select Seats for {selectedShowtime}
            </Button>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default TheaterCard;