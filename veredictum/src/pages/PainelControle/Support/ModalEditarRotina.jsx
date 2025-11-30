import React, { useState, useEffect } from 'react';
import { AtualizarRotinas } from "../Painel";

function ModalEditarRotina({ isModalOpen, closeModalEditarRotina, rotinaData, FecharIcone, onAtualizarRotina, showAlert }) {
    if (!isModalOpen || !rotinaData) return null;

    const [formData, setFormData] = useState({
        nome: '',
        arquivo: '',
        horaInicio: '',
        dataInicio: '',
        dataFim: '',
        status: 'Ativo',
    });

    useEffect(() => {
        if (rotinaData) {
            setFormData({
                nome: rotinaData.nomeRotina || rotinaData.nome || '',
                arquivo: rotinaData.rotinaChamada || rotinaData.arquivo || '',
                horaInicio: rotinaData.horaInicio || '',
                dataInicio: rotinaData.dataInicio || '',
                dataFim: rotinaData.dataFim || '',
                status: (rotinaData.isAtivo ?? (rotinaData.status === 'Ativo')) ? 'Ativo' : 'Inativo',
            });
        }
    }, [rotinaData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSalvar = async () => {

        // 🧩 Validações

        const nomeValido = /^[A-Za-zÀ-ÿ\s()_]+$/;

        if (!nomeValido.test(formData.nome)) {
            // alert("O nome da rotina deve conter apenas letras, espaços, parênteses ou underline (_).");
            showAlert("O nome da rotina deve conter apenas letras, espaços, parênteses ou underline (_).", "error", 3500);
            return;
        }

        if (!nomeValido.test(formData.arquivo)) {
            // alert("O campo 'Rotina' deve conter apenas letras, espaços, parênteses ou underline (_).");
            showAlert("O campo 'Rotina' deve conter apenas letras, espaços, parênteses ou underline (_).", "error", 3500);
            return;
        }

        if (formData.dataInicio && formData.dataFim && formData.dataFim < formData.dataInicio) {
            // alert("A data de fim não pode ser anterior à data de início.");
            showAlert("A data de fim não pode ser anterior à data de início.", "error", 3500);
            return;
        }

        if (formData.dataInicio && formData.dataFim && formData.dataInicio > formData.dataFim) {
            // alert("A data de início não pode ser posterior à data de fim.");
            showAlert("A data de início não pode ser posterior à data de fim.", "error", 3500);
            return;
        }

        try {
            const horaFormatada = formData.horaInicio.length === 5 ? formData.horaInicio + ":00" : formData.horaInicio;

            const payload = {
                nomeRotina: formData.nome.trim(),
                rotinaChamada: formData.arquivo.trim(),
                horaInicio: horaFormatada,
                dataInicio: formData.dataInicio,
                dataFim: formData.dataFim,
                isAtivo: formData.status === 'Ativo',
            };

            const idParaEnvio = rotinaData.idRotina ?? rotinaData.id;
            await AtualizarRotinas(idParaEnvio, payload);

            // alert("Rotina atualizada com sucesso!");
            showAlert("Rotina atualizada com sucesso!", "success", 2200);
            onAtualizarRotina && onAtualizarRotina(idParaEnvio, payload);
            closeModalEditarRotina();
            window.location.reload();

        } catch (error) {
            console.error("❌ Erro ao atualizar rotina:", error);
            // alert("Erro ao atualizar rotina. Tente novamente.");
            showAlert("Erro ao atualizar rotina. Tente novamente.", "error", 3500);
        }
    };

    return (
        <div id="modal-editar-rotina" className="modal_Painel_Controle" style={{ display: 'flex' }}>
            <div className="modal-content_Painel" id="modal-editar-rotina-content">
                <div id="div_para_titulo">
                    <span className="close" onClick={closeModalEditarRotina}>
                        <img src={FecharIcone} alt="Fechar" />
                    </span>
                    <h2>Editar Rotina</h2>
                </div>

                <div className="modal-column">
                    <div className="form-group">
                        <label>Nome Rotina</label>
                        <input
                            name="nome"
                            type="text"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Digite o nome da rotina"
                        />
                    </div>
                    <div className="form-group">
                        <label>Hora de Início</label>
                        <input
                            name="horaInicio"
                            type="time"
                            value={formData.horaInicio}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Data de Início</label>
                        <input
                            name="dataInicio"
                            type="date"
                            value={formData.dataInicio}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="modal-column">
                    <div className="form-group">
                        <label>Rotina</label>
                        <input
                            name="arquivo"
                            type="text"
                            value={formData.arquivo}
                            onChange={handleChange}
                            placeholder="Digite o nome da rotina chamada"
                        />
                    </div>

                    <div className="form-group">
                        <label>Data de Fim</label>
                        <input
                            name="dataFim"
                            type="date"
                            value={formData.dataFim}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Rodou Hoje?</label>
                        <select value={rotinaData.executado || "Sim"}>
                            <option>Sim</option>
                        </select>
                    </div>
                </div>

                <div id="div_para_botao">
                    <button className="save-btn-rotina" onClick={handleSalvar}>
                        Salvar Edição
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalEditarRotina;
