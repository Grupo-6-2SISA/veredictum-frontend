import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Modal_Logs.css';
import closeIcon from '../../assets/svg/close.svg';

function ModalLogs({ isOpen, title, onClose, children, footer, modalId }) {
  if (!isOpen) return null;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = prev || '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <div className="modal-logs-backdrop" onClick={handleBackdropClick} />
      <div id={modalId} className="modal-logs" role="dialog" aria-modal="true" aria-labelledby={`${modalId}-title`}>
        <div className="modal-header-logs">
          <h2 id={`${modalId}-title`} className="modal-logs-title">{title}</h2>
          <button type="button" className="modal-logs-close" onClick={onClose} aria-label="Fechar">
            <img src={closeIcon} alt="Fechar" />
          </button>
        </div>

        <div className="modal-body-logs">
          {children}
        </div>

        
      </div>
    </>
  );
}

ModalLogs.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  footer: PropTypes.node,
  modalId: PropTypes.string,
};

export default ModalLogs;