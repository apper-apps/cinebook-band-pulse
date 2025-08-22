import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const BookingSummary = ({ 
  movie,
  theater,
  showtime,
  selectedSeats = [],
  onProceed,
  onCancel,
  className,
  ...props 
}) => {
  const totalPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);
  const seatNumbers = selectedSeats.map(seat => `${seat.row}${seat.number}`).join(", ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("p-6 sticky top-6", className)} {...props}>
        <h3 className="text-xl font-bold text-white mb-6">Booking Summary</h3>

        {/* Movie Details */}
        {movie && (
          <div className="mb-6 pb-6 border-b border-gray-800">
            <div className="flex gap-4">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-16 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{movie.title}</h4>
                <div className="flex flex-wrap gap-1 mb-2">
                  {movie.genre.slice(0, 2).map(genre => (
                    <Badge key={genre} variant="default" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-gray-400">
                  {movie.duration} • {movie.language}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Details */}
        <div className="space-y-4 mb-6">
          {theater && (
            <div className="flex items-start gap-3">
              <ApperIcon name="MapPin" className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-white font-medium">{theater.name}</div>
                <div className="text-sm text-gray-400">{theater.address}</div>
              </div>
            </div>
          )}

          {showtime && (
            <div className="flex items-center gap-3">
              <ApperIcon name="Clock" className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-white font-medium">{showtime}</div>
                <div className="text-sm text-gray-400">Today</div>
              </div>
            </div>
          )}

          {selectedSeats.length > 0 && (
            <div className="flex items-start gap-3">
              <ApperIcon name="Armchair" className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <div className="text-white font-medium">
                  {selectedSeats.length} {selectedSeats.length === 1 ? "Seat" : "Seats"}
                </div>
                <div className="text-sm text-gray-400">{seatNumbers}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedSeats.map(seat => (
                    <Badge 
                      key={seat.Id} 
                      variant="primary" 
                      className="text-xs"
                    >
                      {seat.row}{seat.number} • ${seat.price}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        {selectedSeats.length > 0 && (
          <div className="border-t border-gray-800 pt-4 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tickets ({selectedSeats.length})</span>
                <span className="text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Convenience Fee</span>
                <span className="text-white">$2.50</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tax</span>
                <span className="text-white">${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-700 pt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-white">Total</span>
                  <span className="text-primary text-lg">
                    ${(totalPrice + 2.50 + totalPrice * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {selectedSeats.length > 0 && onProceed && (
            <Button onClick={onProceed} className="w-full" size="lg">
              <ApperIcon name="CreditCard" className="w-5 h-5 mr-2" />
              Proceed to Payment
            </Button>
          )}
          
          {onCancel && (
            <Button 
              variant="ghost" 
              onClick={onCancel} 
              className="w-full"
            >
              Cancel Booking
            </Button>
          )}
        </div>

        {/* Terms */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            By proceeding, you agree to our Terms of Service and Privacy Policy. 
            Tickets are non-refundable.
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default BookingSummary;