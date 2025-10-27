import React from 'react';
import './ButtonClientes.css';
import '../Css/Main.css';

function ButtonClientes({ children, className = '', ...props }) {
  const classes = ['clientes-btn-component'];
  if (className) {
    classes.push(className);
  }

  return (
    <button className={classes.join(' ')} {...props}>
      {children}
    </button>
  );
}

export default ButtonClientes;