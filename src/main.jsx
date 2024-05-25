import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const rootEl = document.getElementById('root');
const root = ReactDOM.createRoot(rootEl);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);


// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
// )
