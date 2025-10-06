// src/components/Card/Card.jsx
import React from 'react';
import './Card.css'; 
// Supondo que você use uma biblioteca de ícones como react-icons
// import { FaRegCalendarAlt } from 'react-icons/fa'; 

const variantConfigs = {
    clientes: {
        boxId: 'clientes-card-box',
        headerId: 'clientes-card-header',
        containerClass: 'card-clientes',
    },
};

const Card = ({ titulo, icone, children, className, variant }) => {
    const variantConfig = variant ? variantConfigs[variant] : undefined;
    const boxClassNames = ['card-box'];

    if (className) {
        boxClassNames.push(className);
    }

    if (variantConfig?.containerClass) {
        boxClassNames.push(variantConfig.containerClass);
    }

    return (
        <div
            className={boxClassNames.join(' ')}
            id={variantConfig?.boxId}
            data-variant={variant}
        >
            <div className="card-header" id={variantConfig?.headerId}>
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
};

export default Card;