import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  visible?: boolean;
}

export function Tooltip({ children, content, visible = true }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { uiVisible } = useAppContext();

  if (!visible || !uiVisible) {
    return <>{children}</>;
  }

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[-65px] -translate-y-full mb-1 px-3 py-1 rounded-md bg-gray-700/90 text-white text-xs font-medium shadow-md z-20 max-w-xs text-center whitespace-pre-line pointer-events-none"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="z-10">{children}</div>
    </div>
  );
}
