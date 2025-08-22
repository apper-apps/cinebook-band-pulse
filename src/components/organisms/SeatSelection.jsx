import { useState, useEffect } from "react";
import { seatService } from "@/services/api/seatService";
import SeatGrid from "@/components/molecules/SeatGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const SeatSelection = ({ 
  theaterId, 
  selectedSeats = [],
  onSeatSelect,
  className 
}) => {
  const [seatMap, setSeatMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (theaterId) {
      loadSeatMap();
    }
  }, [theaterId]);

  const loadSeatMap = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await seatService.generateSeatMap(theaterId);
      setSeatMap(data);
    } catch (err) {
      setError(err.message || "Failed to load seat map");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadSeatMap} />;
  }

  if (Object.keys(seatMap).length === 0) {
    return (
      <Empty
        title="No seats available"
        description="Seat map is not available for this theater."
      />
    );
  }

  return (
    <div className={className}>
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Select Your Seats
        </h2>
        <p className="text-gray-400">
          Click on available seats to select them
        </p>
      </div>

      <SeatGrid
        seatMap={seatMap}
        selectedSeats={selectedSeats}
        onSeatSelect={onSeatSelect}
      />
    </div>
  );
};

export default SeatSelection;