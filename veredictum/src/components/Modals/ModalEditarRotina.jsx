import React, { useState, useEffect } from 'react';
import { AtualizarRotinas } from "../../pages/PainelControle/Painel";

function ModalEditarRotina({ isModalOpen, closeModalEditarRotina, rotinaData, FecharIcone, onAtualizarRotina }) {
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
            console.log("🟣 Dados recebidos do backend:", rotinaData);

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
        console.log(`✏️ Alterando campo ${name}: ${value}`);
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSalvar = async () => {
        try {
            const horaFormatada = formData.horaInicio.length === 5 ? formData.horaInicio + ":00" : formData.horaInicio;
            const dataInicioFormatada = formData.dataInicio;
            const dataFimFormatada = formData.dataFim;

            const payload = {
                nomeRotina: formData.nome,
                rotinaChamada: formData.arquivo,
                horaInicio: horaFormatada,
                dataInicio: dataInicioFormatada,
                dataFim: dataFimFormatada,
                isAtivo: formData.status === 'Ativo',
            };

            console.log("🟢 Payload formatado que será enviado:", payload);

            const idParaEnvio = rotinaData.idRotina ?? rotinaData.id;
            await AtualizarRotinas(idParaEnvio, payload);

            console.log("✅ Rotina atualizada com sucesso!");
            onAtualizarRotina && onAtualizarRotina(idParaEnvio, payload);
            closeModalEditarRotina();
            window.location.reload();

        } catch (error) {
            console.error("❌ Erro ao atualizar rotina:", error);
            alert("Erro ao atualizar rotina. Tente novamente.");
        }
    };

    return (
        <div id="modal-editar-rotina" className="modal" style={{ display: 'flex' }}>
            <div className="modal-content" id="modal-editar-rotina-content">
                <div id="div_para_titulo">
                    <span className="close" onClick={closeModalEditarRotina}>
                        <img src={FecharIcone} alt="Fechar" />
                    </span>
                    <h2>Editar Rotina</h2>
                </div>

                <div className="modal-column">
                    <div className="form-group">
                        <label>Nome Rotina</label>
                        <input name="nome" type="text" value={formData.nome} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Hora de Início</label>
                        <input name="horaInicio" type="time" value={formData.horaInicio} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Data de Início</label>
                        <input name="dataInicio" type="date" value={formData.dataInicio} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Data de Fim</label>
                        <input name="dataFim" type="date" value={formData.dataFim} onChange={handleChange} />
                    </div>
                </div>

                <div className="modal-column">
                    <div className="form-group">
                        <label>Rotina</label>
                        <input name="arquivo" type="text" value={formData.arquivo} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Rodou Hoje?</label>
                        <select value={rotinaData.executado || "Lista de Clientes"} disabled>
                            <option>Sim</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option>Ativo</option>
                            <option>Inativo</option>
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
