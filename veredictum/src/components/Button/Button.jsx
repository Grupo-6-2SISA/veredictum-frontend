import React from 'react';
import './Button.css'; // O CSS para o estilo do botão

const Button = ({ onClick }) => {
    return (
        <button className="new-appointment-button" onClick={onClick}>
            Novo Agendamento 
            <span className="plus-icon">+</span>
        </button>
    );
};

export default Button;