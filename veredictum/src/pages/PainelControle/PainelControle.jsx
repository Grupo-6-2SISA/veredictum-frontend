import React, { useState } from 'react';

import "./PainelControle.css";

import ModalCriarFuncionario from '../../components/Modals/ModalCriarFunc';
import ModalEditarFuncionario from '../../components/Modals/ModalEditarFuncionario';
import ModalConfirmarDesativacao from '../../components/Modals/ModalDesativarFunc';
import ModalEditarRotina from '../../components/Modals/ModalEditarRotina';
import ModalVerMaisRotina from '../../components/Modals/ModalVerMaisRotina';
import ModalConfirmarRotina from '../../components/Modals/ModalDesativarRotina';

import Sidebar from '../../components/Sidebar/Sidebar';
import EquipeImg from '../../assets/img/equipe.png';
import SinalMais from '../../assets/svg/Add_Plus_Square.svg';
import IconCarrier from '../../assets/svg/SVGRepo_iconCarrier.svg';
import EditIcon from '../../assets/svg/edit.svg';
import FecharIcone from '../../assets/svg/fechar.svg';
import CloseBlackIcon from '../../assets/svg/close_black.svg';


const funcionariosMock = [
    { id: 100, nome: 'Lismara Ribeiro', email: 'lismara@ex.com', ativo: true, tipoUsuario: 'Administrador' },
    { id: 101, nome: 'Orlando Matos', email: 'orlando@ex.com', ativo: false, tipoUsuario: 'Usuário' },
];

const rotinasMock = [
    { id: 201, nome: 'Aniversário', executado: 'Sim', arquivo: 'Aniversario.py', horaInicio: '10:00', dataInicio: '2025-11-09', dataFim: '2025-11-10', status: 'Ativo', ativo: true },
];


export default function PainelControle() {

    const [funcionarios, setFuncionarios] = useState(funcionariosMock);
    const [rotinas, setRotinas] = useState(rotinasMock);

    const [isModalCriarOpen, setIsModalCriarOpen] = useState(false);
    const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
    const [funcionarioEditando, setFuncionarioEditando] = useState(null);
    const [isModalConfirmarOpen, setIsModalConfirmarOpen] = useState(false);
    const [funcionarioConfirmar, setFuncionarioConfirmar] = useState(null);

    const [isModalEditarRotinaOpen, setIsModalEditarRotinaOpen] = useState(false);
    const [rotinaEditando, setRotinaEditando] = useState(null);
    const [isModalVerMaisRotinaOpen, setIsModalVerMaisRotinaOpen] = useState(false);
    const [rotinaVerMais, setRotinaVerMais] = useState(null);
    const [isModalConfirmarRotinaOpen, setIsModalConfirmarRotinaOpen] = useState(false);
    const [rotinaConfirmar, setRotinaConfirmar] = useState(null);

    const openModalCriar = () => setIsModalCriarOpen(true);
    const closeModalCriar = () => setIsModalCriarOpen(false);
    const handleCadastroFuncionario = () => {
        console.log("Cadastrando funcionário...");
        closeModalCriar();
    };

    const closeModalEditar = () => {
        setIsModalEditarOpen(false);
        setFuncionarioEditando(null);
    };

    const openModalEditar = (id) => {
        const func = funcionarios.find(f => f.id === id);
        if (func) {
            setFuncionarioEditando(func);
            setIsModalEditarOpen(true);
        }
    };

    const handleSalvarEdicao = () => {
        console.log("Salvando edição do funcionário:", funcionarioEditando.id);
        closeModalEditar();
    };

    const closeModalConfirmar = () => {
        setIsModalConfirmarOpen(false);
        setFuncionarioConfirmar(null);
    };

    const confirmarDesativacao = () => {
        if (!funcionarioConfirmar) return;
        setFuncionarios(prevFuncionarios =>
            prevFuncionarios.map(func =>
                func.id === funcionarioConfirmar.id ? { ...func, ativo: false } : func
            )
        );
        console.log(`Funcionário ${funcionarioConfirmar.nome} desativado.`);
        closeModalConfirmar();
    };

    const alternarStatusFuncionario = (id) => {
        const func = funcionarios.find(f => f.id === id);
        if (func.ativo) {
            setFuncionarioConfirmar(func);
            setIsModalConfirmarOpen(true);
        } else {
            setFuncionarios(prevFuncionarios =>
                prevFuncionarios.map(f =>
                    f.id === id ? { ...f, ativo: true } : f
                )
            );
        }
    };

    const closeModalEditarRotina = () => {
        setIsModalEditarRotinaOpen(false);
        setRotinaEditando(null);
    };

    const openModalEditarRotina = (id) => {
        const rotina = rotinas.find(r => r.id === id);
        if (rotina) {
            setRotinaEditando(rotina);
            setIsModalEditarRotinaOpen(true);
        }
    };

    const handleSalvarEdicaoRotina = () => {
        console.log("Salvando edição da rotina:", rotinaEditando.id);
        closeModalEditarRotina();
    };

    const closeModalVerMaisRotina = () => {
        setIsModalVerMaisRotinaOpen(false);
        setRotinaVerMais(null);
    };

    const openModalVerMaisRotina = (id) => {
        const rotina = rotinas.find(r => r.id === id);
        if (rotina) {
            setRotinaVerMais(rotina);
            setIsModalVerMaisRotinaOpen(true);
        }
    };

    const closeModalConfirmarRotina = () => {
        setIsModalConfirmarRotinaOpen(false);
        setRotinaConfirmar(null);
    };

    const confirmarDesativacaoRotina = () => {
        if (!rotinaConfirmar) return;
        setRotinas(prevRotinas =>
            prevRotinas.map(rot =>
                rot.id === rotinaConfirmar.id ? { ...rot, ativo: false, status: 'Inativo' } : rot
            )
        );
        console.log(`Rotina ${rotinaConfirmar.nome} desativada.`);
        closeModalConfirmarRotina();
    };

    const alternarStatusRotina = (id) => {
        const rotina = rotinas.find(r => r.id === id);
        if (rotina.ativo) {
            setRotinaConfirmar(rotina);
            setIsModalConfirmarRotinaOpen(true);
        } else {
            setRotinas(prevRotinas =>
                prevRotinas.map(rot =>
                    rot.id === id ? { ...rot, ativo: true, status: 'Ativo' } : rot
                )
            );
        }
    };


    return (
        <div className="container">
            <Sidebar />

            <main className="main-content">
                <h1 className="page-title" style={{ transform: "translateY(-10px)" }}>Painel de Controle</h1>

                <div className="panels-container">

                    {/* Painel de Equipes e Funcionários */}
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title">
                                <div className="panel-icon">
                                    <img src={EquipeImg} alt="User Icon" />
                                </div>
                                <span style={{ fontWeight: "bold", fontSize: "27px", color: "black", paddingLeft: "10px" }}>
                                    Equipes e Funcionários
                                </span>
                            </div>

                            <div className="panel-actions">
                                <button className="action-btn" onClick={openModalCriar}>
                                    <img src={SinalMais} alt="Adicionar Funcionário" />
                                </button>
                            </div>
                        </div>

                        <div className="panel-content scrollable-panel-content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Editar</th>
                                        <th>Acesso</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {funcionarios.map(func => (
                                        <tr key={func.id} style={{ backgroundColor: '#f6f6f6' }} className="pill-row">
                                            <td>{func.id}</td>
                                            <td>{func.nome}</td>
                                            <td>
                                                <button style={{ transform: "translateX(70%)" }}
                                                    className="edit-btn" onClick={() => openModalEditar(func.id)}>
                                                    <img src={EditIcon} alt="Editar" />
                                                </button>
                                            </td>
                                            <td>
                                                <div style={{ transform: "translateX(20px)" }}
                                                    className={`toggle-switch ${func.ativo ? 'active' : ''}`}
                                                    onClick={() => alternarStatusFuncionario(func.id)}
                                                ></div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Gestão de Rotinas Painel */}
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title">
                                <div className="panel-icon">
                                    <img src={IconCarrier} alt="" />
                                </div>
                                <span style={{ fontWeight: "bold", fontSize: "27px", color: "black", paddingLeft: "7px" }}>
                                    Gestão de Rotinas
                                </span>
                            </div>
                        </div>

                        <div className="panel-content">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Nome de Rotina</th>
                                        <th>Executado</th>
                                        <th>Ver Mais</th>
                                        <th>Editar</th>
                                        <th>Acesso</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rotinas.map(rotina => (
                                        <tr key={rotina.id} style={{ backgroundColor: '#f6f6f6' }} className="pill-row">
                                            <td>{rotina.nome}</td>
                                            <td>{rotina.executado}</td>
                                            <td>
                                                <a href="#" className="link" onClick={(e) => { e.preventDefault(); openModalVerMaisRotina(rotina.id); }}>Ver Mais</a>
                                            </td>
                                            <td>
                                                <button style={{ transform: "translateX(20%)" }}
                                                 className="edit-btn" onClick={() => openModalEditarRotina(rotina.id)}>
                                                    <img src={EditIcon} alt="Editar" />
                                                </button>
                                            </td>
                                            <td>
                                                <div style={{ transform: "translateX(10px)" }}
                                                    className={`toggle-switch ${rotina.ativo ? 'active' : ''}`}
                                                    onClick={() => alternarStatusRotina(rotina.id)}
                                                ></div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* MODALS GERAIS */}

                <ModalCriarFuncionario
                    isModalOpen={isModalCriarOpen}
                    closeModalCriar={closeModalCriar}
                    handleCadastro={handleCadastroFuncionario}
                    FecharIcone={FecharIcone}
                />

                <ModalEditarFuncionario
                    isModalOpen={isModalEditarOpen}
                    closeModalEditar={closeModalEditar}
                    handleSalvar={handleSalvarEdicao}
                    funcionarioData={funcionarioEditando}
                    FecharIcone={FecharIcone}
                />

                <ModalConfirmarDesativacao
                    isModalOpen={isModalConfirmarOpen}
                    closeModalConfirmar={closeModalConfirmar}
                    confirmarDesativacao={confirmarDesativacao}
                    funcionarioData={funcionarioConfirmar}
                    CloseBlackIcon={CloseBlackIcon}
                />

                <ModalEditarRotina
                    isModalOpen={isModalEditarRotinaOpen}
                    closeModalEditarRotina={closeModalEditarRotina}
                    handleSalvar={handleSalvarEdicaoRotina}
                    rotinaData={rotinaEditando}
                    FecharIcone={FecharIcone}
                />

                <ModalVerMaisRotina
                    isModalOpen={isModalVerMaisRotinaOpen}
                    closeModalVerMaisRotina={closeModalVerMaisRotina}
                    rotinaData={rotinaVerMais}
                    FecharIcone={FecharIcone}
                />

                <ModalConfirmarRotina
                    isModalOpen={isModalConfirmarRotinaOpen}
                    closeModalConfirmarRotina={closeModalConfirmarRotina}
                    confirmarDesativacaoRotina={confirmarDesativacaoRotina}
                    rotinaData={rotinaConfirmar}
                    CloseBlackIcon={CloseBlackIcon}
                />
            </main>
        </div>
    );
}
