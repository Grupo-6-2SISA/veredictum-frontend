import React from "react";
import { desativarFuncionario } from "../Painel";

function ModalConfirmarDesativacao({
  isModalOpen,
  closeModalConfirmar,
  funcionarioData,
  CloseBlackIcon,
  atualizarLista
}) {
  if (!isModalOpen || !funcionarioData) return null;

  const handleConfirmar = async () => {
    try {
      // Garante que usamos o idUsuario, igual ao modal de edição
      const idParaDesativar = funcionarioData.idUsuario ?? funcionarioData.id;
      if (!idParaDesativar) {
        alert("ID do funcionário inválido!");
        return;
      }

      await desativarFuncionario(idParaDesativar);
      alert("Funcionário desativado com sucesso!");
      closeModalConfirmar();
      atualizarLista?.();
      window.location.reload(); // reload para atualizar a página
    } catch (error) {
      console.error("Erro ao desativar funcionário:", error);
      alert("Falha ao desativar funcionário. Tente novamente.");
    }
  };

  return (
    <div id="modalConfirmar" className="modal-delete-rotinas" style={{ display: "flex" }}>
      <div className="modal-content-rotinas">
        <div className="modal-header"  style={{backgroundColor: '#edeaef', borderBottom: 'none'}}>
          <h2>Desativar Funcionário</h2>
          <button className="modal-close-delete-btn" onClick={closeModalConfirmar}>
            <img src={CloseBlackIcon} alt="Fechar" />
          </button>
        </div>
        <div className="modal-body">
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
