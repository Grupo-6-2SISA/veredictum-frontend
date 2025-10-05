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

                    <div className="form-row">
                        <label>Pago?</label>
                        <label>
                            <input
                                type="radio"
                                name="edit-pago"
                                value="sim"
                                defaultChecked={editingItem.pago === true}
                            />{" "}
                            SIM
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="edit-pago"
                                value="nao"
                                defaultChecked={editingItem.pago === false}
                            />{" "}
                            NÃO
                        </label>
                    </div>

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
