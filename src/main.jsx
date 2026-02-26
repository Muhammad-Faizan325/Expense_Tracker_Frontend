import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Redux Imports
import { Provider } from 'react-redux'
import { store } from './app/store.js' // Aapka store yahan hai

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)