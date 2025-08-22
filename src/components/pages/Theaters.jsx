import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { theaterService } from "@/services/api/theaterService";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const Theaters = () => {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTheaters();
  }, []);

  const loadTheaters = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await theaterService.getAll();
      setTheaters(data);
    } catch (err) {
      setError(err.message || "Failed to load theaters");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading theaters near you..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Error message={error} onRetry={loadTheaters} />
        </div>
      </div>
    );
  }

  if (theaters.length === 0) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Empty
            title="No theaters found"
            description="We couldn't find any theaters in your area. Please try again later."
            icon="MapPin"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-display font-bold text-white mb-4">
            Movie Theaters
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find the perfect cinema near you with premium facilities and comfortable seating
          </p>
        </motion.div>

        {/* Theater Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {theaters.map((theater, index) => (
            <motion.div
              key={theater.Id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full">
                {/* Theater Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {theater.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 mb-4">
                      <ApperIcon name="MapPin" className="w-4 h-4" />
                      <span>{theater.address}</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                    <ApperIcon name="Building" className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Screens */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                    Available Screens
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {theater.screens?.map(screen => (
                      <span
                        key={screen}
                        className="px-3 py-1 bg-surface border border-gray-700 rounded-full text-sm text-gray-300"
                      >
                        {screen}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Showtimes */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                    Today's Shows
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {theater.showtimes.slice(0, 6).map(time => (
                      <div
                        key={time}
                        className="px-3 py-2 bg-gray-900 rounded-lg text-center text-sm text-gray-300 border border-gray-700"
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                  <Button className="flex-1">
                    <ApperIcon name="Ticket" className="w-4 h-4 mr-2" />
                    View Movies
                  </Button>
                  <Button variant="ghost" size="md">
                    <ApperIcon name="Navigation" className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                </div>

                {/* Features */}
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <div className="flex justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <ApperIcon name="Car" className="w-4 h-4" />
                      <span>Parking</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ApperIcon name="Popcorn" className="w-4 h-4" />
                      <span>Snacks</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ApperIcon name="CreditCard" className="w-4 h-4" />
                      <span>Cards</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ApperIcon name="Wheelchair" className="w-4 h-4" />
                      <span>Accessible</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-surface/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Can't find your preferred theater?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              We're constantly adding new theater partners to provide you with more options. 
              Check back soon or contact us to suggest a theater in your area.
            </p>
            <Button variant="secondary" size="lg">
              <ApperIcon name="MessageCircle" className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Theaters;