import React from "react";
import FecharIcon from "../../../assets/svg/fechar.svg";
import "../GestaoDespesas.css";
import { atualizarDespesa } from "../GestaoDespesas";
import SwitchAlert from "../../../components/SwitchAlert/SwitchAlert";

export default function ModalEditarDespesa({ show, onClose, editingItem, atualizarLista }) {
    const [alertState, setAlertState] = React.useState({ visible: false, message: "", type: "info", duration: 3000 });

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

        // === NOVA VALIDAÇÃO PARA AMBAS ===
        const regexTexto = /^[A-Za-zÀ-ú\s.\-]+$/;

        if (!etiqueta || etiqueta.length < 3 || !regexTexto.test(etiqueta)) {
            // alert("❌ Etiqueta deve ter pelo menos 3 caracteres e pode conter letras, espaços, pontos e traços (sem números).");
            setAlertState({ visible: true, message: "Etiqueta deve ter pelo menos 3 caracteres e pode conter letras, espaços, pontos e traços (sem números).", type: "error", duration: 3500 });
            return;
        }

        if (!descricao || descricao.length < 3 || !regexTexto.test(descricao)) {
            // alert("❌ Descrição deve ter pelo menos 3 caracteres e pode conter letras, espaços, pontos e traços (sem números).");
            setAlertState({ visible: true, message: "Descrição deve ter pelo menos 3 caracteres e pode conter letras, espaços, pontos e traços (sem números).", type: "error", duration: 3500 });
            return;
        }

        if (urlNuvem && !(/\.(pdf|com|br)$/i).test(urlNuvem)) {
            // alert("❌ URL deve terminar com .pdf, .com ou .br");
            setAlertState({ visible: true, message: "URL deve terminar com .pdf, .com ou .br", type: "error", duration: 3500 });
            return;
        }

        if (isNaN(valor) || valor < 0) {
            // alert("❌ Valor não pode ser negativo.");
            setAlertState({ visible: true, message: "Valor não pode ser negativo.", type: "error", duration: 3500 });
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

        console.log("Dados atualizados:", updatedData);

        try {
            console.log("Enviando requisição PUT para backend...");
            const response = await atualizarDespesa(editingItem.idConta, updatedData);
            console.log("✅ [SUCESSO] Despesa atualizada:", response.data);

            // alert("✅ Conta atualizada com sucesso");
            setAlertState({ visible: true, message: "Conta atualizada com sucesso", type: "success", duration: 2200 });

            atualizarLista();

            onClose();
            window.location.reload();

        } catch (error) {
            console.error("❌ [ERRO] Falha ao atualizar despesa:", error);
            // alert("Erro ao atualizar despesa. Verifique o console para mais detalhes.");
            setAlertState({ visible: true, message: "Erro ao atualizar despesa. Verifique o console para mais detalhes.", type: "error", duration: 3500 });
        }

    };

    return (
        <div id="editExpenseModal_Davidson" className="modal_Adicionar_Despesas">
            <SwitchAlert
                visible={alertState.visible}
                message={alertState.message}
                type={alertState.type}
                duration={alertState.duration}
                onClose={() => setAlertState(s => ({ ...s, visible: false }))}
            />
            <div className="modal-content-despesas" style={{ maxHeight: "600px" }}>

                <div id="modal-header-top" style={{ backgroundColor: '#414141', borderBottom: 'none' }} className="modal-header">
                    <h2 style={{ fontSize: "47px", transform: "translateY(16%)" }}>Editar Despesa</h2>

                    <button className="modal-close-btn_Despesas_edit" style={{ transform: "translate(300%, 20%)" }} onClick={onClose}>
                        <img src={FecharIcon} alt="Fechar" />
                    </button>
                </div>

                <form id="editExpenseForm" onSubmit={handleSubmit}>
                    <div className="form-row_Davidson">
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

                    <div className="form-row_Davidson">
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

                    <div className="form-row_Davidson">
                        <div className="form-group">
                            <label style={{ transform: "translateX(-1%)" }} htmlFor="edit-valor">Valor</label>
                            <input
                                style={{ transform: "translateX(-3%)", width: "47%" }}
                                type="number"
                                step="0.01"
                                id="edit-valor"
                                name="valor"
                                defaultValue={editingItem.valor || 0}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row_Davidson" id="div_para_checkbox_edit">
                        <label className="pagamento-label">Pago?</label>
                        <div id="switch_edit" className="switch-row">
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

                    <div style={{ transform: "translateY(-10%)" }} id="div_para_botao">
                        <button type="submit" className="modal-add-btn_save">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
