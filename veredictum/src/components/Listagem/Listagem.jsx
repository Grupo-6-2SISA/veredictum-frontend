// src/components/Listagem/Listagem.jsx
import React from 'react';
import './Listagem.css'; 

const variantConfigs = {
    clientes: {
        containerClass: 'listagem-clientes',
        headerId: 'clientes-listagem-header',
        rowId: 'clientes-listagem-row',
    },
};

const Listagem = ({ dados, colunas, variant }) => {
    // Certifica que temos dados para exibir
    if (!dados || dados.length === 0) {
        return <p className="listagem-vazia">Nenhum item encontrado.</p>;
    }

    const variantConfig = variant ? variantConfigs[variant] : undefined;
    const containerClassNames = ['listagem-container'];

    if (variantConfig?.containerClass) {
        containerClassNames.push(variantConfig.containerClass);
    }

    return (
        <div className={containerClassNames.join(' ')} data-variant={variant}>
            {/* Cabeçalho da Lista */}
            <div
                className="listagem-header"
                id={variantConfig?.headerId}
            >
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
                    <div
                        key={index}
                        className="listagem-row"
                        id={variantConfig?.rowId}
                    >
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