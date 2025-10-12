import React, { useState } from "react";
import { criarFuncionario } from "../../pages/PainelControle/Painel";

function ModalCriarFuncionario({ isModalOpen, closeModalCriar, atualizarLista, FecharIcone }) {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        tipoUsuario: "Usuário",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCadastro = async () => {
        try {
            const novoFuncionario = {
                nome: formData.nome,
                email: formData.email,
                senha: formData.senha,
                isAdm: formData.tipoUsuario === "Administrador",
                isAtivo: true,
                fkAdm: 1, // id do admin logado (ajuste se tiver login dinâmico)
            };

            await criarFuncionario(novoFuncionario);
            alert("Funcionário cadastrado com sucesso!");

            atualizarLista();
            closeModalCriar();
            window.location.reload();

            setFormData({ nome: "", email: "", senha: "", tipoUsuario: "Usuário" });
        } catch (error) {
            console.error("Erro ao cadastrar funcionário:", error);
            alert("Falha ao cadastrar funcionário. Verifique os dados.");
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
                    <div className="form-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            name="senha"
                            placeholder="Digite a senha"
                            value={formData.senha}
                            onChange={handleChange}
                        />
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
