
function ModalVerMaisRotina({ isModalOpen, closeModalVerMaisRotina, rotinaData, FecharIcone }) {
    if (!isModalOpen || !rotinaData) return null;

    const { nome, arquivo, horaInicio, dataInicio, dataFim, status } = rotinaData;

    return (
        <div id="modalVerMaisRotina" className="modal" style={{ display: 'flex' }}>
            <div className="modal-content">
                <div id="div_para_titulo">
                    <span className="close" onClick={closeModalVerMaisRotina}>
                        <img src={FecharIcone} alt="Fechar" />
                    </span>
                    <h2>Informações sobre Rotina</h2>
                </div>
                <div className="modal-column">
                    <div className="form-group"><label>Nome Rotina</label><input type="text" readOnly defaultValue={nome || ''} /></div>
                    <div className="form-group"><label>Hora de Início</label><input type="time" readOnly defaultValue={horaInicio || ''} /></div>
                    <div className="form-group"><label>Data de Início</label><input type="date" readOnly defaultValue={dataInicio || ''} /></div>
                    <div className="form-group"><label>Data de Fim</label><input type="date" readOnly defaultValue={dataFim || ''} /></div>
                </div>
                <div className="modal-column">
                    <div className="form-group"><label>Rotina</label><input type="text" readOnly defaultValue={arquivo || ''} /></div>
                    <div className="form-group">
                        <label>Rodou Hoje?</label>
                        <select disabled><option>Lista de Clientes</option><option>Não Rodou</option></select>
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select disabled defaultValue={status || 'Ativo'}><option>Ativo</option><option>Inativo</option></select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalVerMaisRotina;