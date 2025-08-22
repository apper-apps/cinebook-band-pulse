import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const SeatGrid = ({ 
  seatMap, 
  selectedSeats = [],
  onSeatSelect,
  className,
  ...props 
}) => {
  const getSeatStatus = (seat) => {
    if (seat.isBooked) return "booked";
    if (selectedSeats.some(selected => selected.Id === seat.Id)) return "selected";
    return "available";
  };

  const getSeatClasses = (status) => {
    switch (status) {
      case "available":
        return "seat seat-available";
      case "selected":
        return "seat seat-selected";
      case "booked":
        return "seat seat-booked";
      default:
        return "seat seat-available";
    }
  };

  const handleSeatClick = (seat) => {
    if (seat.isBooked) return;
    if (onSeatSelect) {
      onSeatSelect(seat);
    }
  };

  return (
    <div className={cn("space-y-6", className)} {...props}>
      {/* Screen */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-full max-w-md h-2 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full mb-2" />
        <span className="text-sm text-gray-400 uppercase tracking-wide">Screen</span>
      </div>

      {/* Seat Map */}
      <div className="space-y-4">
        {Object.entries(seatMap).map(([row, seats]) => (
          <motion.div
            key={row}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: row.charCodeAt(0) * 0.05 }}
            className="flex items-center gap-4"
          >
            {/* Row Label */}
            <div className="w-8 text-center">
              <span className="text-lg font-bold text-gray-400">{row}</span>
            </div>

            {/* Seats */}
            <div className="flex gap-2 flex-1 justify-center">
              {seats.map(seat => {
                const status = getSeatStatus(seat);
                return (
                  <motion.button
                    key={seat.Id}
                    whileHover={status === "available" ? { scale: 1.1 } : {}}
                    whileTap={status === "available" ? { scale: 0.95 } : {}}
                    onClick={() => handleSeatClick(seat)}
                    className={getSeatClasses(status)}
                    disabled={seat.isBooked}
                    title={`Seat ${row}${seat.number} - $${seat.price} (${seat.type})`}
                  >
                    <span className="text-xs font-medium">{seat.number}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Row Label (Right) */}
            <div className="w-8 text-center">
              <span className="text-lg font-bold text-gray-400">{row}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 pt-6 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <div className="seat seat-available" />
          <span className="text-sm text-gray-400">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="seat seat-selected" />
          <span className="text-sm text-gray-400">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="seat seat-booked" />
          <span className="text-sm text-gray-400">Booked</span>
        </div>
      </div>

      {/* Seat Types & Pricing */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-800">
        <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
          <div className="flex items-center gap-2">
            <ApperIcon name="Circle" className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Regular</span>
          </div>
          <span className="text-sm font-semibold text-white">$12.50</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
          <div className="flex items-center gap-2">
            <ApperIcon name="Circle" className="w-4 h-4 text-accent" />
            <span className="text-sm text-gray-300">Premium</span>
          </div>
          <span className="text-sm font-semibold text-white">$18.50</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
          <div className="flex items-center gap-2">
            <ApperIcon name="Circle" className="w-4 h-4 text-primary" />
            <span className="text-sm text-gray-300">VIP</span>
          </div>
          <span className="text-sm font-semibold text-white">$25.00</span>
        </div>
      </div>
    </div>
  );
};

export default SeatGrid;