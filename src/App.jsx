
import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import { ROUTES } from './routes/router'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter(ROUTES)
function App() {

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={router} />
    </>
  )
}

export default App
