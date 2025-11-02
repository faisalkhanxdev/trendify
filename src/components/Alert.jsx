import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { clearAlert } from "../features/alertSlice";

const Alert = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.alert);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => dispatch(clearAlert()), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  const getAlertConfig = (type) => {
    switch (type) {
      case "success":
        return { icon: CheckCircle, bg: "from-green-500 to-emerald-600" };
      case "error":
        return { icon: AlertCircle, bg: "from-red-500 to-rose-600" };
      default:
        return { icon: Info, bg: "from-blue-500 to-indigo-600" };
    }
  };

  const { icon: Icon, bg } = getAlertConfig(type);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 right-6 z-999 max-w-md"
        >
          <div
            className={`bg-linear-to-r ${bg} text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3`}
            role="alert"
          >
            <Icon className="w-6 h-6" />
            <p className="flex-1 font-semibold text-sm">{message}</p>
            <button
              onClick={() => dispatch(clearAlert())}
              className="bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition"
            >
              <X className="w-4 h-4 cursor-pointer" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
