import React, { useState, useEffect } from 'react';

import "./PainelControle.css";
import '../../index.css';


import { listarFuncionarios, ListarRotinas, ativarFuncionario, ativarRotina } from './Painel';

// Funcionários
import ModalCriarFuncionario from './Support/ModalCriarFunc';
import ModalConfirmarDesativacao from './Support/ModalDesativarFunc';
import ModalEditarFuncionario from './Support/ModalEditarFuncionario';

// Rotina
import ModalConfirmarRotina from '../PainelControle/Support/ModalDesativarRotina';
import ModalEditarRotina from '../PainelControle/Support/ModalEditarRotina';
import ModalVerMaisRotina from '../PainelControle/Support/ModalVerMaisRotina';

import Sidebar from '../../components/Sidebar/Sidebar';
import Listagem from '../../components/Listagem/Listagem'
import EquipeImg from '../../assets/img/equipe.png';
import SinalMais from '../../assets/svg/Add_Plus_Square.svg';
import IconCarrier from '../../assets/svg/SVGRepo_iconCarrier.svg';
import EditIcon from '../../assets/svg/edit.svg';
import FecharIcone from '../../assets/svg/fechar.svg';
import CloseBlackIcon from '../../assets/svg/close_black.svg';

// Mock para fallback
const funcionariosMock = [
  { id: 100, nome: 'Lismara Ribeiro', email: 'lismara@ex.com', ativo: true, tipoUsuario: 'Administrador' },
  { id: 101, nome: 'Orlando Matos', email: 'orlando@ex.com', ativo: false, tipoUsuario: 'Usuário' },
];

const rotinasMock = [
  { id: 201, nome: 'Aniversário', executado: 'Sim', arquivo: 'Aniversario.py', horaInicio: '10:00', dataInicio: '2025-11-09', dataFim: '2025-11-10', status: 'Ativo', ativo: true },
];

export default function PainelControle() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [rotinas, setRotinas] = useState(rotinasMock);

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

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

  // --- FETCH FUNCIONÁRIOS ---
  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const idAdm = 1;
        const response = await listarFuncionarios(idAdm);

        if (response && response.data) {
          const funcionariosFormatados = response.data.map((u) => ({
            id: u.idUsuario,
            nome: u.nome,
            email: u.email,
            ativo: u.isAtivo === true || u.isAtivo === 1,
            tipoUsuario: u.isAdm === true || u.isAdm === 1 ? 'Administrador' : 'Usuário',
            fkAdm: u.fkAdm,
          }));

          setFuncionarios(funcionariosFormatados);
        } else {
          setErro("Nenhum funcionário encontrado.");
          setFuncionarios(funcionariosMock);
        }
      } catch (error) {
        console.error("❌ Erro ao carregar funcionários:", error);
        setErro("Erro ao conectar ao servidor. Usando dados simulados.");
        setFuncionarios(funcionariosMock);
      } finally {
        setLoading(false);
      }
    };

    fetchFuncionarios();
  }, []);

  // --- FETCH ROTINAS ---
  useEffect(() => {
    const fetchRotinas = async () => {
      try {
        const response = await ListarRotinas();
        if (response && response.data) {
          const rotinasFormatadas = response.data.map(r => ({
            id: r.idRotina,
            nome: r.nomeRotina,
            executado: r.dataHoraUltimaExecucao ? 'Sim' : 'Não',
            arquivo: r.rotinaChamada,
            horaInicio: r.horaInicio,
            dataInicio: r.dataInicio,
            dataFim: r.dataFim,
            status: r.isAtivo ? 'Ativo' : 'Inativo',
            ativo: r.isAtivo,
          }));

          setRotinas(rotinasFormatadas);
        } else {
          setRotinas(rotinasMock);
        }
      } catch (error) {
        console.error("❌ Erro ao carregar rotinas:", error);
        setRotinas(rotinasMock);
      }
    };

    fetchRotinas();
  }, []);

  // --- FUNÇÕES DE MODAIS E EDIÇÃO ---
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
    console.log("Salvando edição do funcionário:", funcionarioEditando?.id);
    closeModalEditar();
  };

  const closeModalConfirmar = () => {
    setIsModalConfirmarOpen(false);
    setFuncionarioConfirmar(null);
  };

  const confirmarDesativacao = () => {
    if (!funcionarioConfirmar) return;
    setFuncionarios(prev =>
      prev.map(f => f.id === funcionarioConfirmar.id ? { ...f, ativo: false } : f)
    );
    console.log(`Funcionário ${funcionarioConfirmar.nome} desativado.`);
    closeModalConfirmar();
  };

  const alternarStatusFuncionario = async (id) => {
    const func = funcionarios.find(f => f.id === id);
    if (!func) return;

    if (func.ativo) {
      setFuncionarioConfirmar(func);
      setIsModalConfirmarOpen(true);
    } else {
      try {
        await ativarFuncionario(id);
        setFuncionarios(prev =>
          prev.map(f => f.id === id ? { ...f, ativo: true } : f)
        );
        console.log(`Funcionário ${func.nome} ativado.`);
      } catch (error) {
        console.error(`❌ Erro ao ativar funcionário ${func.nome}:`, error);
      }
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
    console.log("Salvando edição da rotina:", rotinaEditando?.id);
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
    setRotinas(prev =>
      prev.map(r => r.id === rotinaConfirmar.id ? { ...r, ativo: false, status: 'Inativo' } : r)
    );
    console.log(`Rotina ${rotinaConfirmar.nome} desativada.`);
    closeModalConfirmarRotina();
  };

  const alternarStatusRotina = async (id) => {
    const rotina = rotinas.find(r => r.id === id);
    if (!rotina) return;

    if (rotina.ativo) {
      setRotinaConfirmar(rotina);
      setIsModalConfirmarRotinaOpen(true);
    } else {
      try {
        await ativarRotina(id);

        setRotinas(prev =>
          prev.map(r => r.id === id ? { ...r, ativo: true, status: 'Ativo' } : r)
        );

        console.log(`Rotina ${rotina.nome} ativada.`);
      } catch (error) {
        console.error(`❌ Erro ao ativar rotina ${rotina.nome}:`, error);
      }
    }
  };

  const funcionariosOrdenados = [...funcionarios].sort((a, b) => {
    const diferencaAtivo = b.ativo - a.ativo;
    if (diferencaAtivo !== 0) return diferencaAtivo;
    return a.id - b.id;
  });

  const rotinasOrdenadas = [...rotinas].sort((a, b) => {
    const diferencaAtivo = b.ativo - a.ativo;
    if (diferencaAtivo !== 0) return diferencaAtivo;
    return a.id - b.id;
  });

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

            <div className="panel-content scrollable-funcionarios">
              {loading ? (
                <p>Carregando funcionários...</p>
              ) : erro ? (
                <p style={{ color: 'red' }}>{erro}</p>
              ) : (
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
                    {funcionariosOrdenados.map(func => (
                      <tr style={{ backgroundColor: '#f6f6f6' }} key={func.id} className="pill-row">
                        <td>{func.id}</td>
                        <td>{func.nome}</td>
                        <td>
                          <button style={{ transform: 'translateX(70%)' }}
                            className="edit-btn" onClick={() => openModalEditar(func.id)}>
                            <img src={EditIcon} alt="Editar" />
                          </button>
                        </td>
                        <td>
                          <div style={{ transform: 'translateX(50%)' }} 
                            className={`toggle-switch ${func.ativo ? 'active' : ''}`}
                            onClick={() => alternarStatusFuncionario(func.id)}
                          ></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Painel de Gestão de Rotinas */}
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

            <div className="panel-content scrollable-rotinas">
              <table className="table rotinas-table">
                <thead>
                  <tr>
                    <th>Nome de Rotina</th>
                    <th>Executado</th>
                    <th>Ações</th>
                    <th>Acesso</th>
                    <th>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {rotinasOrdenadas.map(rotina => (
                    <tr key={rotina.id} className="pill-row" style={{ backgroundColor: '#f6f6f6' }}>
                      <td>{rotina.nome}</td>
                      <td>{"Sim"}</td>
                      <td>
                        <a href="#" className="link" onClick={(e) => { e.preventDefault(); openModalVerMaisRotina(rotina.id); }}>
                          Ver Mais
                        </a>
                      </td>
                      <td>
                        <div
                          className={`toggle-switch ${rotina.ativo ? 'active' : ''}`}
                          onClick={() => alternarStatusRotina(rotina.id)}
                        />
                      </td>
                      <td>
                        <button className="edit-btn" onClick={() => openModalEditarRotina(rotina.id)}>
                          <img src={EditIcon} alt="Editar" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* MODAIS */}
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
