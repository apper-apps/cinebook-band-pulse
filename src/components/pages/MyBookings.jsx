import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { bookingService } from "@/services/api/bookingService";
import { movieService } from "@/services/api/movieService";
import { theaterService } from "@/services/api/theaterService";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [enrichedBookings, setEnrichedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError("");
      
      const bookingsData = await bookingService.getUserBookings();
      setBookings(bookingsData);
      
      // Enrich bookings with movie and theater data
      const enriched = await Promise.all(
        bookingsData.map(async (booking) => {
          try {
            const [movie, theater] = await Promise.all([
              movieService.getById(booking.movieId),
              theaterService.getById(booking.theaterId)
            ]);
            return { ...booking, movie, theater };
          } catch (err) {
            console.error("Failed to enrich booking:", err);
            return { ...booking, movie: null, theater: null };
          }
        })
      );
      
      setEnrichedBookings(enriched.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)));
    } catch (err) {
      setError(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return <Loading message="Loading your bookings..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Error message={error} onRetry={loadBookings} />
        </div>
      </div>
    );
  }

  if (enrichedBookings.length === 0) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Empty
            title="No bookings found"
            description="You haven't made any movie bookings yet. Start exploring movies and book your first show!"
            icon="Ticket"
            action={
              <Button
                size="lg"
                onClick={() => navigate("/movies")}
              >
                <ApperIcon name="Film" className="w-5 h-5 mr-2" />
                Browse Movies
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold text-white mb-4">
            My Bookings
          </h1>
          <p className="text-xl text-gray-400">
            View and manage your movie ticket bookings
          </p>
        </motion.div>

        {/* Bookings List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {enrichedBookings.map((booking, index) => (
            <motion.div
              key={booking.Id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-2xl transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Movie Info */}
                  <div className="lg:col-span-2">
                    <div className="flex gap-4">
                      {booking.movie ? (
                        <img
                          src={booking.movie.poster}
                          alt={booking.movie.title}
                          className="w-20 h-24 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-20 h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                          <ApperIcon name="Film" className="w-8 h-8 text-gray-600" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-white">
                            {booking.movie?.title || "Unknown Movie"}
                          </h3>
                          <Badge variant={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <ApperIcon name="MapPin" className="w-4 h-4" />
                            <span>{booking.theater?.name || "Unknown Theater"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ApperIcon name="Calendar" className="w-4 h-4" />
                            <span>{booking.showtime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ApperIcon name="Armchair" className="w-4 h-4" />
                            <span>{booking.seats?.join(", ")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm text-gray-400">Booking ID</div>
                      <div className="text-white font-mono">#{booking.Id}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Amount Paid</div>
                      <div className="text-xl font-bold text-primary">
                        ${booking.totalPrice?.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Booked On</div>
                      <div className="text-sm text-gray-300">
                        {formatDate(booking.bookingDate)}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 justify-center">
                    <Button
                      size="sm"
                      onClick={() => navigate(`/booking-success/${booking.Id}`)}
                    >
                      <ApperIcon name="Eye" className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {booking.movie && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/movie/${booking.movie.Id}`)}
                      >
                        <ApperIcon name="Film" className="w-4 h-4 mr-2" />
                        View Movie
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Ticket" className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {enrichedBookings.length}
            </div>
            <div className="text-gray-400">Total Bookings</div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="CheckCircle" className="w-6 h-6 text-success" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {enrichedBookings.filter(b => b.status === "confirmed").length}
            </div>
            <div className="text-gray-400">Confirmed</div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="DollarSign" className="w-6 h-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              ${enrichedBookings.reduce((total, booking) => total + (booking.totalPrice || 0), 0).toFixed(2)}
            </div>
            <div className="text-gray-400">Total Spent</div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default MyBookings;