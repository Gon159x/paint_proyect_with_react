import { EyeIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useCounterApi } from '../../hooks/useCounterApi';
import { Spinner } from '../Spinner';
import { FloatingButton } from '../FloatingButton';
import { useAppContext } from '../../context/AppContext';

export function VisitCounter() {
  const isLocal =
    typeof window !== 'undefined' &&
    (window.location.hostname.includes('localhost') ||
      window.location.hostname === '127.0.0.1');

  const key = isLocal ? 'simulando' : 'deployed';

  const { count, loading, error } = useCounterApi('mi-proyecto-paint', key);

  const appContext = useAppContext();
  const { loadingPage } = appContext;

  // Si la pagina esta cargando no muestro el contador
  if (loadingPage) {
    return null;
  }

  return (
    <FloatingButton onClick={() => {}} position="bottom-center" pr="4px">
      <motion.div
        className="flex items-center justify-center overflow-hidden rounded-full shadow-md "
        animate={{
          width: loading ? '32px' : '72px',
          height: '24px',
          borderRadius: '9999px',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="spinner"
              className="flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Spinner />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              className="flex justify-center items-center w-full h-full"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
            </motion.div>
          ) : count !== null ? (
            <motion.div
              key="content"
              className="flex items-center justify-center space-x-2.5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <EyeIcon className="h-5.5 w-5.5 text-blue-500" />
              <span
                style={{ fontSize: '1.25rem' }}
                className="font-bold font-mono"
              >
                {count}
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </FloatingButton>
  );
}
