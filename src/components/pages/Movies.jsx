import { useSearchParams } from "react-router-dom";
import MovieGrid from "@/components/organisms/MovieGrid";

const Movies = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <MovieGrid searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Movies;