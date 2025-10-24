import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './ModalContainer.css';
import CloseIcon from '../../../assets/svg/close.svg'; // <-- ADICIONAR IMPORT


/**
 * ModalContainer simples (backdrop + foco + ESC + bloqueio scroll)
 * Usa classes CSS JÁ AJUSTADAS com o sufixo -agenda.
 */
export default function ModalContainer({
  show,
  onClose,
  title,
  children,
  modalId = 'modal-container',
  variant = 'default'
}) {
  const ref = useRef(null);
  const titleId = `${modalId}-title`;

  useEffect(() => {
    if (!show) return;
    const prevOverflow = document.body.style.overflow || '';
    document.body.style.overflow = 'hidden';

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKey);

    setTimeout(() => { try { ref.current?.focus?.(); } catch (e) { } }, 0);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <>
      <div
        className={`modal-backdrop_P-${variant}`}
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClose?.(); }}
        aria-hidden="true"
      />
      <div
        id={modalId}
        className="modal_P-agenda"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header_P-agenda"> 
          <h2 id={titleId}>{title}</h2>
          {/* Botão de fechar com ícone SVG */}
          <button 
            type="button" 
            className="modal-close-btn_P-agenda" 
            onClick={onClose} 
            aria-label="Fechar"
          >
            <img src={CloseIcon} alt="Fechar" />
          </button>
        </div>
        <div className="modal-body_P-agenda"> 
          {children}
        </div>
      </div>
    </>
  );
}

ModalContainer.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  modalId: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'add', 'edit', 'view', 'delete'])
};