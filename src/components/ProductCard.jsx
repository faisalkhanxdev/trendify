import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { showAlert } from "../features/alertSlice";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";

const ProductCard = ({ product, variants, custom }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    dispatch(showAlert({ message: `${product.title} added to cart`, type: "success" }));
  };

  const rating = product.rating?.rate ?? product.rating ?? 4.8;

  return (
    <motion.div
      variants={variants}
      custom={custom}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
    >
      {/* Product Image */}
      <div className="relative h-64 sm:h-72 bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            src={product.image || "/placeholder.png"}
            alt={product.title}
            className="w-full h-full object-contain p-6"
          />
        </Link>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-md">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-3 w-3 fill-yellow-400" />
            <span className="text-xs font-semibold text-gray-700">
              {rating}
            </span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-base mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-black text-blue-600">
            ${product.price}
          </span>

          <div className="flex gap-1">
            {[...Array(5)].map((_, idx) => {
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

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 text-center bg-gray-100 text-gray-900 px-4 py-2.5 rounded-xl hover:bg-gray-200 transition font-semibold text-sm"
          >
            Details
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="flex-1 flex cursor-pointer items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition font-semibold text-sm shadow-lg"
          >
            <ShoppingCart size={16} />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
