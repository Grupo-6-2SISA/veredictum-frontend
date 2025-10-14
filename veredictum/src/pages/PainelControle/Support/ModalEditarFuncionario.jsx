import React, { useState, useEffect } from "react";
import { atualizarFuncionario } from "../Painel";

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

    const [mostrarSenha, setMostrarSenha] = useState(false); 

    // Preenche o modal com os dados do funcionário ao abrir
    useEffect(() => {
        if (funcionarioData) {
            console.log("Dados recebidos no modal:", funcionarioData);
            setFormData({
                idUsuario: funcionarioData.id || null,
                nome: funcionarioData.nome || "",
                email: funcionarioData.email || "",
                senha: funcionarioData.senha || "", // 👈 senha atual pré-carregada
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

    // Validação dos campos
    const validarCampos = () => {
        const { nome, email, senha } = formData;

        const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
        if (!nomeRegex.test(nome.trim())) {
            alert("❌ O nome deve conter apenas letras e espaços.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            alert("❌ E-mail inválido. Use o formato: exemplo@dominio.com");
            return false;
        }

        if (senha.trim() !== "" && senha.length < 6) {
            alert("❌ A senha deve ter pelo menos 6 caracteres.");
            return false;
        }

        return true;
    };

    const handleSalvar = async () => {
        try {
            if (!formData.idUsuario) {
                alert("ID do usuário inválido!");
                return;
            }

            if (!validarCampos()) return;

            const funcionarioAtualizado = {
                idUsuario: formData.idUsuario,
                nome: formData.nome.trim(),
                email: formData.email.trim(),
                isAtivo: formData.isAtivo ?? true,
                fkAdm: formData.fkAdm,
                isAdm: formData.tipoUsuario === "Administrador",
            };

            if (formData.senha.trim() !== "") {
                funcionarioAtualizado.senha = formData.senha;
            }

            console.log("Enviando para backend:", funcionarioAtualizado);

            const response = await atualizarFuncionario(formData.idUsuario, funcionarioAtualizado);
            console.log("Resposta do backend:", response.data);

            alert("✅ Funcionário atualizado com sucesso!");
            atualizarLista?.();
            closeModalEditar();
            window.location.reload();

        } catch (error) {
            console.error("❌ Erro ao atualizar funcionário:", error);
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

                    <div className="form-group senha-container">
                        <label>Senha</label>
                        <div className="senha-wrapper">
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                name="senha"
                                placeholder="Mantenha vazio para não alterar"
                                value={formData.senha}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="toggle-senha"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                            >
                                {mostrarSenha ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#333" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#333" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M17.94 17.94A10.93 10.93 0 0 1 12 20c-7 0-11-8-11-8a18.4 18.4 0 0 1 5.06-6.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.45 18.45 0 0 1-3.26 4.74M1 1l22 22" />
                                    </svg>
                                )}
                            </button>
                        </div>
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
