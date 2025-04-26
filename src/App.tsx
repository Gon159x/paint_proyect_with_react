import './App.css';
import { GithubFloatingButton } from './components/GithubFloatingButton';
import { Lienzo } from './components/Lienzo/Lienzo';
import { VisitCounter } from './components/VisitCounter/VisitCounter';
import { AppContextProvider } from './context/AppContext';
import { MouseContextProvider } from './context/MouseContext';

// TODO agregar la documentacion de los componentes y los hooks
function App() {
  return (
    <>
      {/* pongo el contexto del provider del mouse de esta forma porque creo 
      que solo lo necesitare en el lienzo*/}
      <AppContextProvider>
        <MouseContextProvider>
          <Lienzo />
        </MouseContextProvider>
        <VisitCounter />
        <GithubFloatingButton />
      </AppContextProvider>
    </>
  );
}

export default App;
