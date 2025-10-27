import React from "react";
import FecharIcon from "../../../assets/svg/fechar.svg";
import "../../../components/Modals/Modals.css";

export default function ModalInfoDespesa({ show, onClose, infoItem }) {
    if (!show || !infoItem) return null;

    return (
        <div className="modal-backdrop">
            <div id="infoExpenseModal_Davidson" className="modal-content-despesas">

                {/* Botão de fechar */}
                <button className="close" onClick={onClose}>
                    <img style={{ transform: "translateY(-43%)" }} src={FecharIcon} alt="Fechar" />
                </button>

                <h2>Informação sobre a Despesa</h2>
                <br />

                <form>
                    {/* Primeira linha de inputs */}
                    <div className="form-row_Davidson">
                        <div className="form-group">
                            <label>Etiqueta</label>
                            <input type="text" value={infoItem.etiqueta} readOnly />
                        </div>
                        <div className="form-group">
                            <label>URL</label>
                            <input type="text" value={infoItem.urlNuvem || ""} readOnly />
                        </div>
                    </div>

                    {/* Segunda linha de inputs */}
                    <div className="form-row_Davidson">
                        <div className="form-group">
                            <label>Data de Vencimento</label>
                            <input type="date" value={infoItem.dataVencimento} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Descrição</label>
                            <input type="text" value={infoItem.descricao || ""} readOnly />
                        </div>
                    </div>

                    {/* Terceira linha de inputs */}
                    <div className="form-row_Davidson">

                        <div className="form-group">
                            <label style={{ transform: "translateX(-1%)"}}
                            >Valor</label>
                            <input
                                style={{ transform: "translateX(-3%)", width: "47%" }}
                                type="number"
                                value={infoItem.valor} readOnly />
                        </div>
                    </div>

                    <div className="form-row_Davidson" id="div_para_checkbox_info">
                        <label className="pagamento-label">Pago?</label>

                        <div id="swithc_info" className="switch-row">
                            <span className="switch-text off">Não</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={infoItem.isPago}
                                    disabled
                                />
                                <span className="slider"></span>
                            </label>
                            <span className="switch-text on">Sim</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
