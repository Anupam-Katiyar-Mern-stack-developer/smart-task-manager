import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import App from './App';
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#18181b",
          color: "#fff",
          fontSize: "14px",
        },
        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
   / >
      <Provider store={store}>
        <App />
      </Provider>
   
  </StrictMode>,
)
