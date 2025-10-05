
function ModalEditarFuncionario({ isModalOpen, closeModalEditar, handleSalvar, funcionarioData, FecharIcone }) {
    if (!isModalOpen || !funcionarioData) {
        return null;
    }

    const { nome, email, tipoUsuario } = funcionarioData;

    return (
        <div id="modalEditar" className="modal" style={{ display: 'flex' }}>
            <div className="modal-content">
                <div id="div_para_titulo">
                    <span className="close" onClick={closeModalEditar}>
                        <img src={FecharIcone} alt="Fechar" />
                    </span>
                    <h2>Editar Funcionário</h2>
                </div>
                <div className="modal-column">
                    <div className="form-group">
                        <label>Nome</label>
                        <input type="text" defaultValue={nome || ''} />
                    </div>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input type="email" defaultValue={email || ''} />
                    </div>
                </div>
                <div className="modal-column">
                    <div className="form-group">
                        <label>Tipo de Usuário</label>
                        <select defaultValue={tipoUsuario || 'Usuário'}>
                            <option>Administrador</option>
                            <option>Usuário</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <input type="password" placeholder="Mantenha vazio para não alterar" />
                    </div>
                </div>
                <div id="div_para_botao">
                    <button type="submit" className="modal-add-btn" onClick={handleSalvar}>
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}


export default ModalEditarFuncionario;