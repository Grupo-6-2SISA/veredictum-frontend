import React from "react";
import FecharIcon from "../../../assets/svg/fechar.svg";
import "../GestaoDespesas.css";
import { atualizarDespesa } from "../GestaoDespesas";

export default function ModalEditarDespesa({ show, onClose, editingItem, atualizarLista }) {
    if (!show || !editingItem) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataCriacao = editingItem.dataCriacao;
        const etiqueta = e.target.etiqueta.value.trim();
        const descricao = e.target.descricao.value.trim();
        const valor = parseFloat(e.target.valor.value);
        const dataVencimento = e.target.dataVencimento.value;
        const urlNuvem = e.target.urlNuvem.value.trim();
        const isPago = e.target.isPago.checked;

        // === VALIDAÇÕES ===
        const somenteLetras = /^[A-Za-zÀ-ú\s]+$/;

        if (!etiqueta || etiqueta.length < 3 || !somenteLetras.test(etiqueta)) {
            alert("❌ Etiqueta deve ter pelo menos 3 letras e conter somente caracteres alfabéticos.");
            return;
        }

        if (!descricao || descricao.length < 3 || !somenteLetras.test(descricao)) {
            alert("❌ Descrição deve ter pelo menos 3 letras e conter somente caracteres alfabéticos.");
            return;
        }

        if (urlNuvem && !(/\.(pdf|com)$/i).test(urlNuvem)) {
            alert("❌ URL deve terminar com .pdf ou .com");
            return;
        }

        if (isNaN(valor) || valor < 0) {
            alert("❌ Valor não pode ser negativo.");
            return;
        }

        const updatedData = {
            idConta: editingItem.idConta,
            dataCriacao,
            etiqueta,
            valor,
            dataVencimento,
            urlNuvem: urlNuvem || null,
            descricao: descricao || null,
            isPago,
        };

        console.log("🟡 [DEBUG] Dados atualizados:", updatedData);

        try {
            console.log("📤 Enviando requisição PUT para backend...");
            const response = await atualizarDespesa(editingItem.idConta, updatedData);
            console.log("✅ [SUCESSO] Despesa atualizada:", response.data);
            alert("✅ Conta atualizada com sucesso");
            onClose();
            atualizarLista();
        } catch (error) {
            console.error("❌ [ERRO] Falha ao atualizar despesa:", error);
            alert("Erro ao atualizar despesa. Verifique o console para mais detalhes.");
        }
    };

    return (
        <div id="editExpenseModal" className="modal">
            <div className="modal-content-despesas" style={{ maxHeight: "580px" }}>
                <div id="modal-header-top" className="modal-header">
                    <h2>Editar Despesa</h2>
                    <button className="modal-close-btn" onClick={onClose}>
                        <img src={FecharIcon} alt="Fechar" />
                    </button>
                </div>

                <form id="editExpenseForm" onSubmit={handleSubmit}>
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
                                name="urlNuvem"
                                defaultValue={editingItem.urlNuvem || ""}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="edit-vencimento">Data de Vencimento</label>
                            <input
                                type="date"
                                id="edit-vencimento"
                                name="dataVencimento"
                                defaultValue={editingItem.dataVencimento}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-comentario">Descrição</label>
                            <input
                                type="text"
                                id="edit-comentario"
                                name="descricao"
                                defaultValue={editingItem.descricao || ""}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="edit-valor">Valor</label>
                            <input
                                type="number"
                                step="0.01"
                                id="edit-valor"
                                name="valor"
                                defaultValue={editingItem.valor || 0}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row" id="div_para_checkbox_edit">
                        <label className="pagamento-label">Pago?</label>
                        <div className="switch-row">
                            <span className="switch-text off">Não</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    id="edit-pago-switch"
                                    name="isPago"
                                    defaultChecked={editingItem.isPago === true}
                                />
                                <span className="slider"></span>
                            </label>
                            <span className="switch-text on">Sim</span>
                        </div>
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
