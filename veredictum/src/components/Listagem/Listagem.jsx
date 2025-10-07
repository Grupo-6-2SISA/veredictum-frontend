import React from 'react';
import './Listagem.css'; 

const variantConfigs = {
    clientes: {
        containerClasses: ['listagem-clientes'],
        headerClasses: ['list-header', 'client-list-header-grid', 'clientes-listagem-header'],
        bodyClasses: ['list-items-container', 'client-list-items-container'],
        rowClasses: ['client-list-item-grid', 'clientes-listagem-row'],
    },
};

const Listagem = ({ dados, colunas, variant }) => {
    // Certifica que temos dados para exibir
    if (!dados || dados.length === 0) {
        return <p className="listagem-vazia">Nenhum item encontrado.</p>;
    }

    const variantConfig = variant ? variantConfigs[variant] : undefined;

    const containerClassNames = ['listagem-container'];
    const headerClassNames = ['listagem-header'];
    const bodyClassNames = ['listagem-body'];
    const rowClassNames = ['listagem-row'];

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
                        className={`header-item header-${coluna.key} ${getColumnClassName(coluna)}`.trim()}
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
                                className={`listagem-data data-${coluna.key} ${getColumnClassName(coluna)}`.trim()}
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