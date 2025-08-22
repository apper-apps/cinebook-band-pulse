import { useState, useEffect } from "react";
import { theaterService } from "@/services/api/theaterService";
import TheaterCard from "@/components/molecules/TheaterCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const TheaterList = ({ 
  movieId, 
  onTheaterSelect,
  selectedTheater,
  selectedShowtime,
  className 
}) => {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showtimeSelections, setShowtimeSelections] = useState({});

  useEffect(() => {
    if (movieId) {
      loadTheaters();
    }
  }, [movieId]);

  const loadTheaters = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await theaterService.getTheatersForMovie(movieId);
      setTheaters(data);
    } catch (err) {
      setError(err.message || "Failed to load theaters");
    } finally {
      setLoading(false);
    }
  };

  const handleShowtimeSelect = (theaterId, showtime) => {
    setShowtimeSelections(prev => ({
      ...prev,
      [theaterId]: showtime
    }));
  };

  const handleBookNow = (theater, showtime) => {
    if (onTheaterSelect) {
      onTheaterSelect({
        theater,
        showtime
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadTheaters} />;
  }

  if (theaters.length === 0) {
    return (
      <Empty
        title="No theaters found"
        description="This movie is not currently showing in any theaters."
      />
    );
  }

  return (
    <div className={className}>
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Select Theater & Showtime
        </h2>
        <p className="text-gray-400">
          Choose from {theaters.length} available {theaters.length === 1 ? "theater" : "theaters"}
        </p>
      </div>

      <div className="space-y-4">
        {theaters.map(theater => (
          <TheaterCard
            key={theater.Id}
            theater={theater}
            selectedShowtime={showtimeSelections[theater.Id]}
            onShowtimeSelect={(showtime) => handleShowtimeSelect(theater.Id, showtime)}
            onBookNow={(selectedTheater, showtime) => handleBookNow(selectedTheater, showtime)}
          />
        ))}
      </div>
    </div>
  );
};

export default TheaterList;