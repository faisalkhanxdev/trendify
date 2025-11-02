import React from "react";
import {
  ShoppingBag,
  Globe,
  Zap,
  Heart,
  Sparkles,
  TrendingUp,
  Package,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

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

const About = () => {
  const features = [
    {
      icon: Zap,
      title: "Fast & Secure",
      description: "Lightning-fast performance with top-tier security",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Shop from anywhere in the world",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Heart,
      title: "User Focused",
      description: "Designed with you in mind",
      color: "from-rose-400 to-pink-500",
      bgColor: "bg-rose-50",
    },
    {
      icon: Package,
      title: "Quality Products",
      description: "Curated selection of premium items",
      color: "from-purple-400 to-indigo-500",
      bgColor: "bg-purple-50",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: Users },
    { number: "10K+", label: "Products", icon: Package },
    { number: "99%", label: "Satisfaction Rate", icon: Heart },
    { number: "24/7", label: "Support", icon: Globe },
  ];

  return (
    <main className="bg-linear-to-b from-gray-50 to-white text-gray-900 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="container mx-auto px-6 lg:px-20 py-10">
        {/* Header Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">
              ABOUT US
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6">
            About{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trendify
            </span>
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed">
            Redefining online shopping with speed, style, and simplicity —
            because you deserve a smarter way to shop.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              custom={i}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 text-center"
            >
              <div className="w-12 h-12 bg-linear-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-3xl font-black bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-600 font-medium text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: Image */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg"
                alt="Shopping illustration"
                className="w-full h-[500px] object-cover"
              />

              {/* linear Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Trusted Worldwide
                    </p>
                    <p className="text-xl font-black text-gray-900">
                      50K+ Happy Shoppers
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-blue-400 to-purple-400 rounded-full blur-2xl opacity-50 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-linear-to-br from-pink-400 to-rose-400 rounded-full blur-2xl opacity-50 -z-10" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full mb-6">
              <ShoppingBag className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-600">
                OUR STORY
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6 leading-tight">
              The Future of Shopping —{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Designed Around You
              </span>
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              <strong className="text-gray-900">Trendify</strong> was built with
              a simple belief — shopping should feel effortless, inspiring, and
              personal. From discovering new trends to finding your everyday
              essentials, we make it easy to explore what you love, all in one
              place.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              Every product on our platform is carefully curated to bring you
              quality, authenticity, and value. We partner with trusted sellers
              and brands so you can shop with confidence, knowing that every
              choice you make reflects your taste and lifestyle.
            </p>

            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              At Trendify, we’re more than just an online store — we’re a
              community of shoppers, creators, and dreamers redefining how the
              world experiences fashion and lifestyle. Our mission is to make
              every click feel as exciting as discovering something new.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-linear-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-full border border-yellow-200">
                <Zap className="text-yellow-600 h-5 w-5" />
                <span className="text-gray-800 font-semibold text-sm">
                  Fast & Secure
                </span>
              </div>
              <div className="flex items-center gap-2 bg-linear-to-r from-blue-50 to-cyan-50 px-4 py-2 rounded-full border border-blue-200">
                <Globe className="text-blue-600 h-5 w-5" />
                <span className="text-gray-800 font-semibold text-sm">
                  Global Access
                </span>
              </div>
              <div className="flex items-center gap-2 bg-linear-to-r from-rose-50 to-pink-50 px-4 py-2 rounded-full border border-rose-200">
                <Heart className="text-rose-600 h-5 w-5" />
                <span className="text-gray-800 font-semibold text-sm">
                  User Focused
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-green-600">
                WHY CHOOSE US
              </span>
            </div>
            <h2 className="text-4xl font-black mb-4">
              What Makes Us{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Different
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                custom={i}
                whileHover={{ y: -8 }}
                className={`${feature.bgColor} rounded-2xl p-6 hover:shadow-xl transition-all duration-300`}
              >
                <div
                  className={`w-14 h-14 bg-linear-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </main>
  );
};

export default About;
