import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, clearProduct } from "../features/productsSlice";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    dispatch(clearProduct());
    dispatch(fetchProducts(category));
  }, [category, dispatch]);

  if (loading && products.length === 0)
    return <Loader fullscreen text="Loading products..." />;

  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load products: {error}
      </div>
    );

  if (products.length === 0)
    return (
      <div className="text-center py-20 text-gray-500">
        No products available.
      </div>
    );

  return (
    <main className="bg-linear-to-b from-gray-50 to-white min-h-screen">
      {/* Header Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              {category ? `${category.toUpperCase()} Collection` : "All Products"}
            </h1>
            <p className="text-lg text-blue-100">
              Discover our {category ? category : "amazing"} products
            </p>
          </motion.div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial="hidden"
          animate="visible"
        >
          {products.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              variants={fadeUp}
              custom={i}
            />
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default Products;
