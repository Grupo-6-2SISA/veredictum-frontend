import React from 'react';
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

  const isDelete = variant === 'delete';
  const backdropClass = `modal-backdrop-${variant}`;
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
        <div className={backdropClass} onClick={handleBackdropClick}></div>
        <div id={modalId}>
          <div className="modal-header">
            <h2>{title}</h2>
            <button
              type="button"
              className={isDelete ? 'modal-close-delete-btn' : 'modal-close-btn'}
              onClick={onClose}
            >
              {CloseButtonIcon ? <img src={CloseButtonIcon} alt="Fechar" /> : '×'}
            </button>
          </div>

          <form {...formProps}>
            <div className="modal-body">{children}</div>
            {footer}
          </form>
        </div>
      </>
    );
  }

  // Se não é formulário, estrutura normal
  return (
    <>
      <div className={backdropClass} onClick={handleBackdropClick}></div>
      <div id={modalId}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button
            type="button"
            className={isDelete ? 'modal-close-delete-btn' : 'modal-close-btn'}
            onClick={onClose}
          >
            {CloseButtonIcon ? <img src={CloseButtonIcon} alt="Fechar" /> : '×'}
          </button>
        </div>

        <div className="modal-body">{children}</div>

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