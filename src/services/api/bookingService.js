import bookingsData from "@/services/mockData/bookings.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const bookingService = {
  async getAll() {
    await delay(300);
    return [...bookingsData];
  },

  async getById(id) {
    await delay(200);
    const booking = bookingsData.find(booking => booking.Id === parseInt(id));
    if (!booking) {
      throw new Error("Booking not found");
    }
    return { ...booking };
  },

  async create(bookingData) {
    await delay(500);
    const newId = Math.max(...bookingsData.map(b => b.Id)) + 1;
    const newBooking = {
      Id: newId,
      ...bookingData,
      bookingDate: new Date().toISOString(),
      status: "confirmed"
    };
    bookingsData.push(newBooking);
    return { ...newBooking };
  },

  async getUserBookings(userId) {
    await delay(350);
    // For this demo, return all bookings
    return [...bookingsData];
  },

  async cancelBooking(id) {
    await delay(400);
    const bookingIndex = bookingsData.findIndex(booking => booking.Id === parseInt(id));
    if (bookingIndex === -1) {
      throw new Error("Booking not found");
    }
    bookingsData[bookingIndex].status = "cancelled";
    return { ...bookingsData[bookingIndex] };
  }
};