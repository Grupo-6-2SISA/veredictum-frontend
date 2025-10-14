import React, { useState } from "react";
import FecharIcon from "../../../assets/svg/fechar.svg";
import { adicionarDespesa } from "../GestaoDespesas";

export default function ModalAdicionarDespesa({ show, onClose, atualizarLista }) {
    const [isPago, setIsPago] = useState(false);

    if (!show) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataAtual = new Date().toISOString().split("T")[0];

        const etiqueta = e.target.etiqueta.value.trim();
        const valor = parseFloat(e.target.valor.value);
        const dataVencimento = e.target.dataVencimento.value;
        const urlNuvem = e.target.urlNuvem.value.trim();
        const descricao = e.target.descricao.value.trim();

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

        if (dataVencimento < dataAtual) {
            alert("❌ Data de vencimento não pode ser menor que a data atual.");
            return;
        }

        const formData = {
            dataCriacao: dataAtual,
            etiqueta,
            valor,
            dataVencimento,
            urlNuvem,
            descricao,
            isPago,
        };

        console.log("🟡 [DEBUG] Dados do formulário coletados:", formData);

        try {
            console.log("📤 [DEBUG] Enviando requisição POST para backend...");
            const response = await adicionarDespesa(formData);
            console.log("✅ [SUCESSO] Resposta do backend:", response.data);

            alert("Despesa adicionada com sucesso!");
            atualizarLista();
            window.location.reload();
            onClose();
        } catch (error) {
            console.error("❌ [ERRO] Falha ao adicionar despesa:", error);
            alert("Erro ao adicionar despesa. Verifique o console para mais detalhes.");
            atualizarLista();
            window.location.reload();
            onClose();
        }
    };

    return (
        <div id="ModalAdicionarDespesa" className="modal">
            <div className="modal_add_despesas">
                <div className="modal-header">
                    <h2>Adicionar Despesa</h2>
                    <button className="modal-close-btn" onClick={onClose}>
                        <img src={FecharIcon} alt="Fechar" />
                    </button>
                </div>

                <form id="expenseForm" onSubmit={handleSubmit}>
                    {/* Primeira linha */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="etiqueta">Etiqueta</label>
                            <input type="text" id="etiqueta" name="etiqueta" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="urlNuvem">URL</label>
                            <input type="text" id="urlNuvem" name="urlNuvem" />
                        </div>
                    </div>

                    {/* Segunda linha */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="dataVencimento">Data de Vencimento</label>
                            <input type="date" id="dataVencimento" name="dataVencimento" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="descricao">Descrição</label>
                            <input type="text" id="descricao" name="descricao" />
                        </div>
                    </div>

                    {/* Valor */}
                    <div className="form-row">
                        <div className="form-group">
                            <label style={{ transform: "translateX(-1%)"}}
                                htmlFor="valor">Valor</label>
                            <input
                                style={{ transform: "translateX(-3%)", width: "47%" }}

                                type="number"
                                step="0.01"
                                id="valor"
                                name="valor" required />
                        </div>
                    </div>

                    {/* Rodapé */}
                    <div className="form-footer-despesas">
                        <div id="div_para_checkbox">
                            <label className="pagamento-label">Pago?</label>
                            <div className="switch-row">
                                <span className="switch-text off">Não</span>
                                <label className="switch">
                                    <input type="checkbox" checked={isPago} onChange={() => setIsPago(!isPago)} />
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
    );
}
