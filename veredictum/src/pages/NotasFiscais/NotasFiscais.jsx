import React, { useState } from 'react';
import './NotasFiscais.css';
import '../../index.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';

const NotasFiscais = () => {
  // Estado para controlar os modais
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNota, setEditingNota] = useState(null);
  
  // Dados de exemplo para notas fiscais
  const notasFiscaisData = [
    { 
      numero: 'NF-001', 
      etiqueta: 'Vendas', 
      dataVencimento: '15/10/2025', 
      emitida: true,
      cliente: 'João Silva',
      valor: 'R$ 2.500,00',
      urlCloud: 'https://cloud.exemplo.com/nf001'
    },
    { 
      numero: 'NF-002', 
      etiqueta: 'Serviços', 
      dataVencimento: '20/10/2025', 
      emitida: false,
      cliente: 'Maria Santos',
      valor: 'R$ 1.800,00',
      urlCloud: 'https://cloud.exemplo.com/nf002'
    },
    { 
      numero: 'NF-003', 
      etiqueta: 'Consultoria', 
      dataVencimento: '25/10/2025', 
      emitida: true,
      cliente: 'Pedro Costa',
      valor: 'R$ 3.200,00',
      urlCloud: 'https://cloud.exemplo.com/nf003'
    },
    { 
      numero: 'NF-004', 
      etiqueta: 'Produtos', 
      dataVencimento: '30/10/2025', 
      emitida: false,
      cliente: 'Ana Oliveira',
      valor: 'R$ 950,00',
      urlCloud: 'https://cloud.exemplo.com/nf004'
    },
    { 
      numero: 'NF-005', 
      etiqueta: 'Manutenção', 
      dataVencimento: '05/11/2025', 
      emitida: true,
      cliente: 'Carlos Ferreira',
      valor: 'R$ 4.100,00',
      urlCloud: 'https://cloud.exemplo.com/nf005'
    },
  ];

  // Definição das colunas para a listagem com todos os campos
  const colunas = [
    { key: 'numero', titulo: 'Número da Nota' },
    { key: 'etiqueta', titulo: 'Etiqueta' },
    { key: 'dataVencimento', titulo: 'Data de Vencimento' },
    { key: 'emitida', titulo: 'Emitida' },
    { key: 'editar', titulo: 'Editar' },
    { key: 'excluir', titulo: 'Excluir' },
    { key: 'informacoes', titulo: 'Informações' }
  ];

  // Funções para controlar os modais
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const openEditModal = (nota) => {
    setEditingNota(nota);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingNota(null);
  };

  // Função para fechar modal clicando fora
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Função para fechar modal de edição clicando fora
  const handleEditOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeEditModal();
    }
  };

  // Função para editar nota fiscal
  const handleEdit = (nota) => {
    openEditModal(nota);
  };

  // Função para excluir nota fiscal
  const handleDelete = (nota) => {
    console.log('Excluir nota:', nota);
    // Aqui você implementaria a lógica de exclusão
  };

  // Função para ver informações da nota fiscal
  const handleViewInfo = (nota) => {
    console.log('Ver informações:', nota);
    // Aqui você implementaria a lógica para ver detalhes
  };

  // Função para salvar nova nota fiscal
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você adicionaria a lógica para salvar
    closeModal();
  };

  // Função para salvar edições da nota fiscal
  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Aqui você adicionaria a lógica para salvar edições
    closeEditModal();
  };

  return (
    <div className="notas-fiscais-container">
      <Sidebar />
      
      <main className="notas-fiscais-content">
        <div className="header-top">
          <div className="head-description">
            <div className="div_topo">
              <h1>Gestão de Notas Fiscais</h1>
            </div>
            <p className="description">
              Organize, atualize e controle todas as suas notas fiscais de forma eficiente.
            </p>
          </div>
          <button className="btn-new-appointment" onClick={openModal}>
            Adicionar Nota Fiscal
            <img src="src/assets/svg/btn.svg" alt="" />
          </button>
        </div>
        
        <div className="nf-management-section">
          <div className="card nf-table-card">
            <div className="card-header">
            </div>
            <div className="card-content">
              <div className="list-header-nf nf-list-header-grid">
                <p className="col-name">Número da Nota</p>
                <p className="col-etiqueta">Etiqueta</p>
                <p className="col-data">Data de Vencimento</p>
                <p className="col-emitida">Emitida</p>
                <p className="col-editar">Editar</p>
                <p className="col-excluir">Excluir</p>
                <p className="col-info">Informações</p>
              </div>
              <div className="list-items-container nf-list-items-container">
                {notasFiscaisData.map((nota, index) => (
                  <div key={index} className="nf-list-item">
                    <p>{nota.numero}</p>
                    <p>{nota.etiqueta}</p>
                    <p>{nota.dataVencimento}</p>
                    <div className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={nota.emitida} 
                        onChange={() => {}} 
                      />
                      <span className="slider"></span>
                    </div>
                    <img 
                      src="src/assets/svg/edit.svg" 
                      alt="Editar" 
                      onClick={() => handleEdit(nota)}
                    />
                    <img 
                      src="src/assets/svg/lixo.svg" 
                      alt="Excluir" 
                      onClick={() => handleDelete(nota)}
                    />
                    <a href="#" onClick={() => handleViewInfo(nota)}>Ver mais</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal para adicionar nota fiscal */}
        {isModalOpen && (
          <div className="modal" onClick={handleOverlayClick}>
            <div className="modal-content">
              <div className="modal-header">
                <h2>Adicionar Nota Fiscal</h2>
                <button className="modal-close-btn" onClick={closeModal} type="button" title="Fechar">
                  <img src="src/assets/svg/close.svg" alt="Fechar" />
                </button>
              </div>
              <form className="appointment-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-column">
                    <div className="form-group-notas">
                      <label htmlFor="numeroNota">Número da Nota</label>
                      <input type="text" id="numeroNota" name="numeroNota" required />
                    </div>
                    <div className="form-group-notas">
                      <label htmlFor="dataVencimento">Data de Vencimento</label>
                      <input type="date" id="dataVencimento" name="dataVencimento" required />
                    </div>
                    <div className="form-group-notas">
                      <label htmlFor="emitida">Emitida</label>
                      <select id="emitida" name="emitida" required>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                      </select>
                    </div>
                    <div className="form-group-notas">
                      <label htmlFor="cliente">Cliente</label>
                      <input type="text" id="cliente" name="cliente" required />
                    </div>
                  </div>
                  <div className="form-column">
                    <div className="form-group-notas">
                      <label htmlFor="valor">Valor</label>
                      <input type="text" id="valor" name="valor" required />
                    </div>
                    <div className="form-group-notas">
                      <label htmlFor="etiqueta">Etiqueta</label>
                      <input type="text" id="etiqueta" name="etiqueta" />
                    </div>
                    <div className="form-group-notas">
                      <label htmlFor="urlCloud">URL Cloud</label>
                      <input type="text" id="urlCloud" name="urlCloud" />
                    </div>
                  </div>
                </div>
                <div className="form-footer-notas">
                  <button type="submit" className="btn-new-appointment">Salvar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal para editar nota fiscal */}
        {isEditModalOpen && editingNota && (
          <div className="modal" onClick={handleEditOverlayClick}>
            <div className="modal-content">
              <div className="modal-header">
                <h2>Editar Nota Fiscal</h2>
                <button className="modal-close-btn" onClick={closeEditModal} type="button" title="Fechar">
                  <img src="src/assets/svg/close.svg" alt="Fechar" />
                </button>
              </div>
              <form className="appointment-form" onSubmit={handleEditSubmit}>
                <div className="form-row">
                  <div className="form-column">
                    <div className="form-group-notas">
                      <label htmlFor="numeroNotaEdit">Número da Nota</label>
                      <input 
                        type="text" 
                        id="numeroNotaEdit" 
                        name="numeroNota" 
                        defaultValue={editingNota.numero}
                        required 
                      />
                    </div>
                    <div className="form-group-notas">
                      <label htmlFor="dataVencimentoEdit">Data de Vencimento</label>
                      <input 
                        type="date" 
                        id="dataVencimentoEdit" 
                        name="dataVencimento" 
                        defaultValue={editingNota.dataVencimento?.split('/').reverse().join('-')}
                        required 
                      />
                    </div>
                    <div className="form-group-notas">
                      <label htmlFor="emitidaEdit">Emitida</label>
                      <select 
                        id="emitidaEdit" 
                        name="emitida" 
                        defaultValue={editingNota.emitida ? 'true' : 'false'}
                        required
                      >
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                      </select>
                    </div>
                    <div className="form-group-notas">
                      <label htmlFor="clienteEdit">Cliente</label>
                      <input 
                        type="text" 
                        id="clienteEdit" 
                        name="cliente" 
                        defaultValue={editingNota.cliente}
                        required 
                      />
                    </div>
                  </div>
                  <div className="form-column">
                    <div className="form-group-notas">
                      <label htmlFor="valorEdit">Valor</label>
                      <input 
                        type="text" 
                        id="valorEdit" 
                        name="valor" 
                        defaultValue={editingNota.valor}
                        required 
                      />
                    </div>
                    <div className="form-group-notas">
                      <label htmlFor="etiquetaEdit">Etiqueta</label>
                      <input 
                        type="text" 
                        id="etiquetaEdit" 
                        name="etiqueta" 
                        defaultValue={editingNota.etiqueta}
                      />
                    </div>
                    <div className="form-group-notas">
                      <label htmlFor="urlCloudEdit">URL Cloud</label>
                      <input 
                        type="text" 
                        id="urlCloudEdit" 
                        name="urlCloud" 
                        defaultValue={editingNota.urlCloud}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-footer-notas">
                  <button type="submit" className="btn-new-appointment">Salvar Alterações</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default NotasFiscais;
