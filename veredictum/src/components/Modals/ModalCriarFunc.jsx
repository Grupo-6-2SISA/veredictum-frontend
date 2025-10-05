function ModalCriarFuncionario({ isModalOpen, closeModalCriar, handleCadastro, FecharIcone }) {
    if (!isModalOpen) {
        return null;
    }

    return (
        <div id="modalCriar" className="modal" style={{ display: 'flex' }}>
            <div className="modal-content">
                <div id="div_para_titulo">
                    <span className="close" onClick={closeModalCriar}>
                        <img src={FecharIcone} alt="Fechar" />
                    </span>
                    <h2>Cadastrar Funcionário</h2>
                </div>

                <div className="modal-column">
                    <div className="form-group">
                        <label>Nome</label>
                        <input type="text" placeholder="Digite o nome" />
                    </div>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input type="email" placeholder="Digite o e-mail" />
                    </div>
                </div>

                <div className="modal-column">
                    <div className="form-group">
                        <label>Tipo de Usuário</label>
                        <select>
                            <option>Administrador</option>
                            <option>Usuário</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <input type="password" placeholder="Digite a senha" />
                    </div>
                </div>

                <div id="div_para_botao">
                    <button className="modal-add-btn" onClick={handleCadastro}>
                        Cadastrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalCriarFuncionario;