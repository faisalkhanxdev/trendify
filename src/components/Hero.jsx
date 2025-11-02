import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const heroSlides = [
  {
    title: "Premium Fashion",
    subtitle: "Elevated Style",
    desc: "Discover the latest trends and timeless styles curated just for you",
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&h=900&fit=crop",
    btn: "Shop Fashion",
  },
  {
    title: "Tech Gadgets",
    subtitle: "Innovation First",
    desc: "Explore cutting-edge electronics and smart devices for modern living",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&h=900&fit=crop",
    btn: "Explore Tech",
  },
  {
    title: "Home Essentials",
    subtitle: "Modern Living",
    desc: "Transform your space with carefully selected furniture and decor",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&h=900&fit=crop",
    btn: "View Collection",
  },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Hero Slider */}
      <Swiper
        aria-label="Homepage hero section"
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-gray-300",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-blue-600",
        }}
        effect="fade"
        loop={true}
        className="w-full h-[calc(100vh-64px)]"
      >
        {heroSlides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {/* Background Image */}
              <motion.img
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 7, ease: "easeOut" }}
                src={slide.img}
                alt={slide.title}
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Black Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content Container */}
              <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
                {/* Icon */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-4"
                >
                  <div className="flex items-center justify-center gap-2 bg-white/15 backdrop-blur-md w-fit mx-auto px-4 py-2 rounded-full border border-white/20">
                    <Sparkles className="w-4 h-4 text-blue-300" />
                    <span className="text-xs font-semibold text-white/90">
                      NEW COLLECTION
                    </span>
                  </div>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="text-4xl md:text-6xl font-black mb-3 tracking-tight leading-tight"
                >
                  {slide.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="text-xl md:text-2xl font-bold mb-6 text-white"
                >
                  {slide.subtitle}
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="text-sm md:text-base text-white/90 mb-8 max-w-xl mx-auto leading-relaxed"
                >
                  {slide.desc}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-bold text-base shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 group"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {slide.btn}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
