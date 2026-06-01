import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Página no encontrada</h2>
        <p className="notfound-text">No hemos encontrado la página que buscas</p>
        <Link to="/" className="notfound-btn">Volver al Inicio</Link>
      </div>
    </div>
  );
}

export default NotFound;
