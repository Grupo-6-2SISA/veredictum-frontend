import React from 'react';
import { desativarRotina } from "../Painel";


function ModalConfirmarRotina({
    isModalOpen,
    closeModalConfirmarRotina,
    rotinaData,
    onRotinaDesativada,
    CloseBlackIcon
}) {
    if (!isModalOpen || !rotinaData) return null;

    const confirmarDesativacao = async () => {
        try {
            const idParaEnvio = rotinaData.idRotina ?? rotinaData.id;
            await desativarRotina(idParaEnvio);

            console.log(`✅ Rotina ${rotinaData.nome ?? rotinaData.nomeRotina} desativada com sucesso!`);

            onRotinaDesativada && onRotinaDesativada(idParaEnvio);

            closeModalConfirmarRotina();
            window.location.reload();

        } catch (error) {
            console.error("❌ Erro ao desativar rotina:", error);
            alert("Erro ao desativar rotina. Tente novamente.");
        }
    };

    return (
        <div id="modal-delete-rotina" className="modal-delete" style={{ display: 'flex' }}>
            <div className="modal-content-rotinas">
                <div className="modal-header" style={{ backgroundColor: '#edeaef', borderBottom: 'none' }}>
                    <h2>Desativar Rotina</h2>
                    <button className="modal-close-delete-btn" onClick={closeModalConfirmarRotina}>
                        <img src={CloseBlackIcon} alt="Fechar" />
                    </button>
                </div>
                <div className="modal-body">
                    <p>
                        Deseja desativar <span className="rotina-name" style={{ fontWeight: 'bold' }}>
                            {rotinaData.nome ?? rotinaData.nomeRotina}
                        </span>?
                    </p>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel-delete" onClick={closeModalConfirmarRotina}>Não</button>
                    <button className="btn-confirm-delete" onClick={confirmarDesativacao}>Sim</button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmarRotina;
