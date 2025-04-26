import { motion } from 'framer-motion';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export function Spinner() {
  return (
    <motion.div
      className="h-6 w-6 flex justify-center items-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="text-blue-300"
      >
        <ArrowPathIcon className="h-5 w-5" />
      </motion.div>
    </motion.div>
  );
}
