import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, Package, TrendingUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const NotFound = () => {
  return (
    <main className="bg-linear-to-b from-gray-50 to-white text-gray-900 overflow-hidden">
      <section className="min-h-[80vh] flex items-center justify-center px-6 py-24 relative">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20 -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-6">
              <Search className="w-5 h-5 text-red-600" />
              <span className="text-sm font-semibold text-red-600">PAGE NOT FOUND</span>
            </div>

            <motion.h1
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="text-9xl md:text-[12rem] font-black mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              404
            </motion.h1>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Oops! Page Not Found
            </h2>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-gray-200"
            >
              <Package className="w-5 h-5" />
              Browse Products
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold text-purple-600">POPULAR PAGES</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 group"
              >
                <Link to="/products" className="block">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    All Products
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Browse our full collection
                  </p>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 group"
              >
                <Link to="/" className="block">
                  <div className="w-12 h-12 bg-linear-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                    Featured
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Check out trending items
                  </p>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 group"
              >
                <Link to="/" className="block">
                  <div className="w-12 h-12 bg-linear-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <Home className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-green-600 transition-colors">
                    Home
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Return to homepage
                  </p>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;