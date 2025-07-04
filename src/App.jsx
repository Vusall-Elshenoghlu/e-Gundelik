
import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import { ROUTES } from './routes/router'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify';
import MemoryCardGame from './components/User/MemoryCardGame';
import { useEffect, useState } from 'react';

const router = createBrowserRouter(ROUTES)
function App() {

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

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
      {isOffline ? (
          <MemoryCardGame />
        ) : (
          <RouterProvider router={router} />
        )}
    </>
  )
}

export default App
