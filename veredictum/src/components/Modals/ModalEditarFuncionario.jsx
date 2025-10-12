import React, { useState, useEffect } from "react";
import { atualizarFuncionario } from "../../pages/PainelControle/Painel";

function ModalEditarFuncionario({
    isModalOpen,
    closeModalEditar,
    atualizarLista,
    funcionarioData,
    FecharIcone,
}) {
    const [formData, setFormData] = useState({
        idUsuario: null,
        nome: "",
        email: "",
        senha: "",
        tipoUsuario: "Usuário",
        fkAdm: null,
        isAtivo: true,
    });

    // Preenche o modal com os dados do funcionário ao abrir
    useEffect(() => {
        if (funcionarioData) {
            console.log("🟣 Dados recebidos no modal:", funcionarioData);
            setFormData({
                idUsuario: funcionarioData.id || null, // <-- aqui
                nome: funcionarioData.nome || "",
                email: funcionarioData.email || "",
                senha: "",
                tipoUsuario: funcionarioData.isAdm ? "Administrador" : "Usuário",
                fkAdm: funcionarioData.fkAdm || 1,
                isAtivo: funcionarioData.isAtivo ?? true,
            });
        }
    }, [funcionarioData]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSalvar = async () => {
        try {
            if (!formData.idUsuario) {
                alert("ID do usuário inválido!");
                return;
            }

            const funcionarioAtualizado = {
                idUsuario: formData.idUsuario,
                nome: formData.nome.trim(),
                email: formData.email.trim(),
                isAtivo: formData.ativo ?? true,
                fkAdm: formData.fkAdm,
                isAdm: formData.tipoUsuario === "Administrador",
            };

            if (formData.senha.trim() !== "") {
                funcionarioAtualizado.senha = formData.senha;
            }

            console.log("Enviando para backend:", funcionarioAtualizado);

            const response = await atualizarFuncionario(formData.idUsuario, funcionarioAtualizado);
            console.log("Resposta do backend:", response.data);

            alert("Funcionário atualizado com sucesso!");
            atualizarLista?.();
            closeModalEditar();
            window.location.reload();

        } catch (error) {
            console.error("Erro ao atualizar funcionário:", error);
            alert("Falha ao atualizar funcionário. Verifique os dados e tente novamente.");
        }
    };

    if (!isModalOpen || !funcionarioData) return null;

    return (
        <div id="modalEditar" className="modal" style={{ display: "flex" }}>
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
                        <input
                            type="text"
                            name="nome"
                            placeholder="Digite o nome"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Digite o e-mail"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="modal-column">
                    <div className="form-group">
                        <label>Tipo de Usuário</label>
                        <select
                            name="tipoUsuario"
                            value={formData.tipoUsuario}
                            onChange={handleChange}
                        >
                            <option>Administrador</option>
                            <option>Usuário</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            name="senha"
                            placeholder="Mantenha vazio para não alterar"
                            value={formData.senha}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div id="div_para_botao">
                    <button className="modal-add-btn" onClick={handleSalvar}>
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalEditarFuncionario;
