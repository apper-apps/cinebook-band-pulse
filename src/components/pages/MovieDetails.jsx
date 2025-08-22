import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { movieService } from "@/services/api/movieService";
import ApperIcon from "@/components/ApperIcon";
import TheaterList from "@/components/organisms/TheaterList";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import Button from "@/components/atoms/Button";
import Rating from "@/components/atoms/Rating";
import Badge from "@/components/atoms/Badge";

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
    return <Error message={error} onRetry={loadMovie} />;
  }

  if (!movie) {
    return <Error message="Movie not found" />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <Button
                variant="ghost"
onClick={handleBack}
                className="text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
                Back
              </Button>
            </motion.div>

            {/* Movie Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight"
            >
              {movie.title}
            </motion.h1>

            {/* Movie Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 mb-6"
            >
              <div className="flex items-center gap-2">
                <Rating rating={movie.rating} className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1" />
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <ApperIcon name="Clock" className="w-5 h-5" />
                <span className="text-lg">{movie.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <ApperIcon name="Globe" className="w-5 h-5" />
                <span className="text-lg">{movie.language}</span>
              </div>
            </motion.div>

            {/* Genres */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              {movie.genre.map(genre => (
                <Badge key={genre} variant="default" className="text-sm px-3 py-1 bg-primary/20 text-primary border border-primary/30">
                  {genre}
                </Badge>
              ))}
            </motion.div>

            {/* Release Date and Director */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-3 mb-8"
            >
              <div className="flex items-center gap-3 text-gray-300">
                <ApperIcon name="Calendar" className="w-5 h-5" />
                <span className="text-lg">Released on {new Date(movie.releaseDate).toLocaleDateString()}</span>
              </div>
              {movie.director && (
                <div className="flex items-center gap-3 text-gray-300">
                  <ApperIcon name="User" className="w-5 h-5" />
                  <span className="text-lg">Directed by {movie.director}</span>
                </div>
              )}
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl"
            >
              {movie.description}
            </motion.p>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button
                size="lg"
onClick={handleBookNow}
                className="text-lg px-8 py-4 bg-primary hover:bg-primary/90 text-white"
              >
                <ApperIcon name="Ticket" className="w-6 h-6 mr-2" />
                Book Tickets
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-white/70"
          >
            <ApperIcon name="ChevronDown" className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

{/* Theater Selection Section */}
      {showTheaters && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-display font-bold text-white mb-4">
                Select Theater & Showtime
              </h2>
              <p className="text-xl text-gray-400">
                Choose your preferred theater and showtime for {movie.title}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <TheaterList 
                movieId={movie.Id}
                onTheaterSelect={handleTheaterSelect}
              />
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MovieDetails;
