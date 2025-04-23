import { Github } from 'lucide-react';
import { JSX, useState } from 'react';
import { PasswordModal } from './PassWordModal';

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
      <button
        onClick={() => setIsOpen(true)}
        className="btn fixed bottom-4 right-8 flex hover:-traslate-y-1 hover:-rotate-3"
      >
        Github
        <Github className="w-12" />
        {/* dice que github esta deprecated debido a temas que tuvo la libreria con facebook, github, etc me parece */}
      </button>
      <PasswordModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}
