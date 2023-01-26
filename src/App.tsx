import Menu from './Menu';
import './App.css';
import MatrixContextProvider from './store/GeneralContextProvider';

function App() {
  return (
    <div className="App">
      <MatrixContextProvider>
        <Menu />
      </MatrixContextProvider>
    </div>
  );
}

export default App;
