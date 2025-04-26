import { motion } from 'framer-motion';

export function Spinner() {
  return (
    <motion.div
      className="h-6 w-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    />
  );
}
