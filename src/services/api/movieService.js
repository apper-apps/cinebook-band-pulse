import moviesData from "@/services/mockData/movies.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const movieService = {
  async getAll() {
    await delay(300);
    return [...moviesData];
  },

async getById(id) {
    await delay(200);
    const movie = moviesData.find(movie => movie.Id === parseInt(id));
    if (!movie) {
      throw new Error("Movie not found");
    }
    
    // Add director information based on movie
    const directors = {
      1: "Christopher Nolan",
      2: "Christopher Nolan", 
      3: "Christopher Nolan",
      4: "Anthony Russo, Joe Russo",
      5: "Bong Joon-ho",
      6: "Jon Watts",
      7: "Denis Villeneuve",
      8: "Joseph Kosinski",
      9: "Ryan Coogler",
      10: "Matt Reeves"
    };
    
    return { 
      ...movie, 
      director: directors[movie.Id] || "Unknown Director" 
    };
  },

  async searchByTitle(query) {
    await delay(300);
    const searchResults = moviesData.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    return searchResults.map(movie => ({ ...movie }));
  },

  async filterByGenre(genre) {
    await delay(300);
    const filteredMovies = moviesData.filter(movie =>
      movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    );
    return filteredMovies.map(movie => ({ ...movie }));
  },

  async filterByLanguage(language) {
    await delay(300);
    const filteredMovies = moviesData.filter(movie =>
      movie.language.toLowerCase() === language.toLowerCase()
    );
    return filteredMovies.map(movie => ({ ...movie }));
  },

  async getGenres() {
    await delay(200);
    const allGenres = moviesData.flatMap(movie => movie.genre);
    return [...new Set(allGenres)];
  },

  async getLanguages() {
    await delay(200);
    const allLanguages = moviesData.map(movie => movie.language);
    return [...new Set(allLanguages)];
  }
};