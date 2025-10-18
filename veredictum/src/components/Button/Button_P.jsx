import React from 'react';
import './Button_P.css';
import '../../index.css';

function Button({ children, className = '', ...props }) {
  const classes = ['btn-component'];
  if (className) {
    classes.push(className);
  }

  return (
    <button className={classes.join(' ')} {...props}>
      {children}
    </button>
  );
}

export default Button;