import './App.css'
import {Router} from "./components/Router/Router.jsx";
import { RouterProvider } from 'react-router-dom';

function App() {

  return  <RouterProvider router={Router} fallbackElement={<div>Loading....</div>} />
}

export default App
