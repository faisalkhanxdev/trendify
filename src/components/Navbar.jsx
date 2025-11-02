import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  LogOut,
  UserCircle,
  Settings,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const cartCount = items?.reduce((acc, i) => acc + i.quantity, 0) || 0;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search triggered:", search);
    if (search.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm"
    >
      <div className="container mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-linear-to-br from-blue-600 to-purple-600 p-1.5 rounded-lg">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
            </motion.div>
            <span className="text-2xl font-black bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trendify
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {["Home", "Products", "About", "Contact"].map((item) => (
              <NavLink
                key={item}
                to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-pill"
                        className="absolute inset-0 bg-blue-50 rounded-lg -z-10"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Search, Cart, User */}
          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearch} className="relative">
              <motion.div
                animate={{ width: searchFocused ? "280px" : "220px" }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-gray-50/50 focus:bg-white"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </motion.div>
            </form>

            <Link to="/cart">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-0.5 -right-0.5 bg-linear-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-lg"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>

            {/* Desktop User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 shadow-md hover:shadow-lg transition-all"
                onClick={() => setUserMenu((prev) => !prev)}
              >
                {user ? (
                  <span className="text-white font-bold cursor-pointer text-sm">
                    {user.email.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User className="h-5 w-5 text-white cursor-pointer" />
                )}
              </motion.button>

              <AnimatePresence>
                {userMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
                    onMouseLeave={() => setUserMenu(false)}
                  >
                    {!user ? (
                      <div className="p-3">
                        <Link
                          to="/login"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all group"
                          onClick={() => setUserMenu(false)}
                        >
                          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <User className="h-5 w-5 text-blue-600 cursor-pointer" />
                          </div>
                          <div>
                            <div className="font-semibold">Login</div>
                            <div className="text-xs text-gray-500">
                              Access your account
                            </div>
                          </div>
                        </Link>
                        <Link
                          to="/register"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all group"
                          onClick={() => setUserMenu(false)}
                        >
                          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-100 to-purple-200 flex cursor-pointer items-center justify-center group-hover:scale-110 transition-transform">
                            <UserCircle className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <div className="font-semibold">Register</div>
                            <div className="text-xs text-gray-500">
                              Create new account
                            </div>
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="p-4 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
                          <div className="flex items-center gap-3 cursor-pointer">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                              <span className="text-white font-bold text-lg">
                                {user.email.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-500">
                                Welcome back
                              </p>
                              <p className="text-sm font-bold text-gray-900 truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-3">
                          <Link
                            to="/profile"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-all group"
                            onClick={() => setUserMenu(false)}
                          >
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center group-hover:from-blue-100 group-hover:to-purple-100 transition-colors">
                              <Settings className="h-5 w-5 text-gray-600" />
                            </div>
                            <span>My Profile</span>
                          </Link>

                          <button
                            onClick={() => {
                              handleLogout();
                              setUserMenu(false);
                            }}
                            className="w-full flex items-center gap-3 cursor-pointer px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-red-50 rounded-xl transition-all group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                              <LogOut className="h-5 w-5 text-gray-600 group-hover:text-red-600 transition-colors" />
                            </div>
                            <span className="group-hover:text-red-600 transition-colors">
                              Logout
                            </span>
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="h-6 w-6 text-gray-700 cursor-pointer" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 cursor-pointer" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-linear-to-b from-white to-gray-50 shadow-[0_2px_10px_rgba(0,0,0,0.1)] overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {/* Navigation Links */}
              {["Home", "Products", "About", "Contact"].map((item) => (
                <NavLink
                  key={item}
                  to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-xl font-semibold transition-all ${
                      isActive
                        ? "bg-linear-to-r from-blue-50 to-purple-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  {item}
                </NavLink>
              ))}

              {/* Divider */}
              <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent my-4" />

              {/* Cart */}
              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShoppingCart className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-semibold text-gray-700">
                    Shopping Cart
                  </span>
                </div>
                {cartCount > 0 && (
                  <span className="px-3 py-1 bg-linear-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Section */}
              {!user ? (
                <div className="space-y-2 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-4 rounded-xl bg-linear-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Login</div>
                      <div className="text-xs text-gray-500">
                        Access your account
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-gray-50 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <UserCircle className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Register</div>
                      <div className="text-xs text-gray-500">
                        Create new account
                      </div>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2 pt-2">
                  {/* User Info Card */}
                  <div className="p-4 rounded-xl bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">
                          {user.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500">
                          Signed in as
                        </p>
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-gray-50 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Settings className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="font-semibold text-gray-700">
                      My Profile
                    </span>
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-red-50 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <LogOut className="h-5 w-5 text-gray-600 group-hover:text-red-600 transition-colors" />
                    </div>
                    <span className="font-semibold text-gray-700 group-hover:text-red-600 transition-colors">
                      Logout
                    </span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
