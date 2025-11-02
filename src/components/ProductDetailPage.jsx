import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchProductById, clearProduct } from "../features/productSlice";
import { addToCart } from "../redux/cartSlice";
import {
  ShoppingCart,
  Star,
  Package,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Home,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Loader from "./Loader";
import { showAlert } from "../features/alertSlice";

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

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);
  console.log("product: ", product);

  useEffect(() => {
    dispatch(clearProduct());
    dispatch(fetchProductById(id));

    return () => {
      dispatch(clearProduct());
    };
  }, [id, dispatch]);

const handleAddToCart = () => {
  dispatch(addToCart(product));
  dispatch(showAlert({
    message: `${product.title} added to cart`,
    type: "success"
  }));
};
  if (loading) return <Loader fullscreen text="Fetching product details..." />;

  if (error)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Product</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/products" className="text-blue-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <Link to="/products" className="text-blue-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );

  return (
    <main className="bg-linear-to-b from-gray-50 to-white text-gray-900 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="container mx-auto px-6 py-10 max-w-7xl">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-gray-600 mb-8"
        >
          <Link
            to="/"
            className="hover:text-blue-600 transition flex items-center gap-1"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/products" className="hover:text-blue-600 transition">
            Products
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium line-clamp-1">
            {product.title}
          </span>
        </motion.div>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Image */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 relative overflow-hidden">
              {/* linear Background */}
              <div className="absolute inset-0 bg-linear-to-br from-gray-50 to-gray-100 -z-10" />

              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                src={product.image}
                alt={product.title}
                className="w-full h-[400px] lg:h-[500px] object-contain mx-auto"
              />

              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-bold">Featured</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center"
          >
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full mb-4 w-fit">
              <Package className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-600 capitalize">
                {product.category || "Electronics"}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-4xl font-black mb-4 bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-gray-600 font-medium">
                {product.rating.rate} ({product.rating.count}){" "}
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-5xl font-black text-transparent bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text">
                ${product.price}
              </span>
              <span className="text-gray-500 line-through text-xl ml-3">
                ${(product.price * 1.3).toFixed(2)}
              </span>
              <span className="ml-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                Save 30%
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Easy Returns</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>24/7 Support</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 ">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 flex items-center cursor-pointer justify-center gap-3 bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition font-bold text-lg shadow-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center cursor-pointer justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-xl hover:bg-gray-50 transition font-bold text-lg shadow-lg border-2 border-gray-200"
              >
                <TrendingUp className="w-5 h-5" />
                Buy Now
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-linear-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">
              Get your order delivered within 2-3 business days
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-linear-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Quality Assured</h3>
            <p className="text-gray-600 text-sm">
              All products are verified and quality checked
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-linear-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Top Rated</h3>
            <p className="text-gray-600 text-sm">
              Highly rated by thousands of satisfied customers
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
