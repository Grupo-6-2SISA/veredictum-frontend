import React from 'react';
import PropTypes from 'prop-types';
import './ConfirmacaoExclusao.css'; // Importa os estilos dedicados

function ConfirmacaoExclusao({ message = 'Confirmar exclusão?', onConfirm, onCancel }) {

  // O texto da imagem de cancelamento é "Deseja cancelar o atendimento de às do dia ?"

  return (
    <div className="confirmacao-container">
      <p className="confirmacao-message">
        {message}
      </p>

      <div className="confirmacao-buttons">
        {/* Botão 'Não' */}
        <button
          type="button"
          onClick={onCancel}
          className="btn-confirmacao-cancel"
        >
          Não
        </button>

        {/* Botão 'Sim' */}
        <button
          type="button"
          onClick={onConfirm}
          className="btn-confirmacao-sim"
        >
          Sim
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