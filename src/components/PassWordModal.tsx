'use client';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Lock } from 'lucide-react';

const repoPassword = import.meta.env.VITE_REPO_ACCESS_PASSWORD;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

// Componente creado por chat gpt, me parecio que ya no me iban a evaluar
// esto asi que use directamente el de la AI que creo que tambien es
//  una habilidad buena el poder utilizar AI como copiloto para mejorar el desarrollo y tomar decisiones.
// para mi no utilizar IA es quedarse atras en el tiempo y no aprovechar
// las herramientas que tenemos a nuestra disposicion

export function PasswordModal({ isOpen, onClose, onSuccess }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleCheck = () => {
    if (repoPassword === password) {
      setError('');
      onSuccess();
      onClose();
    } else {
      setError('❌ Contraseña incorrecta');
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Fondo blur oscuro */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </TransitionChild>

        {/* Contenedor modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-200"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <DialogPanel className="w-full max-w-sm rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-800 border border-zinc-600 p-6 shadow-2xl text-white space-y-4">
              {/* Header del modal con borde y fondo oscuro */}
              <div className="flex flex-col items-center border border-zinc-600 rounded-lg p-4 bg-zinc-800/60">
                <Lock className="w-10 h-10 text-blue-500 animate-[wiggle_1s_ease-in-out_infinite]" />
                <DialogTitle className="text-xl font-bold mt-2 text-center">
                  Acceso al repositorio
                </DialogTitle>
              </div>

              {/* Input */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Error */}
              {error && (
                <p className="text-sm text-red-400 text-center">{error}</p>
              )}

              {/* Acción */}
              <div className="flex justify-center">
                <button
                  onClick={handleCheck}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                  Ingresar
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
