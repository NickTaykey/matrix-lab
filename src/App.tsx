import MatrixContextProvider from './store/GeneralContextProvider';
import Menu from './components/Menu';
import './App.css';

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
