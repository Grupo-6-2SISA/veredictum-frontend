import React from "react";
import { desativarFuncionario } from "../Painel";

function ModalConfirmarDesativacao({
  isModalOpen,
  closeModalConfirmar,
  funcionarioData,
  CloseBlackIcon,
  atualizarLista,
  showAlert
}) {
  if (!isModalOpen || !funcionarioData) return null;

  const handleConfirmar = async () => {
    try {

      const idParaDesativar = funcionarioData.idUsuario ?? funcionarioData.id;
      if (!idParaDesativar) {
        // alert("ID do funcionário inválido!");
        showAlert?.("ID do funcionário inválido!", "error", 3500);
        return;
      }

      await desativarFuncionario(idParaDesativar);
      // alert("✅ Funcionário desativado com sucesso!");
      showAlert?.("Funcionário desativado com sucesso!", "success", 2200);
      closeModalConfirmar();
      atualizarLista?.();
      window.location.reload();
    } catch (error) {
      console.error("Erro ao desativar funcionário:", error);
      // alert("Falha ao desativar funcionário. Tente novamente.");
      showAlert?.("Falha ao desativar funcionário. Tente novamente.", "error", 3500);
    }
  };

  return (
    <div id="modalConfirmar" className="modal-delete-rotinas" style={{ display: "flex" }}>
      <div className="modal-content-rotinas">
        <div className="modal-header" style={{ backgroundColor: '#edeaef', borderBottom: 'none' }}>
          <h2>Desativar Funcionário</h2>
          <button className="modal-close-delete-btn" onClick={closeModalConfirmar}>
            <img src={CloseBlackIcon} alt="Fechar" />
          </button>
        </div>
        <div className="modal-body_Func">
          <p>
            Deseja desativar{" "}
            <span className="client-name" style={{ fontWeight: "bold" }}>
              {funcionarioData.nome}
            </span>
            ?
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel-delete" onClick={closeModalConfirmar}>
            Não
          </button>
          <button className="btn-confirm-delete" onClick={handleConfirmar}>
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmarDesativacao;
