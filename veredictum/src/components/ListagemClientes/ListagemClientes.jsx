import React from 'react';
import './ListagemClientes.css'; 
import '../Css/Main.css';

const variantConfigs = {
    clientes: {
        containerClasses: ['clientes-listagem-clientes'],
        headerClasses: ['clientes-header', 'clientes-list-header-grid', 'clientes-listagem-header'],
        bodyClasses: ['clientes-list-items-container', 'clientes-list-items-container'],
        rowClasses: ['clientes-list-item-grid', 'clientes-listagem-row'],
    },
};

const ListagemClientes = ({ dados, colunas, variant }) => {
    // Certifica que temos dados para exibir
    if (!dados || dados.length === 0) {
        return <p className="clientes-listagem-vazia">Nenhum item encontrado.</p>;
    }

    const variantConfig = variant ? variantConfigs[variant] : undefined;

    const containerClassNames = ['clientes-listagem-container'];
    const headerClassNames = ['clientes-listagem-header'];
    const bodyClassNames = ['clientes-listagem-body'];
    const rowClassNames = ['clientes-listagem-row'];

    if (variantConfig?.containerClasses) {
        containerClassNames.push(...variantConfig.containerClasses);
    }

    if (variantConfig?.headerClasses) {
        headerClassNames.push(...variantConfig.headerClasses);
    }

    if (variantConfig?.bodyClasses) {
        bodyClassNames.push(...variantConfig.bodyClasses);
    }

    if (variantConfig?.rowClasses) {
        rowClassNames.push(...variantConfig.rowClasses);
    }

    const getColumnClassName = (coluna) => coluna.className ?? `col-${coluna.key}`;

    return (
        <div className={containerClassNames.join(' ')} data-variant={variant}>
            {/* Cabeçalho da Lista */}
            <div className={headerClassNames.join(' ')}>
                {colunas.map((coluna, index) => (
                    // Usa a chave do objeto (ex: nome, dia) para aplicar o estilo correto
                    <p
                        key={index}
                        className={`clientes-header-item header-${coluna.key} ${getColumnClassName(coluna)}`.trim()}
                    >
                        {coluna.titulo}
                    </p>
                ))}
            </div>

            {/* Linhas de Dados */}
            <div className={bodyClassNames.join(' ')}>
                {dados.map((item, index) => (
                    <div
                        key={index}
                        className={rowClassNames.join(' ')}
                    >
                        {colunas.map((coluna) => (
                            <div
                                key={coluna.key}
                                className={`clientes-listagem-data data-${coluna.key} ${getColumnClassName(coluna)}`.trim()}
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

export default ListagemClientes;