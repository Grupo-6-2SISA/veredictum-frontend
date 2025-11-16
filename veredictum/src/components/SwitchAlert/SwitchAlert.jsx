import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './SwitchAlert.css';

export default function SwitchAlert({ visible, message, type = 'info', duration = 3000, onClose }) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(t);
  }, [visible, duration, onClose]);

  if (!visible || !message) return null;

  return (
    <div className={`switch-alert switch-alert--${type}`} role="alert" aria-live="polite">
      <span className="switch-alert__icon" />
      <div className="switch-alert__content">{message}</div>
      <button className="switch-alert__close" aria-label="Fechar alerta" onClick={onClose}>×</button>
    </div>
  );
}

SwitchAlert.propTypes = {
  visible: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error', 'info']),
  duration: PropTypes.number,
  onClose: PropTypes.func,
};