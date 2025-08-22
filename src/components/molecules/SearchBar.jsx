import { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";

const SearchBar = ({ 
  placeholder = "Search movies...", 
  onSearch, 
  className,
  ...props 
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className={cn("relative", className)} {...props}>
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <ApperIcon name="Search" className="w-5 h-5 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleSearch}
        className="pl-10 pr-10"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <ApperIcon name="X" className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;