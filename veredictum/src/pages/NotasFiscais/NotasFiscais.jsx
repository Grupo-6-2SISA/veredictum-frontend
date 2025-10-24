import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Modal from '../../components/Modal_P/Modal_P';
import '../../components/Button/Button_P';
import './NotasFiscais.css';

import {
  getNotasFiscais,
  createNotaFiscal,
  updateNotaFiscal,
  deleteNotaFiscal,
  getClientes
} from './NotasFiscais';

const NotasFiscais = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingNota, setEditingNota] = useState(null);
  const [viewingNota, setViewingNota] = useState(null);
  const [deletingNota, setDeletingNota] = useState(null);
  const [notasFiscaisData, setNotasFiscaisData] = useState([]);
  const [clientesData, setClientesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getEmitidaText = (isEmitida) =>
    (isEmitida === 1 || isEmitida === "1" || isEmitida === true || isEmitida === "true") ? 'Sim' : 'Não';

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    if (dateString.includes('/')) return dateString;
    if (dateString.includes('-') && dateString.length === 10) {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    }
    return dateString;
  };

  const getClienteNome = (clienteId) => {
    const cliente = clientesData.find(c => c.id_cliente == clienteId);
    return cliente ? `${cliente.nome} (ID: ${clienteId})` : `ID: ${clienteId}`;
  };

  const getNormalizedId = (item) => item.id_nota_fiscal || item.id || item.idNotaFiscal || item.id_nota;

  const loadNotasFiscais = async () => {
    try {
      setLoading(true);
      const response = await getNotasFiscais();
      setNotasFiscaisData(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados da API');
      setNotasFiscaisData([]);
    } finally {
      setLoading(false);
    }
  };

  const loadClientes = async () => {
    try {
      const response = await getClientes();
      const clientesNormalizados = response.data.map(cliente => ({
        ...cliente,
        id_cliente: cliente.id_cliente || cliente.id || cliente.clienteId || cliente.idCliente,
        id: cliente.id_cliente || cliente.id || cliente.clienteId || cliente.idCliente
      }));
      setClientesData(clientesNormalizados);
    } catch (err) {
      setClientesData([]);
    }
  };

  useEffect(() => {
    loadNotasFiscais();
    loadClientes();
  }, []);

  const closeModal = () => setIsModalOpen(false);
  const closeEditModal = () => { setIsEditModalOpen(false); setEditingNota(null); };
  const closeInfoModal = () => { setIsInfoModalOpen(false); setViewingNota(null); };
  const closeDeleteModal = () => { setIsDeleteModalOpen(false); setDeletingNota(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const notaFiscalData = {
      numero: formData.get('numeroNota'),
      fkCliente: parseInt(formData.get('cliente')),
      etiqueta: formData.get('etiqueta'),
      valor: parseFloat(formData.get('valor')),
      dataVencimento: formData.get('dataVencimento'),
      descricao: formData.get('descricao') || '',
      urlNuvem: formData.get('urlCloud') || '',
      isEmitida: formData.get('emitida') === 'true' ? 1 : 0
    };

    // Validação: não permitir número duplicado
    const novoNumero = (notaFiscalData.numero || '').toString().trim().toLowerCase();
    const duplicada = notasFiscaisData.some(n => {
      const existente = (n.numero || n.numeroNota || '').toString().trim().toLowerCase();
      return existente && existente === novoNumero;
    });

    if (duplicada) {
      alert('Já existe uma nota fiscal cadastrada com este número. Escolha outro número.');
      return;
    }

    try {
      const response = await createNotaFiscal(notaFiscalData, 1);
      setNotasFiscaisData(prev => [...prev, response.data]);
      alert('Nota fiscal criada com sucesso!');
      closeModal();
      e.target.reset();
    } catch (err) {
      alert('Erro ao criar nota fiscal: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (nota) => {
    const notaId = getNormalizedId(nota);
    if (!notaId) {
      alert('Erro: ID da nota fiscal não encontrado');
      return;
    }

    setEditingNota({
      id_nota_fiscal: notaId,
      numero: nota.numero || nota.numeroNota,
      etiqueta: nota.etiqueta,
      valor: nota.valor,
      dataVencimento: nota.dataVencimento || nota.data_vencimento,
      is_emitida: nota.is_emitida,
      fk_cliente: nota.fk_cliente || nota.fkCliente || nota.cliente,
      url_nuvem: nota.url_nuvem || nota.urlNuvem,
      descricao: nota.descricao
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const notaId = editingNota?.id_nota_fiscal;

    if (!notaId || !formData.get('cliente')) {
      alert('Erro: Dados obrigatórios não preenchidos');
      return;
    }

    const updatedData = {
      numero: formData.get('numeroNota'),
      fkCliente: parseInt(formData.get('cliente')),
      etiqueta: formData.get('etiqueta'),
      valor: parseFloat(formData.get('valor')),
      dataVencimento: formData.get('dataVencimento'),
      descricao: formData.get('descricao') || '',
      urlNuvem: formData.get('urlCloud') || '',
      isEmitida: formData.get('emitida') === 'true' ? 1 : 0
    };

    // Validação: não permitir número duplicado (exceto se for a própria nota)
    const novoNumeroEdit = (updatedData.numero || '').toString().trim().toLowerCase();
    const duplicadaEdit = notasFiscaisData.some(n => {
      const existente = (n.numero || n.numeroNota || '').toString().trim().toLowerCase();
      const idAtual = getNormalizedId(n);
      return existente && existente === novoNumeroEdit && idAtual != notaId;
    });

    if (duplicadaEdit) {
      alert('Já existe outra nota fiscal com esse número.');
      return;
    }

    try {
      await updateNotaFiscal(notaId, updatedData);

      setNotasFiscaisData(prev =>
        prev.map(nota => getNormalizedId(nota) == notaId ? {
          ...nota,
          ...updatedData,
          id_nota_fiscal: notaId,
          fk_cliente: updatedData.fkCliente,
          url_nuvem: updatedData.urlNuvem,
          is_emitida: updatedData.isEmitida
        } : nota)
      );

      alert('Nota fiscal editada com sucesso!');
      closeEditModal();
    } catch (err) {
      alert('Erro ao editar nota fiscal: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (nota) => {
    const notaId = getNormalizedId(nota);
    if (!notaId) {
      alert('Erro: ID da nota fiscal não encontrado');
      return;
    }

    const confirmado = window.confirm(`Tem certeza que deseja excluir a nota fiscal "${nota.numero}"?`);
    if (!confirmado) return;

    try {
      await deleteNotaFiscal(notaId);
      setNotasFiscaisData(prev => prev.filter(item => getNormalizedId(item) != notaId));
      alert('Nota fiscal excluída com sucesso!');
    } catch (err) {
      const message = err.response?.status === 409
        ? 'Não é possível excluir esta nota fiscal pois existem registros dependentes.'
        : 'Erro ao excluir nota fiscal: ' + (err.response?.data?.message || err.message);
      alert(message);
    }
  };

  const confirmDelete = async () => {
    if (!deletingNota) return;

    try {
      await deleteNotaFiscal(deletingNota.id_nota_fiscal);
      setNotasFiscaisData(prev => prev.filter(item => getNormalizedId(item) != deletingNota.id_nota_fiscal));
      alert('Nota fiscal excluída com sucesso!');
      closeDeleteModal();
    } catch (err) {
      const message = err.response?.status === 409
        ? 'Não é possível excluir esta nota fiscal pois existem registros dependentes.'
        : 'Erro ao excluir nota fiscal: ' + (err.response?.data?.message || err.message);
      alert(message);
    }
  };

  const handleViewInfo = (nota) => {
    if (!getNormalizedId(nota)) {
      alert('Erro: ID da nota fiscal não encontrado');
      return;
    }
    setViewingNota(nota);
    setIsInfoModalOpen(true);
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) return dateString;
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateString;
  };

  const getEmitidaValue = (isEmitida) =>
    (isEmitida === 1 || isEmitida === "1" || isEmitida === true || isEmitida === "true") ? 'true' : 'false';

  const renderClienteOptions = () =>
    clientesData.map((cliente, index) => {
      const clienteId = cliente.id_cliente || cliente.id;
      const clienteNome = cliente.nome || cliente.nomeCliente || cliente.name || `Cliente ${index + 1}`;
      return (
        <option key={clienteId || index} value={clienteId}>
          {clienteNome} - ID: {clienteId}
        </option>
      );
    });

  const FormField = ({ label, children, htmlFor }) => (
    <div className="form-group-notas_P">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );

  return (
    <div className="notas-fiscais-container">
      <Sidebar />

      <div className="notas-fiscais-content">
        <div className="header-top-nf">
          <div className="head-description">
            <div className="div_topo">
              <h1>Gestão de Notas Fiscais</h1>
            </div>
            <p className="description">
              Organize, atualize e controle todas as suas notas fiscais de forma eficiente.
            </p>
          </div>
          <button className="btn-new-appointment_P" onClick={() => setIsModalOpen(true)}>
            Adicionar Nota Fiscal
            <img src="src/assets/svg/btn.svg" alt="" />
          </button>
        </div>

        <div className="nf-management-section">
          <div className="nf-table-card">
            <div className="card-header">
              <h2>Lista de Notas Fiscais</h2>
            </div>

            <div className="card-content">
              <div className="list-header-nf">
                <p>Número</p>
                <p>Etiqueta</p>
                <p>Data Vencimento</p>
                <p>Emitida</p>
                <p>Editar</p>
                <p>Excluir</p>
                <p>Ver mais</p>
              </div>

              {loading ? (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <p>Carregando notas fiscais...</p>
                </div>
              ) : error ? (
                <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>
                  <p>{error}</p>
                  <button onClick={loadNotasFiscais} style={{
                    padding: '10px 20px', marginTop: '10px', background: 'var(--darkness-black)',
                    color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'
                  }}>
                    Tentar Novamente
                  </button>
                </div>
              ) : notasFiscaisData.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <p>Nenhuma nota fiscal encontrada</p>
                </div>
              ) : (
                <div className="list-items-container nf-list-items-container">
                  {notasFiscaisData.map((nota, index) => {
                    const notaId = getNormalizedId(nota);
                    const emitidaText = getEmitidaText(nota.is_emitida);

                    return (
                      <div key={notaId || index} className="nf-list-item">
                        <p>{nota.numero}</p>

                        <p className="nf-etiqueta" title={nota.etiqueta}>{nota.etiqueta}</p>
                        <p>{formatDateForDisplay(nota.dataVencimento)}</p>
                        <p style={{
                          color: emitidaText === 'Sim' ? 'green' : 'red',
                          fontWeight: 'bold'
                        }}>
                          {emitidaText}
                        </p>
                        <img src="src/assets/svg/edit.svg" alt="Editar" onClick={() => handleEdit(nota)} />
                        <img src="src/assets/svg/lixo.svg" alt="Excluir" onClick={() => handleDelete(nota)} />
                        <a
                          href="#"
                          onClick={(e) => { e.preventDefault(); handleViewInfo(nota); }}
                          style={{ color: 'black', textDecoration: 'underline' }}
                        >
                          Ver mais
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Adicionar */}
        <Modal
          isOpen={isModalOpen}
          variant="add"
          title="Adicionar Nota Fiscal"
          onClose={closeModal}
          modalId="new-appointment-modal-add-note-notas"
          formProps={{
            onSubmit: handleSubmit,
            className: "appointment-form_P"
          }}
        >
          <div className="form-row_P">
            <FormField label="Número da Nota" htmlFor="numeroNota">
              <input type="text" id="numeroNota" name="numeroNota" placeholder="Ex: NF-001" required />
            </FormField>
            <FormField label="Cliente" htmlFor="cliente">
              <select id="cliente" name="cliente" required>
                <option value="">Selecione um cliente</option>
                {renderClienteOptions()}
              </select>
            </FormField>
          </div>

          <div className="form-row_P">
            <FormField label="Etiqueta" htmlFor="etiqueta">
              <input type="text" id="etiqueta" name="etiqueta" placeholder="Ex: Vendas" required />
            </FormField>
            <FormField label="Valor" htmlFor="valor">
              <input type="number" step="0.01" id="valor" name="valor" placeholder="0.00" required />
            </FormField>
          </div>

          <div className="form-row_P">
            <FormField label="Data de Vencimento" htmlFor="dataVencimento">
              <input type="date" id="dataVencimento" name="dataVencimento" required />
            </FormField>
            <FormField label="Emitida" htmlFor="emitida">
              <select id="emitida" name="emitida" defaultValue="" required>
                <option value="" disabled>Selecione</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </FormField>
          </div>

          <div className="form-row_P">
            <FormField label="URL na Nuvem" htmlFor="urlCloud">
              <input type="url" id="urlCloud" name="urlCloud" placeholder="https://..." />
            </FormField>
            <FormField label="Descrição" htmlFor="descricao">
              <input type="text" id="descricao" name="descricao" placeholder="Descrição da nota" />
            </FormField>
          </div>

          <div className="form-footer-notas_P">
            <button type="submit" className="btn-new-appointment_P">
              Salvar Nota Fiscal
            </button>
          </div>
        </Modal>

        {/* Modal Editar */}
        <Modal
          isOpen={isEditModalOpen}
          variant="edit"
          title="Editar Nota Fiscal"
          onClose={closeEditModal}
          modalId="new-appointment-modal-edit-note_P"
          formProps={{
            onSubmit: handleEditSubmit,
            className: "appointment-form_P"
          }}
        >
          {editingNota && (
            <>
              <div className="form-row_P">
                <FormField label="Número da Nota" htmlFor="numeroNotaEdit">
                  <input type="text" id="numeroNotaEdit" name="numeroNota" defaultValue={editingNota.numero || ''} required />
                </FormField>
                <FormField label="Cliente" htmlFor="clienteEdit">
                  <select id="clienteEdit" name="cliente" defaultValue={editingNota.fk_cliente || ''} required>
                    <option value="">Selecione um cliente</option>
                    {renderClienteOptions()}
                  </select>
                </FormField>
              </div>

              <div className="form-row_P">
                <FormField label="Etiqueta" htmlFor="etiquetaEdit">
                  <input type="text" id="etiquetaEdit" name="etiqueta" defaultValue={editingNota.etiqueta || ''} required />
                </FormField>
                <FormField label="Valor" htmlFor="valorEdit">
                  <input type="number" step="0.01" id="valorEdit" name="valor" defaultValue={editingNota.valor || ''} required />
                </FormField>
              </div>

              <div className="form-row_P">
                <FormField label="Data de Vencimento" htmlFor="dataVencimentoEdit">
                  <input type="date" id="dataVencimentoEdit" name="dataVencimento" defaultValue={formatDateForInput(editingNota.dataVencimento)} required />
                </FormField>
                <FormField label="Emitida" htmlFor="emitidaEdit">
                  <select id="emitidaEdit" name="emitida" defaultValue={getEmitidaValue(editingNota.is_emitida)} required>
                    <option disabled value="">Selecione</option>
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </FormField>
              </div>

              <div className="form-row_P">
                <FormField label="URL na Nuvem" htmlFor="urlCloudEdit">
                  <input type="url" id="urlCloudEdit" name="urlCloud" defaultValue={editingNota.url_nuvem || ''} />
                </FormField>
                <FormField label="Descrição" htmlFor="descricaoEdit">
                  <input type="text" id="descricaoEdit" name="descricao" defaultValue={editingNota.descricao || ''} />
                </FormField>
              </div>

              <div className="form-footer-notas_P">
                <button type="button" className="btn-new-appointment_P" onClick={closeEditModal} style={{ background: '#666' }}>
                  Cancelar
                </button>
                <button type="submit" className="btn-new-appointment_P">
                  Salvar Alterações
                </button>
              </div>
            </>
          )}
        </Modal>

        {/* Modal Ver Mais */}
        <Modal
          isOpen={isInfoModalOpen}
          variant="view"
          title="Informações da Nota Fiscal"
          onClose={closeInfoModal}
          modalId="new-appointment-modal-view-note_P"
          footer={
            <div className="form-footer-notas_P">
              <button type="button" className="btn-new-appointment_P" onClick={closeInfoModal}>
                Fechar
              </button>
            </div>
          }
        >
          {viewingNota && (
            <>
              <div className="form-row_P">
                <FormField label="Número da Nota">
                  <div className="info-display">{viewingNota.numero}</div>
                </FormField>
                <FormField label="Cliente">
                  <div className="info-display">{getClienteNome(viewingNota.fk_cliente)}</div>
                </FormField>
              </div>

              <div className="form-row_P">
                <FormField label="Etiqueta">
                  <div className="info-display">{viewingNota.etiqueta}</div>
                </FormField>
                <FormField label="Valor">
                  <div className="info-display">R$ {viewingNota.valor}</div>
                </FormField>
              </div>

              <div className="form-row_P">
                <FormField label="Data de Vencimento">
                  <div className="info-display">{formatDateForDisplay(viewingNota.dataVencimento)}</div>
                </FormField>
                <FormField label="Emitida">
                  <div className="info-display">{getEmitidaText(viewingNota.is_emitida)}</div>
                </FormField>
              </div>

              <div className="form-row_P">
                <FormField label="URL na Nuvem">
                  <div className="info-display">
                    {viewingNota.url_nuvem ? (
                      <a href={viewingNota.url_nuvem} target="_blank" rel="noopener noreferrer">
                        {viewingNota.url_nuvem}
                      </a>
                    ) : 'Não informado'}
                  </div>
                </FormField>
                <FormField label="Descrição">
                  <div className="info-display">{viewingNota.descricao || 'Não informado'}</div>
                </FormField>
              </div>
            </>
          )}
        </Modal>

        {/* Modal Delete removido: exclusão agora usa window.confirm no handleDelete */}
      </div>
    </div>
  );
};

export default NotasFiscais;
