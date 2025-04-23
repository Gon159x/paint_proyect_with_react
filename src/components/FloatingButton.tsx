// components/FloatingButton.tsx
type FloatingButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  pr?: string;
};

// Componente creado por chat gpt
export function FloatingButton({
  onClick,
  children,
  position = 'bottom-left',
  pr = '4px',
}: FloatingButtonProps) {
  const positionClasses: Record<string, string> = {
    'bottom-left': 'bottom-4 left-8',
    'bottom-right': 'bottom-4 right-8',
    'top-left': 'top-4 left-8',
    'top-right': 'top-4 right-8',
  };

  const prClass = `pr-${pr}`; // Agregar la clase pr a la clase del botón

  return (
    <button
      style={{ paddingRight: `${pr}` }}
      className={`btn fixed ${positionClasses[position]} ${prClass} z-50 flex hover:-traslate-y-1 hover:-rotate-3`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
