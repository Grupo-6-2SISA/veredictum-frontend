import React from 'react';
import PropTypes from 'prop-types';
import './ConfirmacaoExclusao.css';

function ConfirmacaoExclusao({
  message = 'Deseja cancelar o atendimento de às do dia ?',
  onConfirm,
  onCancel,
  cancelText = 'Não',
  confirmText = 'Sim'
}) {
  return (
    <div className="confirmacao-container" role="group" aria-label="Confirmação de exclusão">
      <p className="confirmacao-message">{message}</p>

      <div className="confirmacao-buttons">
        <button
          type="button"
          onClick={onCancel}
          className="btn-confirmacao btn-confirmacao-cancel"
        >
          {cancelText}
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="btn-confirmacao btn-confirmacao-sim"
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}

ConfirmacaoExclusao.propTypes = {
  message: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
};

export default ConfirmacaoExclusao;