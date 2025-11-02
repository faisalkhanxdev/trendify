import React from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      info: "123 Commerce Street, New York, NY 10001",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      info: "+1 (555) 123-4567",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Working Hours",
      info: "Mon - Fri: 9AM - 6PM EST",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="relative py-10 bg-linear-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <Mail className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">
              CONTACT US
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16"
        >
          <ContactForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-linear-to-br ${item.color} flex items-center justify-center`}
                >
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.info}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
