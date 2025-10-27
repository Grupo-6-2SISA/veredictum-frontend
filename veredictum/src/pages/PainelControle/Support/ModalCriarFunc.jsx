import React, { useState } from "react";
import { criarFuncionario } from "../Painel";

import OlhoAberto from '../../../assets/img/olho-aberto.png';
import OlhoFechado from '../../../assets/img/olho-vermelho.png';

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
        <div id="modalCriar" className="modal_Painel_Controle" style={{ display: "flex" }}>
            <div className="modal-content_Painel">
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
                                <img
                                    src={mostrarSenha ? OlhoAberto : OlhoFechado}
                                    alt={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        cursor: "pointer",
                                    }}
                                />
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
