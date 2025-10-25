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
                            const value = item[key];

                            // === NOVO AJUSTE: Trate o checkbox como um elemento React, assim como editar/excluir ===
                            if (key === 'checkbox' || key === 'editar' || key === 'excluir') {
                                return (
                                    <div className={`${prefix}-data`} key={key}>
                                        {value} {/* Renderiza o elemento React passado (o input reativo ou o botão) */}
                                    </div>
                                );
                            }
                            // === FIM DO NOVO AJUSTE ===

                            // Renderização padrão para outros dados
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