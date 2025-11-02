import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../redux/cartSlice";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const loading = false;

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size="lg" text="Loading your cart..." />
      </div>
    );

  if (items.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-gray-600">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Start shopping to add items!</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transition-all"
        >
          Continue Shopping
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-black mb-2 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <p className="text-gray-600">{items.length} items in your cart</p>
          </div>
          <button
            onClick={() => dispatch(clearCart())}
            className="text-red-500 hover:text-red-600 font-semibold hover:underline transition"
          >
            Clear All
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="w-28 h-28 shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain bg-gray-50 rounded-xl p-2"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-blue-600 font-bold text-xl">
                          ${item.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-2 py-1">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            className="bg-white p-2 rounded-full hover:bg-gray-200 transition shadow-sm"
                          >
                            <Minus size={16} />
                          </motion.button>
                          <span className="px-4 font-bold text-lg">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            className="bg-white p-2 rounded-full hover:bg-gray-200 transition shadow-sm"
                          >
                            <Plus size={16} />
                          </motion.button>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition"
                        >
                          <Trash2 size={20} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 h-fit sticky top-24"
          >
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-xl font-black">
                <span>Total</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all mb-4"
            >
              Proceed to Checkout
            </motion.button>

            <Link
              to="/products"
              className="block text-center text-gray-600 hover:text-blue-600 font-semibold transition"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Cart;