import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Book from './pages/Book';
import Add from './pages/Add'
import Update from './pages/Update'
import './style.scss';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Book />,
  },
  {
    path: '/add',
    element: <Add />,
  },
  {
    path: '/update/:id',
    element: <Update />,
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider
        router={router}
      />
    </div>
  );
}

export default App;
