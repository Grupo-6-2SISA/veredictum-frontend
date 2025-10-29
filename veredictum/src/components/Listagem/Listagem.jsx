// Listagem.js
import React from 'react';
import './Listagem.css';
import '../../index.css';

// ADICIONADA A PROPRIEDADE isHeaderless com valor padrão false
const Listagem = ({ dados = [], colunas = [], classNamePrefix = 'listagem', id, isFullTable = false, gridTemplateCustom, isHeaderless = false }) => {
    const prefix = classNamePrefix;

    // USE A PROP gridTemplateCustom SE ELA EXISTIR. CASO CONTRÁRIO, USE A LÓGICA EXISTENTE
    const gridTemplate = gridTemplateCustom 
        ? gridTemplateCustom 
        : (isFullTable
            ? '0.2fr 2fr 1fr 1fr 1fr 0.5fr 0.5fr'
            : (colunas.length === 3
                ? '3fr 2fr 1fr'
                : colunas.length === 2
                    ? '3fr 2fr'
                    : '1fr'));
    
    // Função de exemplo para tratar os cliques nas ações de Editar/Excluir/Ver Mais
    const handleActionClick = (key, item) => {
        console.log(`Ação ${key} clicada para o item:`, item.Tipo || item.nome);
        alert(`Você clicou em ${key} para o item de ${item.Tipo || item.nome}!`);
    };

    const isLastColumn = (index) => index === colunas.length - 1;

    return (
        <div className={`${prefix}-container`} id={id}>
            {/* RENDERIZAÇÃO CONDICIONAL: O header só será renderizado se isHeaderless NÃO for true */}
            {!isHeaderless && (
                <div
                    className={`${prefix}-header`}
                    style={{ gridTemplateColumns: gridTemplate }}
                    role="row"
                >
                    {colunas.map(col => (
                        <div key={col.key} className={`${prefix}-header-cell`}>{col.titulo}</div>
                    ))}
                </div>
            )}
            {/* FIM DA RENDERIZAÇÃO CONDICIONAL */}

            <div className={`${prefix}-body`}>
                {dados.map((item, idx) => (
                    <div
                        className={`${prefix}-row`}
                        style={{ gridTemplateColumns: gridTemplate }}
                        key={idx}
                        role="row"
                    >
                        {colunas.map((col, colIndex) => {
                            const key = col.key;
                            const value = item[key];

                            // Se o valor já for um elemento React, renderize-o direto (permite botões customizados, inputs, etc.)
                            if (React.isValidElement(value)) {
                                return (
                                    <div className={`${prefix}-data`} key={`${key}-${idx}`}>
                                        {value}
                                    </div>
                                );
                            }

                            // Checkbox / botões de ação também podem ser passados como elementos — tratamos input checkbox simples aqui
                            if (key === 'checkbox') {
                                return (
                                    <div className={`${prefix}-data`} key={`${key}-${idx}`}>
                                        {value}
                                    </div>
                                );
                            }

                            // Se for a coluna de ações e não houver um elemento passado, renderizamos um botão "Ver Mais" padrão
                            if ((isLastColumn(colIndex) && col.titulo === 'Ações') && (value === undefined || value === null || value === '')) {
                                return (
                                    <div className={`${prefix}-data`} key={`${key}-${idx}`}>
                                        <button 
                                            className={`${prefix}-btn ${prefix}-btn-vermais`} 
                                            aria-label={`Ver mais detalhes sobre ${item.Tipo || 'este item'}`}
                                            onClick={() => handleActionClick('verMais', item)}
                                        >
                                            Ver Mais
                                        </button>
                                    </div>
                                );
                            }

                            // Renderiza valor padrão (texto, número, componentes não-React serão convertidos para string)
                            return (
                                <div className={`${prefix}-data`} key={`${key}-${idx}`}>
                                    {value}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Listagem;