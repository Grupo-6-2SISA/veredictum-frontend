import React from 'react';
import PropTypes from 'prop-types';
import ModalContainer from './ModalContainer';
import ConfirmacaoExclusao from './ConfirmacaoExclusao';

function ModalExcluirAtendimento({
  open,
  onClose,
  onConfirm,
  info, // { nome, date, time }
  title = 'Cancelamento de atendimentos',
}) {
  const nome = info?.nome || '';
  const date = info?.date || '';
  const time = info?.time || '';

  const message =
    `Deseja cancelar o atendimento${time ? ` de ${time}` : ''}` +
    `${date ? ` do dia ${date}` : ''}` +
    `${nome ? ` de ${nome}` : ''}?`;

  return (
    <ModalContainer
      show={open}
      onClose={onClose}
      title={title}
      modalId="modal-excluir-atendimento"
      variant="delete"
    >
      <ConfirmacaoExclusao
        message={message}
        onConfirm={onConfirm}
        onCancel={onClose}
        cancelText="Não"
        confirmText="Sim"
      />
    </ModalContainer>
  );
}

ModalExcluirAtendimento.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  info: PropTypes.shape({
    nome: PropTypes.string,
    date: PropTypes.string, // dd/MM/yyyy
    time: PropTypes.string, // HH:mm
  }),
  title: PropTypes.string,
};

export default ModalExcluirAtendimento;