import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import '../Css/Main.css';
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
  const containerClass = isDelete ? 'modal-delete' : 'modal';
  const hasSpecificBackdrop = ['add', 'edit', 'view', 'delete', 'default'].includes(variant);
  const backdropClass = hasSpecificBackdrop ? `modal-backdrop-${variant}` : 'modal-backdrop';
  const CloseButtonIcon = isDelete ? closeBlackIcon : closeIcon;

  const Wrapper = formProps ? 'form' : 'div';
  const wrapperClassName = formProps?.className
    ? `${formProps.className} modal-body-wrapper`.trim()
    : 'modal-body-wrapper';
  const wrapperProps = formProps
    ? { ...formProps, className: wrapperClassName }
    : { className: wrapperClassName };

  return (
    <>
      <div className={backdropClass} onClick={onClose}></div>
      <div id={modalId} className={containerClass}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>{title}</h2>
            <button type="button" className={isDelete ? 'modal-close-delete-btn' : 'modal-close-btn'} onClick={onClose}>
              <img src={CloseButtonIcon} alt="Fechar" />
            </button>
          </div>

          <Wrapper {...wrapperProps}>
            <div className="modal-body">
              {children}
            </div>
          </Wrapper>

          {footer && (
            <div className="modal-footer">
              {footer}
            </div>
          )}
        </div>
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