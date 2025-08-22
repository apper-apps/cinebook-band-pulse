import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { bookingService } from "@/services/api/bookingService";
import { movieService } from "@/services/api/movieService";
import { theaterService } from "@/services/api/theaterService";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";

const BookingSuccess = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [movie, setMovie] = useState(null);
  const [theater, setTheater] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (bookingId) {
      loadBookingDetails();
    }
  }, [bookingId]);

  const loadBookingDetails = async () => {
    try {
      setLoading(true);
      setError("");
      
      const bookingData = await bookingService.getById(bookingId);
      setBooking(bookingData);
      
      const [movieData, theaterData] = await Promise.all([
        movieService.getById(bookingData.movieId),
        theaterService.getById(bookingData.theaterId)
      ]);
      
      setMovie(movieData);
      setTheater(theaterData);
    } catch (err) {
      setError(err.message || "Failed to load booking details");
    } finally {
      setLoading(false);
    }
  };

  const handleBackHome = () => {
    navigate("/");
  };

  const handleViewBookings = () => {
    navigate("/bookings");
  };

  if (loading) {
    return <Loading message="Loading your booking details..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Error message={error} onRetry={loadBookingDetails} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-success to-success/80 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Check" className="w-12 h-12 text-white" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-display font-bold text-white mb-4"
          >
            Booking Confirmed! 🎉
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-400"
          >
            Your tickets have been booked successfully
          </motion.p>
        </motion.div>

        {/* Booking Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-8 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Booking ID: #{booking?.Id}
              </h2>
              <Badge variant="success" className="text-sm px-3 py-1">
                {booking?.status}
              </Badge>
            </div>

            {/* Movie & Theater Info */}
            {movie && theater && (
              <div className="space-y-6">
                {/* Movie Details */}
                <div className="flex gap-4 p-4 bg-gray-900/50 rounded-lg">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-20 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {movie.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {movie.genre.slice(0, 3).map(genre => (
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

                {/* Booking Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Theater</div>
                      <div className="text-white font-medium">{theater.name}</div>
                      <div className="text-sm text-gray-400">{theater.address}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Show Date & Time</div>
                      <div className="text-white font-medium">
                        Today • {booking?.showtime}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Seats</div>
                      <div className="text-white font-medium">
                        {booking?.seats?.join(", ")}
                      </div>
                      <div className="text-sm text-gray-400">
                        {booking?.seats?.length} {booking?.seats?.length === 1 ? "seat" : "seats"}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Total Amount</div>
                      <div className="text-2xl font-bold text-primary">
                        ${booking?.totalPrice?.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Booking Date */}
            <div className="mt-6 pt-6 border-t border-gray-800 text-center">
              <div className="text-sm text-gray-400">
                Booked on {new Date(booking?.bookingDate).toLocaleDateString()} at{" "}
                {new Date(booking?.bookingDate).toLocaleTimeString()}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            onClick={handleViewBookings}
            className="px-8"
          >
            <ApperIcon name="Ticket" className="w-5 h-5 mr-2" />
            View My Bookings
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleBackHome}
            className="px-8"
          >
            <ApperIcon name="Home" className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </motion.div>

        {/* Important Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 p-6 bg-accent/10 border border-accent/20 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <ApperIcon name="Info" className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h4 className="text-accent font-semibold mb-2">Important Information</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Please arrive at the theater at least 15 minutes before showtime</li>
                <li>• Carry a valid ID proof for verification at the theater</li>
                <li>• Screenshots or printed tickets are accepted</li>
                <li>• Outside food and beverages are not allowed</li>
                <li>• For any issues, contact theater staff or our support team</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Confetti Animation */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: -10,
                rotate: 0,
                opacity: 1
              }}
              animate={{ 
                y: window.innerHeight + 10,
                rotate: 360,
                opacity: 0
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
              className="absolute w-2 h-2 bg-primary rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;