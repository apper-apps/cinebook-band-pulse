import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import Home from "@/components/pages/Home";
import Movies from "@/components/pages/Movies";
import MovieDetails from "@/components/pages/MovieDetails";
import Theaters from "@/components/pages/Theaters";
import Booking from "@/components/pages/Booking";
import BookingSuccess from "@/components/pages/BookingSuccess";
import MyBookings from "@/components/pages/MyBookings";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/theaters" element={<Theaters />} />
            <Route path="/booking/:movieId/:theaterId/:showtime" element={<Booking />} />
            <Route path="/booking-success/:bookingId" element={<BookingSuccess />} />
            <Route path="/bookings" element={<MyBookings />} />
          </Routes>
        </main>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          className="z-[9999]"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;