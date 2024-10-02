import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* footer */}
    <footer className="footer">
      Created by Daniela Castorena
    </footer>
  </React.StrictMode>,
  document.getElementById('root')
);
