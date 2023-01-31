import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MatrixContextProvider from './store/GeneralContextProvider';
import DeterminantSteps from './components/DeterminantSteps';
import ProductSteps from './components/ProductSteps';
import Menu from './components/Menu';
import './App.css';

const router = createBrowserRouter([
  { path: '/', element: <Menu /> },
  { path: '/product-steps/:matrixId', element: <ProductSteps /> },
  { path: '/determinant-steps/:matrixId', element: <DeterminantSteps /> },
]);

function App() {
  return (
    <div className="App">
      <MatrixContextProvider>
        <RouterProvider router={router} />
      </MatrixContextProvider>
    </div>
  );
}

export default App;
