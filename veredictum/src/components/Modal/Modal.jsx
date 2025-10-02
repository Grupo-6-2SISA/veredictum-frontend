import React from 'react';
import './Modal.css';
import '../Css/Main.css';
import closeIcon from '../../assets/svg/close.svg';
import closeBlackIcon from '../../assets/svg/close_black.svg';

function Modal({
  isEditOpen,
  isViewOpen,
  isDeleteOpen,
  clientName,
  onCloseEdit,
  onCloseView,
  onCloseDelete,
  onSubmitEdit,
  onConfirmDelete,
}) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  };

  if (isEditOpen) {
    return (
      <>
        <div className="modal-backdrop-edit" onClick={onCloseEdit}></div>
        <div id="new-appointment-modal-edit-client" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Editar Clientes</h2>
              <button type="button" className="modal-close-btn" onClick={onCloseEdit}>
                <img src={closeIcon} alt="Fechar" />
              </button>
            </div>
            <form className="appointment-form" id="formEditarCliente" onSubmit={onSubmitEdit}>
              <div className="form-row" style={gridStyle}> 
              </div>
              <div className="form-footer-client">
                <button type="submit" className="btn-new-appointment">
                  im
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

  if (isViewOpen) {
    return (
      <>
        <div className="modal-backdrop-view" onClick={onCloseView}></div>
        <div id="new-appointment-modal-view-client" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Informações sobre o Cliente</h2>
              <button type="button" className="modal-close-btn" onClick={onCloseView}>
                <img src={closeIcon} alt="Fechar" />
              </button>
            </div>
            <form className="appointment-form" id="formVisualizarCliente">
              <div className="form-row" style={gridStyle}>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

  if (isDeleteOpen) {
    return (
      <>
        <div className="modal-backdrop-delete" onClick={onCloseDelete}></div>
        <div id="modal-delete-schedule" className="modal-delete">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Desativar Clientes</h2>
              <button type="button" className="modal-close-delete-btn" onClick={onCloseDelete}>
                <img src={closeBlackIcon} alt="Fechar" />
              </button>
            </div>
            <div className="modal-body">
              <p>
                Deseja desativar <span className="client-name">{clientName}</span>?
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel-delete" onClick={onCloseDelete}>
                Não
              </button>
              <button type="button" className="btn-confirm-delete" onClick={onConfirmDelete}>
                Sim
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}

export default Modal;