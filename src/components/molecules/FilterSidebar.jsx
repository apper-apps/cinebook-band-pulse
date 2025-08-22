import { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FilterSidebar = ({ 
  genres = [], 
  languages = [], 
  onFilterChange, 
  className,
  isOpen,
  onClose,
  ...props 
}) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        genres: selectedGenres,
        languages: selectedLanguages
      });
    }
  }, [selectedGenres, selectedLanguages, onFilterChange]);

  const handleGenreChange = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedLanguages([]);
  };

  const hasActiveFilters = selectedGenres.length > 0 || selectedLanguages.length > 0;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-80 bg-surface border-r border-gray-800 transform transition-transform duration-300 ease-in-out lg:transform-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
        {...props}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Filters</h3>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-primary hover:text-white"
                >
                  Clear
                </Button>
              )}
              <button
                onClick={onClose}
                className="lg:hidden text-gray-400 hover:text-white transition-colors duration-200"
              >
                <ApperIcon name="X" className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Genres */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">Genres</h4>
            <div className="space-y-3">
              {genres.map(genre => (
                <label
                  key={genre}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                    className="w-4 h-4 rounded border-gray-600 bg-transparent text-primary focus:ring-primary focus:ring-2"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                    {genre}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">Languages</h4>
            <div className="space-y-3">
              {languages.map(language => (
                <label
                  key={language}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes(language)}
                    onChange={() => handleLanguageChange(language)}
                    className="w-4 h-4 rounded border-gray-600 bg-transparent text-primary focus:ring-primary focus:ring-2"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                    {language}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="mt-auto pt-6 border-t border-gray-800">
              <h5 className="text-sm font-semibold text-gray-400 mb-2">Active Filters</h5>
              <div className="flex flex-wrap gap-2">
                {selectedGenres.map(genre => (
                  <span
                    key={genre}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
                  >
                    {genre}
                    <button
                      onClick={() => handleGenreChange(genre)}
                      className="hover:text-white"
                    >
                      <ApperIcon name="X" className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedLanguages.map(language => (
                  <span
                    key={language}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-accent/20 text-accent text-xs rounded-full"
                  >
                    {language}
                    <button
                      onClick={() => handleLanguageChange(language)}
                      className="hover:text-white"
                    >
                      <ApperIcon name="X" className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;