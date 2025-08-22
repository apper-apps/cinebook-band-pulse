import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { movieService } from "@/services/api/movieService";
import { theaterService } from "@/services/api/theaterService";
import { bookingService } from "@/services/api/bookingService";
import SeatSelection from "@/components/organisms/SeatSelection";
import BookingSummary from "@/components/molecules/BookingSummary";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";

const Booking = () => {
  const { movieId, theaterId, showtime } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [theater, setTheater] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(false);

  const decodedShowtime = decodeURIComponent(showtime);

  useEffect(() => {
    loadBookingData();
  }, [movieId, theaterId]);

  const loadBookingData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [movieData, theaterData] = await Promise.all([
        movieService.getById(movieId),
        theaterService.getById(theaterId)
      ]);
      
      setMovie(movieData);
      setTheater(theaterData);
    } catch (err) {
      setError(err.message || "Failed to load booking data");
    } finally {
      setLoading(false);
    }
  };

  const handleSeatSelect = (seat) => {
    setSelectedSeats(prev => {
      const isSelected = prev.some(s => s.Id === seat.Id);
      if (isSelected) {
        return prev.filter(s => s.Id !== seat.Id);
      } else {
        if (prev.length >= 6) {
          toast.warning("You can select maximum 6 seats at a time");
          return prev;
        }
        return [...prev, seat];
      }
    });
  };

  const handleProceedToPayment = async () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }

    try {
      setBooking(true);
      
      const totalPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);
      const finalPrice = totalPrice + 2.50 + (totalPrice * 0.08); // Add fees and tax
      
      const bookingData = {
        movieId: parseInt(movieId),
        theaterId: parseInt(theaterId),
        showtime: decodedShowtime,
        seats: selectedSeats.map(seat => `${seat.row}${seat.number}`),
        totalPrice: finalPrice
      };

      const newBooking = await bookingService.create(bookingData);
      
      toast.success("🎉 Booking confirmed successfully!");
      navigate(`/booking-success/${newBooking.Id}`);
      
    } catch (err) {
      toast.error(err.message || "Failed to complete booking");
    } finally {
      setBooking(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) {
    return <Loading message="Preparing your booking..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Error message={error} onRetry={loadBookingData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="mb-4"
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              Select Your Seats
            </h1>
            <p className="text-gray-400">
              {movie?.title} • {theater?.name} • {decodedShowtime}
            </p>
          </div>
          
          {selectedSeats.length > 0 && (
            <div className="hidden lg:block">
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {selectedSeats.length} {selectedSeats.length === 1 ? "Seat" : "Seats"} Selected
                </div>
                <div className="text-sm text-gray-400">
                  {selectedSeats.map(seat => `${seat.row}${seat.number}`).join(", ")}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Selection */}
          <div className="lg:col-span-2">
            <SeatSelection
              theaterId={theaterId}
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
            />
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <BookingSummary
              movie={movie}
              theater={theater}
              showtime={decodedShowtime}
              selectedSeats={selectedSeats}
              onProceed={handleProceedToPayment}
              onCancel={handleCancel}
            />
          </div>
        </div>

        {/* Mobile Booking Bar */}
        {selectedSeats.length > 0 && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-800 p-4 z-50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-white font-semibold">
                  {selectedSeats.length} {selectedSeats.length === 1 ? "Seat" : "Seats"} Selected
                </div>
                <div className="text-sm text-gray-400">
                  ${(selectedSeats.reduce((total, seat) => total + seat.price, 0) + 2.50 + 
                    (selectedSeats.reduce((total, seat) => total + seat.price, 0) * 0.08)).toFixed(2)}
                </div>
              </div>
              <Button
                onClick={handleProceedToPayment}
                disabled={booking}
                className="min-w-[140px]"
              >
                {booking ? (
                  <>
                    <ApperIcon name="Loader" className="w-4 h-4 mr-2 animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <ApperIcon name="CreditCard" className="w-4 h-4 mr-2" />
                    Book Now
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;