import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { User, Mail, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";
import { showAlert } from "../features/alertSlice";
import { useDispatch } from "react-redux";

const ContactForm = () => {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    title: "",
    message: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
        setLoading(false);
        dispatch(
          showAlert({
            message: "Message sent successfully! We'll get back to you soon.",
            type: "success",
          })
        );
        form.current.reset();
        setFormData({ user_name: "", user_email: "", title: "", message: "" });
      })
      .catch((err) => {
        setLoading(false);
        console.error("EmailJS Error:", err);
        dispatch(
          showAlert({
            message: "Failed to send message. Please try again later.",
            type: "error",
          })
        );
      });
  };

  return (
    <form
      ref={form}
      onSubmit={handleSubmit}
      className="space-y-6"
      autoComplete="off"
    >
      {/* Name */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Your Name *
        </label>
        <div className="relative">
          <User className="absolute left-4 top-4 text-gray-400" size={20} />
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 transition text-gray-900"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Your Email *
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
          <input
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 transition text-gray-900"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Subject
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="How can we help you?"
          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 transition text-gray-900"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Message *
        </label>
        <div className="relative">
          <MessageSquare
            className="absolute left-4 top-4 text-gray-400"
            size={20}
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            placeholder="Write your message here..."
            required
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 transition resize-none text-gray-900"
          />
        </div>
      </div>

      {/* Button */}
      <motion.button
        type="submit"
        aria-label="Send message"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full cursor-pointer bg-linear-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Send size={20} />
            </motion.div>
            Sending...
          </>
        ) : (
          <>
            <Send size={20} />
            Send Message
          </>
        )}
      </motion.button>
    </form>
  );
};

export default ContactForm;
