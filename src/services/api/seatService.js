import seatsData from "@/services/mockData/seats.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const seatService = {
  async getSeatsForTheater(theaterId) {
    await delay(400);
    const theaterSeats = seatsData.filter(seat => seat.theaterId === parseInt(theaterId));
    return theaterSeats.map(seat => ({ ...seat }));
  },

  async getSeatById(id) {
    await delay(200);
    const seat = seatsData.find(seat => seat.Id === parseInt(id));
    if (!seat) {
      throw new Error("Seat not found");
    }
    return { ...seat };
  },

  async bookSeats(seatIds) {
    await delay(500);
    // Simulate booking seats - in real app would update database
    const bookedSeats = seatIds.map(id => {
      const seat = seatsData.find(s => s.Id === parseInt(id));
      if (seat && !seat.isBooked) {
        seat.isBooked = true;
        return { ...seat };
      }
      throw new Error(`Seat ${id} is not available`);
    });
    return bookedSeats;
  },

  async generateSeatMap(theaterId) {
    await delay(300);
    const seats = await this.getSeatsForTheater(theaterId);
    
    // Group seats by row
    const seatMap = seats.reduce((acc, seat) => {
      if (!acc[seat.row]) {
        acc[seat.row] = [];
      }
      acc[seat.row].push(seat);
      return acc;
    }, {});

    // Sort seats within each row
    Object.keys(seatMap).forEach(row => {
      seatMap[row].sort((a, b) => a.number - b.number);
    });

    return seatMap;
  }
};