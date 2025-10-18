import React from 'react';
import './Listagem.css';
import '../../index.css';

const Listagem = ({ dados = [], colunas = [], classNamePrefix = 'listagem', id, isFullTable = false }) => {
    const prefix = classNamePrefix;

    const gridTemplate = isFullTable
        ? '0.2fr 2fr 1fr 1fr 1fr 0.5fr 0.5fr'
        : (colunas.length === 3
            ? '3fr 2fr 1fr'
            : colunas.length === 2
                ? '3fr 2fr'
                : '1fr');

    // Função de exemplo para tratar os cliques nas ações de Editar/Excluir
    const handleActionClick = (key, item) => {
        // Esta função deve ser substituída pela lógica real da sua aplicação (ex: abrir modal, chamar API)
        console.log(`Ação ${key} clicada para o item:`, item.nome);
        alert(`Você clicou em ${key} para o agendamento de ${item.nome}!`);
    };

    return (
        <div className={`${prefix}-container`} id={id}>
            <div
                className={`${prefix}-header`}
                style={{ gridTemplateColumns: gridTemplate }}
                role="row"
            >
                {colunas.map(col => (
                    <div key={col.key} className={`${prefix}-header-cell`}>{col.titulo}</div>
                ))}
            </div>

            <div className={`${prefix}-body`}>
                {dados.map((item, idx) => (
                    <div
                        className={`${prefix}-row`}
                        style={{ gridTemplateColumns: gridTemplate }}
                        key={idx}
                        role="row"
                    >
                        {colunas.map(col => {
                            const key = col.key;
                            const value = item[key]; // O valor é o caminho do SVG passado pelo componente pai

                            if (key === 'checkbox') {
                                return (
                                    <div className={`${prefix}-data`} key={key}>
                                        <input type="checkbox" aria-label={`select-row-${idx}`} />
                                    </div>
                                );
                            }

                            // === AJUSTE PARA RENDERIZAR ÍCONES DE ASSETS ===
                            if (key === 'editar' || key === 'excluir') {
                                // Verifica se o componente pai passou o caminho do ícone
                                if (value) {
                                    return (
                                        <div className={`${prefix}-data`} key={key}>
                                            <button 
                                                className={`${prefix}-btn ${prefix}-btn-${key}`} 
                                                aria-label={`${key} ${item.nome}`} // Acessibilidade
                                                onClick={() => handleActionClick(key, item)}
                                            >
                                                {/* Usa a tag <img> com o caminho do asset no 'src' */}
                                                <img 
                                                    src={value} 
                                                    alt={col.titulo} // 'Editar' ou 'Excluir'
                                                    className={`${prefix}-icon`} 
                                                />
                                            </button>
                                        </div>
                                    );
                                }
                                // Retorna célula vazia se o ícone não foi fornecido
                                return <div className={`${prefix}-data`} key={key}></div>;
                            }
                            // === FIM DO AJUSTE ===

                            // Renderização padrão para outros dados (nome, dia, horario, status, etc.)
                            return (
                                <div className={`${prefix}-data`} key={key}>
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