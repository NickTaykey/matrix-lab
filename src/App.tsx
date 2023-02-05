import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MatrixContextProvider from './store/GeneralContextProvider';
import DeterminantSteps from './components/Determinant/DeterminantSteps';
import ProductSteps from './components/Product/ProductSteps';
import InverseSteps from './components/Inverse/InverseSteps';
import ReductionSteps from './components/ReductionSteps';
import Menu from './components/Menu/Menu';
import './App.css';

const router = createBrowserRouter([
  { path: '/', element: <Menu /> },
  { path: '/product-steps/:matrixId', element: <ProductSteps /> },
  { path: '/determinant-steps/:matrixId', element: <DeterminantSteps /> },
  { path: '/inverse-steps/:matrixId', element: <InverseSteps /> },
  { path: '/rref/:matrixId', element: <ReductionSteps /> },
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
