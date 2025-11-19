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

        // === NOVA VALIDAÇÃO (mesma do modal editar) ===
        const regexTexto = /^[A-Za-zÀ-ú\s.\-]+$/;

        if (!etiqueta || etiqueta.length < 3 || !regexTexto.test(etiqueta)) {
            alert("❌ Etiqueta deve ter pelo menos 3 caracteres e pode conter letras, espaços, pontos e traços (sem números).");
            return;
        }

        if (!descricao || descricao.length < 3 || !regexTexto.test(descricao)) {
            alert("❌ Descrição deve ter pelo menos 3 caracteres e pode conter letras, espaços, pontos e traços (sem números).");
            return;
        }

        if (urlNuvem && !(/\.(pdf|com|br)$/i).test(urlNuvem)) {
            alert("❌ URL deve terminar com .pdf, .com ou .br");
            return;
        }

        if (isNaN(valor) || valor < 0) {
            alert("❌ Valor não pode ser negativo.");
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

        console.log("Dados do formulário coletados:", formData);

        try {
            console.log("Enviando requisição POST para backend...");
            const response = await adicionarDespesa(formData);
            console.log("✅ [SUCESSO] Resposta do backend:", response.data);

            alert("✅ Despesa adicionada com sucesso!");

            atualizarLista();
            onClose();

            setTimeout(() => {
                window.location.reload();
            }, 300);

        } catch (error) {
            console.error("❌ [ERRO] Falha ao adicionar despesa:", error);
            alert("Erro ao adicionar despesa. Verifique o console para mais detalhes.");

            setTimeout(() => {
                window.location.reload();
            }, 300);

            onClose();
        }
    };

    return (
        <div id="ModalAdicionarDespesa_Davidson" className="modal_Adicionar_Despesas">
            <div className="modal_add_despesas">
                <div className="modal-header" style={{ backgroundColor: '#424242', borderBottom: 'none', paddingBottom: "40px" }}>
                    <h2 style={{ fontSize: "45px", paddingLeft: "60px" }}>Adicionar Despesa</h2>
                    <button style={{ transform: "translateX(350%)" }} className="modal-close-btn_Despesas" onClick={onClose}>
                        <img src={FecharIcon} alt="Fechar" />
                    </button>
                </div>

                <form id="expenseForm" onSubmit={handleSubmit}>
                    {/* Primeira linha */}
                    <div className="form-row_Davidson">
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
                    <div className="form-row_Davidson">
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
                    <div className="form-row_Davidson">
                        <div className="form-group">
                            <label htmlFor="valor">Valor</label>
                            <input type="number" step="0.01" id="valor" name="valor" required />
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
