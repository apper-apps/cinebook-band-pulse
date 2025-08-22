import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { movieService } from "@/services/api/movieService";
import MovieCard from "@/components/molecules/MovieCard";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadFeaturedMovies();
  }, []);

  const loadFeaturedMovies = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await movieService.getAll();
      // Get top 8 movies based on rating
      const featured = data
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);
      setFeaturedMovies(featured);
    } catch (err) {
      setError(err.message || "Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/movies?search=${encodeURIComponent(query)}`);
    }
  };

  if (loading) {
    return <Loading message="Loading featured movies..." />;
  }

  if (error) {
    return <Error message={error} onRetry={loadFeaturedMovies} />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                CineBook
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Your ultimate movie booking experience.<br />
              Discover, book, and enjoy the latest blockbusters.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-lg mx-auto mb-8"
          >
            <SearchBar
              placeholder="Search for movies..."
              onSearch={handleSearch}
              className="text-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => navigate("/movies")}
              className="text-lg px-8 py-4"
            >
              <ApperIcon name="Film" className="w-6 h-6 mr-2" />
              Explore Movies
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/theaters")}
              className="text-lg px-8 py-4"
            >
              <ApperIcon name="MapPin" className="w-6 h-6 mr-2" />
              Find Theaters
            </Button>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/6 w-4 h-4 bg-primary rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [15, -15, 15],
            x: [-10, 10, -10],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/3 right-1/5 w-3 h-3 bg-accent rounded-full blur-sm"
        />
      </section>

      {/* Featured Movies Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Featured Movies
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover the most popular and highest-rated movies currently showing
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {featuredMovies.map((movie, index) => (
              <motion.div
                key={movie.Id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              onClick={() => navigate("/movies")}
              className="px-8 py-4"
            >
              <ApperIcon name="ArrowRight" className="w-5 h-5 mr-2" />
              View All Movies
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Why Choose CineBook?
            </h2>
            <p className="text-xl text-gray-400">
              Experience the future of movie booking
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "Zap",
                title: "Instant Booking",
                description: "Book your tickets in seconds with our streamlined process"
              },
              {
                icon: "Star",
                title: "Premium Experience",
                description: "Choose from regular, premium, and VIP seating options"
              },
              {
                icon: "Shield",
                title: "Secure Payment",
                description: "Your transactions are safe with our secure payment system"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={feature.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;