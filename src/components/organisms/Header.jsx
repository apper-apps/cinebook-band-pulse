import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/", icon: "Home" },
    { label: "Movies", path: "/movies", icon: "Film" },
    { label: "Theaters", path: "/theaters", icon: "MapPin" },
    { label: "My Bookings", path: "/bookings", icon: "Ticket" }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      navigate(`/movies?search=${encodeURIComponent(query)}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center"
            >
              <ApperIcon name="Film" className="w-6 h-6 text-white" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-display font-bold text-white group-hover:text-primary transition-colors duration-200">
                CineBook
              </h1>
              <p className="text-xs text-gray-400 -mt-1">Movie Booking</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium",
                  isActivePath(item.path)
                    ? "text-primary bg-primary/10"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                )}
              >
                <ApperIcon name={item.icon} className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <SearchBar
              placeholder="Search movies..."
              onSearch={handleSearch}
              value={searchQuery}
            />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="lg:hidden"
          >
            <ApperIcon name={isMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
          </Button>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <SearchBar
            placeholder="Search movies..."
            onSearch={handleSearch}
            value={searchQuery}
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? "auto" : 0
        }}
        transition={{ duration: 0.2 }}
        className="lg:hidden overflow-hidden bg-surface border-t border-gray-800"
      >
        <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium",
                isActivePath(item.path)
                  ? "text-primary bg-primary/10 border-l-2 border-primary"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              )}
            >
              <ApperIcon name={item.icon} className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </motion.div>
    </header>
  );
};

export default Header;