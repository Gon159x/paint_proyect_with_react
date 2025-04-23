// import { StrictMode } from 'react' De momento lo sacamos para mejorar la performance y testear el rendimiento
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(<App />);
