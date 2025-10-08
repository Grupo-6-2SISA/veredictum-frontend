function ModalEditarRotina({ isModalOpen, closeModalEditarRotina, handleSalvar, rotinaData, FecharIcone }) {
    if (!isModalOpen || !rotinaData) return null;

    const { nome, arquivo, horaInicio, dataInicio, dataFim, status } = rotinaData;

    return (
        <div id="modal-editar-rotina" className="modal" style={{ display: 'flex' }}>
            <div className="modal-content" id="modal-editar-rotina-content">

                <div id="div_para_titulo">
                    <span className="close" id="btn-fechar-modal-editar-rotina" onClick={closeModalEditarRotina}>
                        <img src={FecharIcone} alt="Fechar" id="icone-fechar-modal-editar-rotina" />
                    </span>
                    <h2 id="titulo-modal-editar-rotina">Editar Rotina</h2>
                </div>

                <div className="modal-column" id="coluna-esquerda-modal-editar-rotina">
                    <div className="form-group" id="grupo-nome-rotina">
                        <label id="label-nome-rotina">Nome Rotina</label>
                        <input type="text" id="input-nome-rotina" defaultValue={nome || ''} />
                    </div>

                    <div className="form-group" id="grupo-hora-inicio">
                        <label id="label-hora-inicio">Hora de Início</label>
                        <input type="time" id="input-hora-inicio" defaultValue={horaInicio || ''} />
                    </div>

                    <div className="form-group" id="grupo-data-inicio">
                        <label id="label-data-inicio">Data de Início</label>
                        <input type="date" id="input-data-inicio" defaultValue={dataInicio || ''} />
                    </div>

                    <div className="form-group" id="grupo-data-fim">
                        <label id="label-data-fim">Data de Fim</label>
                        <input type="date" id="input-data-fim" defaultValue={dataFim || ''} />
                    </div>
                </div>

                <div className="modal-column" id="coluna-direita-modal-editar-rotina">
                    <div className="form-group" id="grupo-arquivo-rotina">
                        <label id="label-arquivo-rotina">Rotina</label>
                        <input type="text" id="input-arquivo-rotina" defaultValue={arquivo || ''} />
                    </div>

                    <div className="form-group" id="grupo-rodou-hoje">
                        <label id="label-rodou-hoje">Rodou Hoje?</label>
                        <select id="select-rodou-hoje" defaultValue={"Lista de Clientes"}>
                            <option>Lista de Clientes</option>
                            <option>Não Rodou</option>
                        </select>
                    </div>

                    <div className="form-group" id="grupo-status">
                        <label id="label-status">Status</label>
                        <select id="select-status" defaultValue={status || 'Ativo'}>
                            <option>Ativo</option>
                            <option>Inativo</option>
                        </select>
                    </div>

                    <div className="form-group" id="grupo-inativo">
                    </div>
                </div>

                <div id="div_para_botao">
                    <button
                        className="save-btn-rotina"
                        id="botao-salvar-modal-editar-rotina"
                        onClick={handleSalvar}
                    >
                        Salvar Edição
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalEditarRotina;
