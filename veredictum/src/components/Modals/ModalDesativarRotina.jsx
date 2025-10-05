
function ModalConfirmarRotina({ isModalOpen, closeModalConfirmarRotina, confirmarDesativacaoRotina, rotinaData, CloseBlackIcon }) {
    if (!isModalOpen || !rotinaData) return null;

    return (
        // Usando as classes de estilo do seu HTML
        <div id="modal-delete-rotina" className="modal-delete" style={{ display: 'flex' }}>
            {/* O backdrop precisaria de um elemento separado ou ser tratado pelo CSS */}
            {/* <div class="modal-backdrop-delete"></div> */}
            <div className="modal-content-rotinas">
                <div className="modal-header">
                    <h2>Desativar Rotina</h2>
                    <button className="modal-close-delete-btn" onClick={closeModalConfirmarRotina}>
                        <img src={CloseBlackIcon} alt="Fechar" />
                    </button>
                </div>
                <div className="modal-body">
                    <p>Deseja desativar <span className="rotina-name" style={{ fontWeight: 'bold' }}>{rotinaData.nome}</span>?</p>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel-delete" onClick={closeModalConfirmarRotina}>Não</button>
                    <button className="btn-confirm-delete" onClick={confirmarDesativacaoRotina}>Sim</button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmarRotina;