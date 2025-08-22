import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { movieService } from "@/services/api/movieService";
import MovieCard from "@/components/molecules/MovieCard";
import FilterSidebar from "@/components/molecules/FilterSidebar";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const MovieGrid = ({ searchQuery = "", className }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ genres: [], languages: [] });

  useEffect(() => {
    loadMovies();
    loadFilterOptions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [movies, searchQuery, activeFilters]);

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await movieService.getAll();
      setMovies(data);
    } catch (err) {
      setError(err.message || "Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  const loadFilterOptions = async () => {
    try {
      const [genreData, languageData] = await Promise.all([
        movieService.getGenres(),
        movieService.getLanguages()
      ]);
      setGenres(genreData);
      setLanguages(languageData);
    } catch (err) {
      console.error("Failed to load filter options:", err);
    }
  };

  const applyFilters = () => {
    let filtered = [...movies];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply genre filter
    if (activeFilters.genres.length > 0) {
      filtered = filtered.filter(movie =>
        movie.genre.some(g => activeFilters.genres.includes(g))
      );
    }

    // Apply language filter
    if (activeFilters.languages.length > 0) {
      filtered = filtered.filter(movie =>
        activeFilters.languages.includes(movie.language)
      );
    }

    setFilteredMovies(filtered);
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const hasActiveFilters = activeFilters.genres.length > 0 || activeFilters.languages.length > 0;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadMovies} />;
  }

  return (
    <div className={className}>
      <div className="flex">
        {/* Filter Sidebar */}
        <FilterSidebar
          genres={genres}
          languages={languages}
          onFilterChange={handleFilterChange}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          className="lg:block"
        />

        {/* Main Content */}
        <div className="flex-1 lg:pl-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-2">
                {searchQuery ? `Search Results for "${searchQuery}"` : "Now Showing"}
              </h2>
              <p className="text-gray-400">
                {filteredMovies.length} {filteredMovies.length === 1 ? "movie" : "movies"} found
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={toggleFilter}
              className="lg:hidden"
            >
              <ApperIcon name="Filter" className="w-5 h-5 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 w-2 h-2 bg-primary rounded-full" />
              )}
            </Button>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {activeFilters.genres.map(genre => (
                  <span
                    key={genre}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary text-sm rounded-full"
                  >
                    {genre}
                    <button
                      onClick={() => {
                        setActiveFilters(prev => ({
                          ...prev,
                          genres: prev.genres.filter(g => g !== genre)
                        }));
                      }}
                      className="hover:text-white"
                    >
                      <ApperIcon name="X" className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {activeFilters.languages.map(language => (
                  <span
                    key={language}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-accent/20 text-accent text-sm rounded-full"
                  >
                    {language}
                    <button
                      onClick={() => {
                        setActiveFilters(prev => ({
                          ...prev,
                          languages: prev.languages.filter(l => l !== language)
                        }));
                      }}
                      className="hover:text-white"
                    >
                      <ApperIcon name="X" className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Movies Grid */}
          {filteredMovies.length === 0 ? (
            <Empty
              title="No movies found"
              description={
                searchQuery || hasActiveFilters
                  ? "Try adjusting your search or filters to find more movies."
                  : "No movies are currently available."
              }
              action={
                hasActiveFilters && (
                  <Button
                    onClick={() => setActiveFilters({ genres: [], languages: [] })}
                    variant="secondary"
                  >
                    Clear Filters
                  </Button>
                )
              }
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredMovies.map((movie, index) => (
                <motion.div
                  key={movie.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieGrid;