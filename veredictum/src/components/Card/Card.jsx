import React from 'react';
import './Card.css';
import '../../index.css';

const Card = ({ titulo, iconePath, children, className='card', alt , props}) => (
  <div className={`card-box ${className}`} {...props}>
    <div className="card-header">
      {iconePath && (
        <img
          src={iconePath}
          alt={alt || 'Ícone'}
          className="card-icon"
          style={{ width: 28, height: 28 }}
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