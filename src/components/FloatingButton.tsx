import { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';

// components/FloatingButton.tsx
type FloatingButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';
  pr?: string;
  pl?: string;
  borderRadius?: string;
};

// Componente creado por chat gpt
export function FloatingButton({
  onClick,
  children,
  position = 'bottom-left',
  pr = '4px',
  pl = '4px',
  borderRadius = '9999px',
}: FloatingButtonProps) {
  const positionClasses: Record<string, string> = {
    'bottom-left': 'bottom-4 left-8',
    'bottom-right': 'bottom-4 right-8',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
    'top-left': 'top-4 left-8',
    'top-right': 'top-4 right-8',
  };

  const { uiVisible, loadingPage } = useAppContext();

  const showButton = useMemo(() => {
    if (uiVisible) {
      return true;
    } else {
      return false;
    }
  }, [uiVisible]);

  if (loadingPage) {
    return null; // No renderizar el botón si loadingPage es true
  }

  return (
    <button
      style={{ paddingRight: `${pr}`, paddingLeft: `${pl}`, borderRadius }}
      className={`btn fixed ${
        showButton ? 'animate-fade-in' : 'animate-fade-out'
      }   ${
        positionClasses[position]
      } z-50 flex hover:-traslate-y-1 hover:-rotate-3`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
