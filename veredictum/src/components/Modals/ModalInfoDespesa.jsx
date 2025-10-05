import React from "react";
import FecharIcon from "../../assets/svg/fechar.svg";
import "./Modals.css";

export default function ModalInfoDespesa({ show, onClose, infoItem }) {
  if (!show || !infoItem) return null;

  return (
    <div className="modal-backdrop">
      <div  id="infoExpenseModal" className="modal-content-despesas">
        <button className="close" onClick={onClose}>
          <img src={FecharIcon} alt="Fechar" />
        </button>
        <h2>Informação sobre a Despesa</h2>
        <br />
        <form>
          <div className="form-row">
            <div className="form-group">
              <label>Etiqueta</label>
              <input type="text" value={infoItem.etiqueta} readOnly />
            </div>
            <div className="form-group">
              <label>URL</label>
              <input type="text" value={infoItem.url} readOnly />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Data de Vencimento</label>
              <input type="date" value={infoItem.vencimento} readOnly />
            </div>
            <div className="form-group">
              <label>Comentário</label>
              <input type="text" value={infoItem.comentario} readOnly />
            </div>
          </div>

          <div className="form-row">
            <label>Pago?</label>
            <label>
              <input type="checkbox" checked={infoItem.pago} disabled /> SIM
            </label>
            <label>
              <input type="checkbox" checked={!infoItem.pago} disabled /> NÃO
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
