import React from "react";

import FecharIcon from "../../assets/svg/fechar.svg";

export default function ModalAdicionarDespesa({ show, onClose, onSubmit }) {
  if (!show) return null;
  return (
    <>
      <div id="ModalAdicionarDespesa" className="modal">

        <div className="modal_add_despesas">

          <div className="modal-header">
            <h2>Adicionar Despesa</h2>
            <button className="modal-close-btn" onClick={onClose}>
              <img src={FecharIcon} alt="Fechar" />
            </button>
          </div>

          <form id="expenseForm" onSubmit={onSubmit}>

            <div className="form-row">

              <div className="form-group">

                <label htmlFor="etiqueta">Etiqueta</label>
                <input type="text" id="etiqueta" name="etiqueta" required />

              </div>

              <div className="form-group">

                <label htmlFor="url">URL</label>
                <input type="text" id="url" name="url" />

              </div>



            </div>

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="vencimento">Data de Vencimento</label>
                <input type="date" id="vencimento" name="vencimento" required />
              </div>

              <div className="form-group">
                <label htmlFor="comentario">Comentário</label>
                <input type="text" id="comentario" name="comentario" />
              </div>

            </div>

            <div id="form-row-vencimento" className="form-row">
              <div className="form-group" id="form-group-vencimento">
                <label htmlFor="vencimento">Valor</label>
                <input type="text" id="input-vencimento" name="vencimento" required />
              </div>
            </div>



            <div className="form-footer-despesas">

              <div id="div_para_checkbox">
                <label className="pagamento-label">Pago?</label>
                <div className="switch-row">
                  <span className="switch-text off">Não</span>
                  <label className="switch">
                    <input type="checkbox" id="pago_sim" name="pago_sim" value="sim" defaultChecked />
                    <span className="slider"></span>
                  </label>
                  <span className="switch-text on">Sim</span>
                </div>
              </div>

              <div id="div_para_botao">
                <button type="submit" className="btn-new-appointment">
                  Adicionar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
