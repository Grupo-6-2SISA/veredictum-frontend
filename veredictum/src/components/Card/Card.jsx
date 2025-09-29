// src/components/Card/Card.jsx
import React from 'react';
import './Card.css'; 
// Supondo que você use uma biblioteca de ícones como react-icons
// import { FaRegCalendarAlt } from 'react-icons/fa'; 

const Card = ({ titulo, icone, children }) => (
    <div className="card-box">
        <div className="card-header">
            {/* Aqui você usaria o ícone da biblioteca, ou o 'icone' passado como prop */}
            <span className="card-icon">{icone}</span> 
            <h2>{titulo}</h2>
        </div>
        <div className="card-content-wrapper">
             {/* O conteúdo (sua Listagem) vai aqui */}
            {children} 
        </div>
    </div>
);

export default Card;