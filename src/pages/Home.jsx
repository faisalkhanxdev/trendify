import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Package,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  fetchCategories,
  fetchCategoryImages,
  fetchFeaturedProducts,
} from "../features/homeSlice";
import { addToCart } from "../redux/cartSlice";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import { showAlert } from "../features/alertSlice";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Home = () => {
  const dispatch = useDispatch();
  const { featuredProducts, categories, categoryImages, loading, error } =
    useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchCategories()).then(() => dispatch(fetchCategoryImages()));
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  if (loading && !featuredProducts.length && !categories.length)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size="lg" text="Fetching latest products..." />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500">
        Something went wrong: {error}
      </div>
    );

  return (
    <main className="bg-linear-to-b from-gray-50 to-white text-gray-900 overflow-hidden">
      <Hero />

      {/* CATEGORIES SECTION */}
      <section className="py-10 px-6 relative">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20 -z-10" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">
                SHOP BY CATEGORY
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Explore Our Collections
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find exactly what you're looking for in our curated categories
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                custom={i}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Link to={`/products?category=${encodeURIComponent(cat)}`}>
                  <div className="relative h-80 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      src={categoryImages[cat] || "/placeholder.png"}
                      alt={cat}
                      className="w-full h-full object-contain bg-linear-to-br from-gray-50 to-gray-100 p-8"
                    />

                    {/* linear Overlay on Hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h3 className="text-2xl font-bold text-white capitalize mb-2">
                          {cat}
                        </h3>
                        <p className="text-gray-200 text-sm mb-4">
                          Discover amazing {cat} products
                        </p>
                        <div className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                          Shop Now <TrendingUp className="w-4 h-4" />
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Category Name Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                    <span className="text-sm font-bold text-gray-900 capitalize">
                      {cat}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-10 bg-linear-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full mb-4">
              <Package className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold text-purple-600">
                TRENDING NOW
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Handpicked items just for you
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredProducts.map((p, i) => (
              <motion.div
                key={p.id}
                variants={scaleIn}
                custom={i}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative h-72 bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-contain p-6"
                  />

                  {/* Quick View Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
                    <div className="flex gap-1 text-yellow-400">
                      {[...Array(5)].map((_, idx) => {
                        const rating = p.rating?.rate || 0;
                        const full = Math.floor(rating);
                        const half = rating - full >= 0.5 && idx === full;

                        return (
                          <Star
                            key={idx}
                            className={`h-3 w-3 ${
                              idx < full
                                ? "fill-yellow-400"
                                : half
                                ? "fill-yellow-300/70"
                                : "fill-gray-300"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {p.title}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-blue-600">
                      ${p.price}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{p.rating.rate}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={`/product/${p.id}`}
                      className="flex-1 text-center bg-gray-100 text-gray-900 px-4 py-3 rounded-xl hover:bg-gray-200 transition font-semibold text-sm"
                    >
                      View Details
                    </Link>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        dispatch(addToCart(p));
                        dispatch(
                          showAlert({
                            message: `${p.title} added to cart`,
                            type: "success",
                          })
                        );
                      }}
                      className="flex-1 flex items-center cursor-pointer justify-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition font-semibold text-sm shadow-lg"
                    >
                      <ShoppingCart size={16} />
                      Add
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              View All Products
              <TrendingUp className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
