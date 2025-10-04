import React from 'react';
import './NotasFiscais.css';
import '../../index.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Listagem from '../../components/Listagem/Listagem';

const NotasFiscais = () => {
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

  return (
    <div className="notas-fiscais-container">
      <Sidebar />
      
      <main className="notas-fiscais-content">
        <div className="page-header">
          <h1>Gestão de Notas Fiscais</h1>
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
      </main>
    </div>
  );
};

export default NotasFiscais;
