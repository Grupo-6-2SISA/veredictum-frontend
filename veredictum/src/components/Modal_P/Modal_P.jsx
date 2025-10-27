import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Modal_P.css';
import closeIcon from '../../assets/svg/close.svg';
import closeBlackIcon from '../../assets/svg/close_black.svg';

function Modal({
  isOpen,
  variant = 'default',
  title,
  onClose,
  children,
  footer,
  formProps,
  modalId,
}) {
  if (!isOpen) {
    return null;
  }

  // evita scroll do body quando o modal está aberto
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, []); // roda apenas enquanto o modal estiver montado

  const isDelete = variant === 'delete';
  // CLASSE RENOMEADA: modal-backdrop -> modal-backdrop_P
  const backdropClass = `modal-backdrop_P-${variant}`;
  const CloseButtonIcon = isDelete ? closeBlackIcon : closeIcon;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Se é um formulário, envolve tudo em form
  if (formProps) {
    return (
      <>
        {/* CLASSE RENOMEADA: backdropClass agora é modal-backdrop_P-[variant] */}
        <div className={backdropClass} onClick={handleBackdropClick}></div>
        {/* Adicionado o sufixo _P ao id principal, caso queira estilizar com ele */}
        <div id={modalId} className="modal_P">
          {/* CLASSE RENOMEADA: modal-header -> modal-header_P */}
          <div className="modal-header_P">
            <h2>{title}</h2>
            <button
              type="button"
              // CLASSES RENOMEADAS: modal-close-delete-btn_P e modal-close-btn_P
              className={isDelete ? 'modal-close-delete-btn_P' : 'modal-close-btn_P'}
              onClick={onClose}
            >
              {CloseButtonIcon ? <img src={CloseButtonIcon} alt="Fechar" /> : '×'}
            </button>
          </div>

          <form {...formProps}>
            {/* CLASSE RENOMEADA: modal-body -> modal-body_P */}
            <div className="modal-body_P">{children}</div>
            {footer}
          </form>
        </div>
      </>
    );
  }

  // Se não é formulário, estrutura normal
  return (
    <>
      {/* CLASSE RENOMEADA: backdropClass agora é modal-backdrop_P-[variant] */}
      <div className={backdropClass} onClick={handleBackdropClick}></div>
      {/* Adicionado o sufixo _P ao id principal, caso queira estilizar com ele */}
      <div id={modalId} className="modal_P">
        {/* CLASSE RENOMEADA: modal-header -> modal-header_P */}
        <div className="modal-header_P">
          <h2>{title}</h2>
          <button
            type="button"
            // CLASSES RENOMEADAS: modal-close-delete-btn_P e modal-close-btn_P
            className={isDelete ? 'modal-close-delete-btn_P' : 'modal-close-btn_P'}
            onClick={onClose}
          >
            {CloseButtonIcon ? <img src={CloseButtonIcon} alt="Fechar" /> : '×'}
          </button>
        </div>

        {/* CLASSE RENOMEADA: modal-body -> modal-body_P */}
        <div className="modal-body_P">{children}</div>

        {footer}
      </div>
    </>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf(['default', 'add', 'edit', 'view', 'delete']),
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  footer: PropTypes.node,
  formProps: PropTypes.shape({
    onSubmit: PropTypes.func,
    className: PropTypes.string,
    id: PropTypes.string,
  }),
  modalId: PropTypes.string,
};

export default Modal;
