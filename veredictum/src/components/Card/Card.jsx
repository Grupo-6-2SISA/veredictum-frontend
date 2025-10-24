<<<<<<< HEAD
// src/components/Card/Card.jsx
=======
// src/components/Card/Card.jsx 

>>>>>>> f584f6d9c8a7af748bf6e026de6fd51c61d87dd6
import React from 'react';
import './Card.css'; 
// Supondo que você use uma biblioteca de ícones como react-icons
// import { FaRegCalendarAlt } from 'react-icons/fa'; 

// 1. ADICIONAR 'onClick' nas props
const Card = ({ titulo, iconePath, children, className = 'card', alt, onClick }) => (

  // 2. APLICAR o onClick na div principal (card-box)
  <div
    className={`card-box ${className}`}
    onClick={onClick} // <--- APLICAÇÃO DO EVENTO DE CLIQUE
  >
    <div className="card-header">
      {iconePath && (
        <img
          src={iconePath}
          alt={alt || 'Ícone'}
          className="card-icon"
          style={{ width: 20, height: 20 }}
        />
      )}
      <h2>{titulo}</h2>
    </div>
    <div className="card-content-wrapper">
      {children}
    </div>
  </div>
);

export default Card;