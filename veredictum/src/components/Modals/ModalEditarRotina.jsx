function ModalEditarRotina({ isModalOpen, closeModalEditarRotina, handleSalvar, rotinaData, FecharIcone }) {
    if (!isModalOpen || !rotinaData) return null;

    const { nome, arquivo, horaInicio, dataInicio, dataFim, status } = rotinaData;

    return (
        <div id="modalEditarRotina" className="modal" style={{ display: 'flex' }}>
            <div className="modal-content">
                <div id="div_para_titulo">
                    <span className="close" onClick={closeModalEditarRotina}>
                        <img src={FecharIcone} alt="Fechar" />
                    </span>
                    <h2>Editar Rotina</h2>
                </div>
                
                <div className="modal-column">
                    <div className="form-group"><label>Nome Rotina</label><input type="text" defaultValue={nome || ''} /></div>
                    <div className="form-group"><label>Hora de Início</label><input type="time" defaultValue={horaInicio || ''} /></div>
                    <div className="form-group"><label>Data de Início</label><input type="date" defaultValue={dataInicio || ''} /></div>
                    <div className="form-group"><label>Data de Fim</label><input type="date" defaultValue={dataFim || ''} /></div>
                </div>

                <div className="modal-column">
                    <div className="form-group"><label>Rotina</label><input type="text" defaultValue={arquivo || ''} /></div>
                    <div className="form-group">
                        <label>Rodou Hoje?</label>
                        <select defaultValue={"Lista de Clientes"}><option>Lista de Clientes</option><option>Não Rodou</option></select>
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select defaultValue={status || 'Ativo'}><option>Ativo</option><option>Inativo</option></select>
                    </div>
                </div>
                
                <div id="div_para_botao">
                    <button className="save-btn-rotina" onClick={handleSalvar}>Salvar Edição</button>
                </div>
            </div>
        </div>
    );
}

export default ModalEditarRotina;