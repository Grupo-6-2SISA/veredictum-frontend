function ModalConfirmarDesativacao({ isModalOpen, closeModalConfirmar, confirmarDesativacao, funcionarioData, CloseBlackIcon }) {
    if (!isModalOpen || !funcionarioData) {
        return null;
    }

    return (
        // Substituímos o 'hidden' pelo estilo inline para ser controlado pelo React
        <div id="modalConfirmar" className="modal-delete-rotinas" style={{ display: 'flex' }}>
            <div className="modal-content-rotinas">
                <div className="modal-header">
                    <h2>Desativar Funcionário</h2>
                    <button className="modal-close-delete-btn" onClick={closeModalConfirmar}>
                        <img src={CloseBlackIcon} alt="Fechar" />
                    </button>
                </div>
                <div className="modal-body">
                    {/* Exibindo o nome do funcionário para confirmação */}
                    <p>Deseja desativar <span className="client-name" style={{ fontWeight: 'bold' }}>{funcionarioData.nome}</span>?</p>
                </div>
                <div className="modal-footer">
                    {/* Botão Não chama a função de fechar */}
                    <button className="btn-cancel-delete" onClick={closeModalConfirmar}>Não</button>
                    {/* Botão Sim chama a função de desativação final */}
                    <button className="btn-confirm-delete" onClick={confirmarDesativacao}>Sim</button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmarDesativacao;