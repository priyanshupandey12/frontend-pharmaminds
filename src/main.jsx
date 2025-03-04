import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store'
import { Toaster } from "@/components/ui/sonner"
import { useLoadUserQuery } from './store/userApi'
import LoadingSpinner from './components/LoadingSpinner'

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return <>{isLoading ? <LoadingSpinner/> : <>{children}</>}</>;
};

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
       <Custom>
        <App />
        <Toaster />
      </Custom>
  </StrictMode>,
  </Provider>
)
