import React from 'react';
import './Button.css';
import '../Css/Main.css';

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