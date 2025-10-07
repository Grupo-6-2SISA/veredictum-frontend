import React, { useState, useEffect } from 'react';
import './NotasFiscais.css';
import '../../index.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import { 
  getNotasFiscais, 
  createNotaFiscal, 
  updateNotaFiscal, 
  deleteNotaFiscal, 
  toggleEmitidaNotaFiscal 
} from './NotasFiscais';

const NotasFiscais = () => {
  // Estado para controlar os modais
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNota, setEditingNota] = useState(null);
  
  // Estado para dados da API
  const [notasFiscaisData, setNotasFiscaisData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Carregar dados da API ao montar o componente
  useEffect(() => {
    loadNotasFiscais();
  }, []);

  // Função para carregar notas fiscais da API
  const loadNotasFiscais = async () => {
    try {
      setLoading(true);
      const response = await getNotasFiscais();
      console.log('Dados recebidos da API:', response.data);
      setNotasFiscaisData(response.data);
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar notas fiscais:', err);
      setError('Erro ao carregar notas fiscais');
      // Manter dados de exemplo em caso de erro
      setNotasFiscaisData([
        { 
          id_nota_fiscal: 1,
          numero: 'NF-001', 
          etiqueta: 'Vendas', 
          data_vencimento: '15/10/2025', 
          is_emitida: 1, // 1 = verde (emitida)
          fk_cliente: 1,
          valor: 2500.00,
          url_nuvem: 'https://cloud.exemplo.com/nf001',
          descricao: 'Nota fiscal de vendas'
        },
        { 
          id_nota_fiscal: 2,
          numero: 'NF-002', 
          etiqueta: 'Serviços', 
          data_vencimento: '20/10/2025', 
          is_emitida: 0, // 0 = vermelho (não emitida)
          fk_cliente: 2,
          valor: 1800.00,
          url_nuvem: 'https://cloud.exemplo.com/nf002',
          descricao: 'Nota fiscal de serviços'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

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
  const handleDelete = async (nota) => {
    if (window.confirm(`Deseja excluir a nota fiscal ${nota.numero}?`)) {
      try {
        await deleteNotaFiscal(nota.id_nota_fiscal);
        // Atualizar a lista removendo a nota excluída
        setNotasFiscaisData(prev => prev.filter(item => item.id_nota_fiscal !== nota.id_nota_fiscal));
      } catch (err) {
        console.error('Erro ao excluir nota fiscal:', err);
        alert('Erro ao excluir nota fiscal');
      }
    }
  };

  // Função para ver informações da nota fiscal
  const handleViewInfo = (nota) => {
    console.log('Ver informações:', nota);
    // Aqui você implementaria a lógica para ver detalhes
  };

  // Função para salvar nova nota fiscal
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const notaFiscalData = {
      numero: parseInt(formData.get('numeroNota')),
      fkCliente: parseInt(formData.get('cliente')), // ID do cliente como número
      etiqueta: formData.get('etiqueta'),
      valor: parseFloat(formData.get('valor')),
      dataVencimento: formData.get('dataVencimento'), // Formato: YYYY-MM-DD
      descricao: formData.get('descricao') || '',
      urlNuvem: formData.get('urlCloud'),
      isEmitida: formData.get('emitida') === 'true' ? 1 : 0 // Converte para numérico
    };

    try {
      const response = await createNotaFiscal(notaFiscalData, 1); // statusInicialId = 1
      // Adicionar a nova nota à lista
      setNotasFiscaisData(prev => [...prev, response.data]);
      closeModal();
      // Limpar formulário

      e.target.reset();
    } catch (err) {
      console.error('Erro ao criar nota fiscal:', err);
      console.error('Dados enviados:', notaFiscalData);
      alert('Erro ao criar nota fiscal: ' + (err.response?.data?.message || err.message));
    }
  };

  // Função para salvar edições da nota fiscal
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const updatedData = {
      fkCliente: parseInt(formData.get('cliente')), // ID do cliente como número
      etiqueta: formData.get('etiqueta'),
      valor: parseFloat(formData.get('valor')),
      dataVencimento: formData.get('dataVencimento'),
      descricao: formData.get('descricao') || '',
      urlNuvem: formData.get('urlCloud'),
      isEmitida: formData.get('emitida') === 'true' ? 1 : 0 // Converte para numérico
    };

    try {
      const response = await updateNotaFiscal(editingNota.id_nota_fiscal, updatedData);
      // Atualizar a nota na lista
      setNotasFiscaisData(prev => 
        prev.map(nota => 
          nota.id_nota_fiscal === editingNota.id_nota_fiscal ? response.data : nota
        )
      );
      closeEditModal();
    } catch (err) {
      console.error('Erro ao atualizar nota fiscal:', err);
      alert('Erro ao atualizar nota fiscal');
    }
  };

  // Função para alternar status de emitida (1 = verde, 0 = vermelho)
  const handleToggleEmitida = async (notaId, currentStatus) => {
    try {
      // Converte boolean para numérico e alterna: true(1) -> false(0), false(0) -> true(1)
      const newNumericStatus = currentStatus ? 0 : 1;
      
      console.log(`Toggle - ID: ${notaId}, Status atual: ${currentStatus}, Novo: ${newNumericStatus}`);
      
      // Optimistic update - atualiza a UI imediatamente
      setNotasFiscaisData(prev => 
        prev.map(nota => 
          nota.id_nota_fiscal === notaId ? { ...nota, is_emitida: newNumericStatus } : nota
        )
      );
      
      // Chama a API com valor numérico direto
      await toggleEmitidaNotaFiscal(notaId, newNumericStatus);
      
      console.log('Toggle bem-sucedido!');
      
    } catch (err) {
      // Se der erro, reverte a mudança
      const originalNumericStatus = currentStatus ? 1 : 0;
      setNotasFiscaisData(prev => 
        prev.map(nota => 
          nota.id_nota_fiscal === notaId ? { ...nota, is_emitida: originalNumericStatus } : nota
        )
      );
      console.error('Erro ao alternar status da nota fiscal:', err);
      alert('Erro ao alterar status da nota fiscal: ' + (err.response?.data?.message || err.message));
    }
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
                {notasFiscaisData.map((nota) => (
                  <div key={nota.id_nota_fiscal || nota.numero} className="nf-list-item">
                    <p>{nota.numero}</p>
                    <p>{nota.etiqueta}</p>
                    <p>{nota.data_vencimento}</p>
                    <div className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={nota.is_emitida === 1} // 1 = true (verde), 0 = false (vermelho)
                        onChange={() => handleToggleEmitida(nota.id_nota_fiscal, nota.is_emitida === 1)} 
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
                        <option value="true">Sim (Verde)</option>
                        <option value="false">Não (Vermelho)</option>
                      </select>
                    </div>
                    <div className="form-group-notas">
                      <label htmlFor="cliente">ID do Cliente</label>
                      <input type="number" id="cliente" name="cliente" required placeholder="Ex: 1, 2, 3..." />
                    </div>
                  </div>
                  <div className="form-column">
                    <div className="form-group-notas">
                      <label htmlFor="valor">Valor</label>
                      <input type="number" step="0.01" id="valor" name="valor" required placeholder="Ex: 1250.50" />
                    </div>
                    <div className="form-group-notas">
                      <label htmlFor="etiqueta">Etiqueta</label>
                      <input type="text" id="etiqueta" name="etiqueta" />
                    </div>
                    <div className="form-group-notas">
                      <label htmlFor="urlCloud">URL Cloud</label>
                      <input type="text" id="urlCloud" name="urlCloud" />
                    </div>
                    <div className="form-group-notas">
                      <label htmlFor="descricao">Descrição</label>
                      <textarea id="descricao" name="descricao" rows="3"></textarea>
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
                        defaultValue={editingNota.data_vencimento?.split('/').reverse().join('-')}
                        required 
                      />
                    </div>
                    <div className="form-group-notas">
                      <label htmlFor="emitidaEdit">Emitida</label>
                      <select 
                        id="emitidaEdit" 
                        name="emitida" 
                        defaultValue={editingNota.is_emitida === 1 ? 'true' : 'false'}
                        required
                      >
                        <option value="true">Sim (Verde)</option>
                        <option value="false">Não (Vermelho)</option>
                      </select>
                    </div>
                    <div className="form-group-notas">
                      <label htmlFor="clienteEdit">ID do Cliente</label>
                      <input 
                        type="number" 
                        id="clienteEdit" 
                        name="cliente" 
                        defaultValue={editingNota.fk_cliente}
                        required 
                        placeholder="Ex: 1, 2, 3..."
                      />
                    </div>
                  </div>
                  <div className="form-column">
                    <div className="form-group-notas">
                      <label htmlFor="valorEdit">Valor</label>
                      <input 
                        type="number" 
                        step="0.01"
                        id="valorEdit" 
                        name="valor" 
                        defaultValue={editingNota.valor}
                        required 
                        placeholder="Ex: 1250.50"
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
                        defaultValue={editingNota.url_nuvem}
                      />
                    </div>
                    <div className="form-group-notas">
                      <label htmlFor="descricaoEdit">Descrição</label>
                      <textarea 
                        id="descricaoEdit" 
                        name="descricao" 
                        rows="3"
                        defaultValue={editingNota.descricao}
                      ></textarea>
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
