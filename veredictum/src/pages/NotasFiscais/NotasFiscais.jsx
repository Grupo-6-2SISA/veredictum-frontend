import React, { useState } from 'react';
import './NotasFiscais.css';
import '../../index.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Listagem from '../../components/Listagem/Listagem';

const NotasFiscais = () => {
  // Estado para controlar o modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Dados de exemplo para notas fiscais
  const notasFiscaisData = [
    { numero: 'NF-001', dataLimite: '15/10/2025', valor: 'R$ 2.500,00' },
    { numero: 'NF-002', dataLimite: '20/10/2025', valor: 'R$ 1.800,00' },
    { numero: 'NF-003', dataLimite: '25/10/2025', valor: 'R$ 3.200,00' },
    { numero: 'NF-004', dataLimite: '30/10/2025', valor: 'R$ 950,00' },
    { numero: 'NF-005', dataLimite: '05/11/2025', valor: 'R$ 4.100,00' },
  ];

  // Definição das colunas para a listagem
  const colunas = [
    { key: 'numero', titulo: 'Número' },
    { key: 'dataLimite', titulo: 'Data Limite' },
    { key: 'valor', titulo: 'Valor' }
  ];

  // Funções para controlar o modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Função para fechar modal clicando fora
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Função para salvar nova nota fiscal
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você adicionaria a lógica para salvar
    closeModal();
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
        
        <div className="cards-container">
          <Card 
            titulo="Notas Fiscais Pendentes" 
            iconePath="src/assets/svg/notas_fiscais.svg"
            alt="Ícone Notas Fiscais"
          >
            <Listagem dados={notasFiscaisData} colunas={colunas} />
          </Card>
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
      </main>
    </div>
  );
};

export default NotasFiscais;
