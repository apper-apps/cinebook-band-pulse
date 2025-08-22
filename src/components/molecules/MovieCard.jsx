import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Rating from "@/components/atoms/Rating";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const MovieCard = ({ 
  movie, 
  className,
  showBookButton = true,
  ...props 
}) => {
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate(`/movie/${movie.Id}`);
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    navigate(`/movie/${movie.Id}/book`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          "movie-card group cursor-pointer overflow-hidden",
          className
        )}
        onClick={handleMovieClick}
        {...props}
      >
        {/* Movie Poster */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="gradient-overlay" />
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3">
            <Rating rating={movie.rating} className="bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1" />
          </div>
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <ApperIcon name="Play" className="w-8 h-8 text-white ml-1" />
            </motion.div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-bold text-lg text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-200">
              {movie.title}
            </h3>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
              {movie.description}
            </p>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-1 mb-3">
            {movie.genre.slice(0, 2).map(genre => (
              <Badge key={genre} variant="default" className="text-xs">
                {genre}
              </Badge>
            ))}
            {movie.genre.length > 2 && (
              <Badge variant="default" className="text-xs">
                +{movie.genre.length - 2}
              </Badge>
            )}
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <ApperIcon name="Clock" className="w-4 h-4" />
                <span>{movie.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <ApperIcon name="Globe" className="w-4 h-4" />
                <span>{movie.language}</span>
              </div>
            </div>
          </div>

          {/* Book Now Button */}
          {showBookButton && (
            <Button
              onClick={handleBookNow}
              className="w-full"
              size="sm"
            >
              <ApperIcon name="Ticket" className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default MovieCard;