import React from "react";

function ModalVerMaisFunc({ isModalOpen, closeModalVerMaisFunc, funcionarioData, FecharIcone }) {
    if (!isModalOpen || !funcionarioData) return null;

    const { idUsuario, nome, email, isAdm, isAtivo, fkAdm } = funcionarioData;

    return (
        <div id="modalVerMaisFuncionario" className="modal_Painel_Controle" style={{ display: 'flex' }}>
            <div className="modal-content_Painel">

                <div id="div_para_titulo">
                    <span className="close" onClick={closeModalVerMaisFunc}>
                        <img src={FecharIcone} alt="Fechar" />
                    </span>
                    <h2>Informações do Funcionário</h2>
                </div>

                <div className="modal-column">

                    <div className="form-group">
                        <label>Nome</label>
                        <input type="text" readOnly defaultValue={nome || ""} />
                    </div>

                    <div className="form-group">
                        <label>E-mail</label>
                        <input type="text" readOnly defaultValue={email || ""} />
                    </div>

                </div>

                {/* COLUNA 2 */}
                <div className="modal-column">

                    <div className="form-group">
                        <label>Tipo de Usuário</label>
                        <select disabled defaultValue={isAdm ? "Administrador" : "Usuário"}>
                            <option>Administrador</option>
                            <option>Usuário</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select disabled defaultValue={isAtivo ? "Ativo" : "Inativo"}>
                            <option>Ativo</option>
                            <option>Inativo</option>
                        </select>
                    </div>

                    <div className="form-group"></div>
                </div>

            </div>
        </div>
    );
}

export default ModalVerMaisFunc;
