// src/components/Listagem/Listagem.jsx
import React from 'react';
import './Listagem.css'; 

const Listagem = ({ dados, colunas }) => {
    // Certifica que temos dados para exibir
    if (!dados || dados.length === 0) {
        return <p className="listagem-vazia">Nenhum item encontrado.</p>;
    }

    return (
        <div className="listagem-container">
            {/* Cabeçalho da Lista */}
            <div className="listagem-header">
                {colunas.map((coluna, index) => (
                    // Usa a chave do objeto (ex: nome, dia) para aplicar o estilo correto
                    <span key={index} className={`header-item header-${coluna.key}`}>
                        {coluna.titulo}
                    </span>
                ))}
            </div>

            {/* Linhas de Dados */}
            <div className="listagem-body">
                {dados.map((item, index) => (
                    <div key={index} className="listagem-row">
                        {colunas.map((coluna) => (
                            <div 
                                key={coluna.key} 
                                className={`listagem-data data-${coluna.key}`}
                            >
                                {item[coluna.key]}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Listagem;