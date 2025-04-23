import './App.css';
import { GithubFloatingButton } from './components/GithubFloatingButton';
import { Lienzo } from './components/Lienzo/Lienzo';
import { MouseContextProvider } from './context/MouseContext';

// Todo hacer readme con mis palabras
// TODO agregar boton de limpiar
function App() {
  return (
    <>
      {/* pongo el contexto del provider de esta forma porque creo 
      que solo lo necesitare en el lienzo de otra forma necesitaria un hijo 
      unico con <></>*/}
      <MouseContextProvider>
        <Lienzo />
      </MouseContextProvider>
      <GithubFloatingButton />
    </>
  );
}

export default App;
