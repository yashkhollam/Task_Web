
import { createRoot } from 'react-dom/client'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.jsx'
import ContextProvider from './Component/ContextProvider.jsx';






createRoot(document.getElementById('root')).render(
  <ContextProvider>
      <App/>
  </ContextProvider>

)
