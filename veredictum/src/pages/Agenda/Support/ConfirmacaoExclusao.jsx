import React from 'react';
import PropTypes from 'prop-types';

function ConfirmacaoExclusao({ message = 'Confirmar exclusão?', onConfirm, onCancel }) {
  return (
    <div style={{ padding: 12 }}>
      <p style={{ margin: '8px 0 16px' }}>{message}</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <button type="button" onClick={onCancel} style={{ padding: '8px 14px', borderRadius: 8 }}>
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirm}
          style={{ padding: '8px 14px', borderRadius: 8, background: '#c62828', color: '#fff', border: 'none' }}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

ConfirmacaoExclusao.propTypes = {
  message: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ConfirmacaoExclusao;