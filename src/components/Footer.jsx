import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Shop: [
      { name: "All Products", path: "/products" },
      { name: "Fashion", path: "/products?category=clothing" },
      { name: "Electronics", path: "/products?category=electronics" },
      { name: "Home & Living", path: "/products?category=home" },
    ],
    Company: [
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Careers", path: "#" },
      { name: "Blog", path: "#" },
    ],
    Support: [
      { name: "Help Center", path: "#" },
      { name: "Shipping Info", path: "#" },
      { name: "Returns", path: "#" },
      { name: "Privacy Policy", path: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com", color: "hover:text-blue-600" },
    { icon: Twitter, href: "https://www.x.com", color: "hover:text-sky-500" },
    {
      icon: Instagram,
      href: "https://www.instagram.com",
      color: "hover:text-pink-600",
    },
    { icon: Linkedin, href: "https://www.linkedin.com", color: "hover:text-blue-700" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <ShoppingBag className="h-8 w-8 text-blue-500" />
              </motion.div>
              <span className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Trendify
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your one-stop destination for the latest trends in fashion,
              electronics, and home essentials. Quality products at unbeatable
              prices.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>support@trendify.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>123 Commerce St, NY 10001</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-bold mb-4 text-lg">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 ">
          <div className="flex justify-center items-center gap-4 py-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                target="_blank"
                href={social.href}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 bg-gray-800 rounded-full ${social.color} transition-all`}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>

          <div className="text-center text-sm text-gray-500">
            <p className="flex items-center justify-center gap-2">
              © {currentYear} Trendify. All rights reserved. Made with
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              by Faisal Khan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
