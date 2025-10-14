import React, { useState } from "react";
import { criarFuncionario } from "../Painel";

function ModalCriarFuncionario({ isModalOpen, closeModalCriar, atualizarLista, FecharIcone }) {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        tipoUsuario: "Usuário",
    });

    const [mostrarSenha, setMostrarSenha] = useState(false); 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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

        if (senha.length < 6) {
            alert("❌ A senha deve ter pelo menos 6 caracteres.");
            return false;
        }

        return true;
    };

    const handleCadastro = async () => {
        if (!validarCampos()) return;

        try {
            const novoFuncionario = {
                nome: formData.nome.trim(),
                email: formData.email.trim(),
                senha: formData.senha,
                isAdm: formData.tipoUsuario === "Administrador",
                isAtivo: true,
                fkAdm: 1,
            };

            await criarFuncionario(novoFuncionario);
            alert("✅ Funcionário cadastrado com sucesso!");

            atualizarLista();
            closeModalCriar();
            window.location.reload();

            setFormData({ nome: "", email: "", senha: "", tipoUsuario: "Usuário" });
        } catch (error) {
            console.error("Erro ao cadastrar funcionário:", error);
            alert("❌ Falha ao cadastrar funcionário. Verifique os dados.");
            window.location.reload();
        }
    };

    if (!isModalOpen) return null;

    return (
        <div id="modalCriar" className="modal" style={{ display: "flex" }}>
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
                                placeholder="Digite a senha"
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
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#333" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M17.94 17.94A10.93 10.93 0 0 1 12 20c-7 0-11-8-11-8a18.4 18.4 0 0 1 5.06-6.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.45 18.45 0 0 1-3.26 4.74M1 1l22 22"/>
                                    </svg>
                                )}
                            </button>
                        </div>
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
