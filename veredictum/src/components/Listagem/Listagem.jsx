import React from 'react';
import './Listagem.css';
import '../../index.css';

<<<<<<< HEAD

const variantConfigs = {
    clientes: {
        containerClasses: ['listagem-clientes'],
        headerClasses: ['list-header', 'client-list-header-grid', 'clientes-listagem-header'],
        bodyClasses: ['list-items-container', 'client-list-items-container'],
        rowClasses: ['client-list-item-grid', 'clientes-listagem-row'],
    },
};
=======
const Listagem = ({ dados, colunas }) => {
  // Define o grid dinamicamente conforme o número de colunas
  const gridTemplate = colunas.length === 3
    ? '3fr 2fr 1fr'
    : colunas.length === 2
      ? '3fr 2fr'
      : '1fr';
>>>>>>> f5d11bdca17ec11939ee4c7e9fe5cffac2d86bb3

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