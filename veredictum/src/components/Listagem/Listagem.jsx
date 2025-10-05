import React from 'react';
import './Listagem.css';
import '../../index.css';

const Listagem = ({ dados, colunas }) => {
  // Define o grid dinamicamente conforme o número de colunas
  // Cria uma string para grid-template-columns baseada no número de colunas
  const gridTemplate = colunas.map(() => '1fr').join(' ');

  return (
    <div className="listagem-container">
      <div
        className="listagem-header"
        style={{ gridTemplateColumns: gridTemplate }}
      >
        {colunas.map(col => (
          <div key={col.key}>{col.titulo}</div>
        ))}
      </div>
      {dados.map((item, idx) => (
        <div
          className="listagem-row"
          style={{ gridTemplateColumns: gridTemplate }}
          key={idx}
        >
          {colunas.map(col => (
            <div className="listagem-data" key={col.key}>
              {item[col.key]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Listagem;