import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { movieService } from "@/services/api/movieService";
import TheaterList from "@/components/organisms/TheaterList";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Rating from "@/components/atoms/Rating";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTheaters, setShowTheaters] = useState(false);

  useEffect(() => {
    if (id) {
      loadMovie();
    }
  }, [id]);

  const loadMovie = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await movieService.getById(id);
      setMovie(data);
    } catch (err) {
      setError(err.message || "Movie not found");
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    setShowTheaters(true);
  };

  const handleTheaterSelect = ({ theater, showtime }) => {
    navigate(`/booking/${movie.Id}/${theater.Id}/${encodeURIComponent(showtime)}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <Loading message="Loading movie details..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Error message={error} onRetry={loadMovie} />
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Error 
            title="Movie not found"
            message="The movie you're looking for doesn't exist or has been removed."
            showRetry={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Movie Poster */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-80 h-[480px] object-cover rounded-xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <ApperIcon name="Play" className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            </motion.div>

            {/* Movie Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={handleBack}
                className="mb-4"
              >
                <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div>
                <h1 className="text-5xl font-display font-bold text-white mb-4">
                  {movie.title}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <Rating rating={movie.rating} />
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-300">{movie.duration}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-300">{movie.language}</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {movie.genre.map(genre => (
                  <Badge key={genre} variant="primary">
                    {genre}
                  </Badge>
                ))}
              </div>

              {/* Description */}
              <p className="text-lg text-gray-300 leading-relaxed">
                {movie.description}
              </p>

              {/* Release Date */}
              <div className="flex items-center gap-3 text-gray-400">
                <ApperIcon name="Calendar" className="w-5 h-5" />
                <span>Released on {new Date(movie.releaseDate).toLocaleDateString()}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={handleBookNow}
                  className="text-lg px-8 py-4"
                >
                  <ApperIcon name="Ticket" className="w-6 h-6 mr-2" />
                  Book Tickets
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-lg px-8 py-4"
                >
                  <ApperIcon name="Heart" className="w-6 h-6 mr-2" />
                  Add to Wishlist
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Theater Selection */}
      {showTheaters && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface/30">
          <div className="max-w-6xl mx-auto">
            <TheaterList
              movieId={movie.Id}
              onTheaterSelect={handleTheaterSelect}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default MovieDetails;