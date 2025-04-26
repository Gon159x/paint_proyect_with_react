import { Github } from 'lucide-react';
import { JSX, useState } from 'react';
import { PasswordModal } from './PassWordModal';
import { FloatingButton } from './FloatingButton';

type Props = {
  // add props here
};

/**
 * GithubFloatinButton component
 *
 * @component
 * @param {Props} props - Component props
 * @returns {JSX.Element}
 */

export function GithubFloatingButton({}: Props): JSX.Element {
  // Le agrego la logica del modal porque son inseparables logicamente para este caso,
  //  de otra forma lo ideal seria que la logica del modal se haga en la pantalla
  //  general que tiene los componentes

  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    window.open('https://github.com/Gon159x/paint_proyect_with_react');
  };

  return (
    <>
      <FloatingButton
        pr={'0px'}
        pl="16px"
        onClick={() => setIsOpen(true)}
        position="bottom-right"
      >
        Github
        <Github className="w-12" />
      </FloatingButton>

      {/* dice que github esta deprecated debido a temas que tuvo la libreria con facebook, github, etc me parece */}

      <PasswordModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}
