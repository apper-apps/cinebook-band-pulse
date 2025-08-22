import theatersData from "@/services/mockData/theaters.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const theaterService = {
  async getAll() {
    await delay(300);
    return [...theatersData];
  },

  async getById(id) {
    await delay(200);
    const theater = theatersData.find(theater => theater.Id === parseInt(id));
    if (!theater) {
      throw new Error("Theater not found");
    }
    return { ...theater };
  },

  async getTheatersForMovie(movieId) {
    await delay(350);
    // Return all theaters for simplicity - in real app would filter by movie availability
    return [...theatersData];
  },

  async getShowtimes(theaterId, movieId) {
    await delay(250);
    const theater = theatersData.find(theater => theater.Id === parseInt(theaterId));
    if (!theater) {
      throw new Error("Theater not found");
    }
    return [...theater.showtimes];
  }
};