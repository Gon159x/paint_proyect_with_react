import './App.css';
import { Lienzo } from './components/Lienzo/Lienzo';
import { MouseContextProvider } from './context/MouseContext';

// Todo hacer readme con mis palabras
// TODO agregar boton de ir a github con una contraseña
// TODO agregar boton de limpiar
// TODO fijarse el comportamiento del boton derecho -> en el picker y en las celdas
function App() {
  return (
    <>
      <MouseContextProvider>
        <Lienzo />
      </MouseContextProvider>
    </>
  );
}

export default App;
