import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, setQuery } from "../features/searchSlice";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const SearchResults = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const query =
    new URLSearchParams(location.search).get("query")?.toLowerCase() || "";

  const { results, loading, products } = useSelector((state) => state.search);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
  }, [dispatch, products.length]);
  
  useEffect(() => {
    dispatch(setQuery(query));
  }, [dispatch, query]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">
        Search results for “{query}”
      </h2>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product, index) => (
            <ProductCard key={product.id} product={product} custom={index} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-12">
          No products found for “{query}”.
        </p>
      )}
    </div>
  );
};

export default SearchResults;
