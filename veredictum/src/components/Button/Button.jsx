import React from 'react';
import './Button.css';
import '../Css/Main.css';

function Button({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={`btn-component ${className}`}>
      {children}
    </button>
  );
}

export default Button;