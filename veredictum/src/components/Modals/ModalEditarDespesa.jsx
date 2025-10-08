import React from "react";
import FecharIcon from "../../assets/svg/fechar.svg";
import "../../pages/GestadoDespesas/GestaoDespesas.css";

export default function ModalEditarDespesa({ show, onClose, onSubmit, editingItem }) {
    if (!show || !editingItem) return null;

    return (
        <div id="editExpenseModal" className="modal">
            <div className="modal-content-despesas">

                {/* Cabeçalho do Modal */}
                <div id="modal-header-top" className="modal-header">
                    <h2>Editar Despesa</h2>
                    <button className="modal-close-btn" onClick={onClose}>
                        <img src={FecharIcon} alt="Fechar" />
                    </button>
                </div>

                <form id="editExpenseForm" onSubmit={onSubmit}>
                    {/* Primeira linha de inputs */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="edit-etiqueta">Etiqueta</label>
                            <input
                                type="text"
                                id="edit-etiqueta"
                                name="etiqueta"
                                defaultValue={editingItem.etiqueta}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="edit-url">URL</label>
                            <input
                                type="text"
                                id="edit-url"
                                name="url"
                                defaultValue={editingItem.url}
                            />
                        </div>
                    </div>

                    {/* Segunda linha de inputs */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="edit-vencimento">Data de Vencimento</label>
                            <input
                                type="date"
                                id="edit-vencimento"
                                name="vencimento"
                                defaultValue={editingItem.vencimento}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="edit-comentario">Comentário</label>
                            <input
                                type="text"
                                id="edit-comentario"
                                name="comentario"
                                defaultValue={editingItem.comentario}
                            />
                        </div>
                    </div>

                    {/* Linha do switch "Pago?" */}
                    <div className="form-row" id="div_para_checkbox_edit">
                        <label className="pagamento-label">Pago?</label>
                        <div className="switch-row">
                            <span className="switch-text off">Não</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    id="edit-pago-switch"
                                    name="edit-pago"
                                    defaultChecked={editingItem.pago === true}
                                />
                                <span className="slider"></span>
                            </label>
                            <span className="switch-text on">Sim</span>
                        </div>
                    </div>

                    {/* Botão de salvar */}
                    <div id="div_para_botao">
                        <button type="submit" className="modal-add-btn_save">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
