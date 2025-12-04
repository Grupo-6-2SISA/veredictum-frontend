import React from 'react';
import './KpiCard.css';

const KpiCard = ({ label, value, change, status, tooltipTitle, tooltipText, disableNegative }) => {
    const isSkeleton = !value && !change;
    const displayValue = value || '0';
    const displayChange = change || '0%';

    const cleanLabel = label ? label.replace(/\s*(\(\s*\d{1,3}%\s*\))/, '').trim() : '';

    const tooltipDictionary = {
        contas: {
            "Total de Contas":
                "Quantidade total de contas geradas no período analisado. Representa todos os lançamentos criados, independentemente do status, servindo como indicador do volume de operações financeiras do sistema.",
            
            "Contas Vencidas":
                "Contas cujo prazo de pagamento expirou sem quitação. Esse indicador demonstra riscos financeiros e atrasos críticos, ajudando na identificação de gargalos na cobrança ou comportamento do cliente.",
            
            "Contas Pagas":
                "Total de contas que foram quitadas dentro ou fora do prazo. É um indicador direto da efetividade da cobrança e da saúde financeira operacional."
        },

        atendimentos: {
            "Total de Atendimentos":
                "Volume completo de atendimentos registrados no período selecionado. Inclui atendimentos concluídos, pendentes e em andamento, funcionando como termômetro da demanda operacional.",
            
            "Atendimentos Concluídos":
                "Atendimentos finalizados com sucesso no período. É um indicador da capacidade resolutiva da equipe e da eficiência operacional.",
            
            "Atendimentos Pendentes":
                "Atendimentos que ainda não foram encerrados. Eles podem indicar acúmulo, gargalos ou possíveis falhas no fluxo, devendo ser acompanhados para evitar atrasos no atendimento ao cliente."
        },

        notas: {
            "Notas Fiscais Totais":
                "Quantidade total de notas fiscais registradas durante o período. Serve como métrica de volume de movimentação fiscal da operação.",
            
            "Notas Emitidas":
                "Notas fiscais que já foram validadas e emitidas com sucesso. É um indicador da conformidade fiscal e eficiência no processamento de documentos.",
            
            "Total de Notas":
                "Notas fiscais que ainda estão pendentes de emissão ou validação. Ajuda a identificar possíveis atrasos no fluxo fiscal e oportunidades de otimização."
        }
    };

    // Localiza automaticamente o tooltip associado à KPI
    const findTooltip = () => {
        for (const catalog in tooltipDictionary) {
            if (tooltipDictionary[catalog][cleanLabel]) {
                return tooltipDictionary[catalog][cleanLabel];
            }
        }
        return null;
    };

    const autoTooltip = findTooltip();

    const finalTooltipText =
        tooltipText ||
        autoTooltip ||
        null;

    const finalTooltipTitle = tooltipTitle || cleanLabel;

    // PARTE DO ÍCONE DE VARIAÇÃO
    let changeClass = '';
    let changeIcon = null;
    let changeNumber = null;

    if (change) {
        const parsed = parseFloat(String(change).replace(/[^0-9.-]/g, ''));
        changeNumber = isNaN(parsed) ? null : parsed;
    }

    if (changeNumber !== null) {
        if (changeNumber > 0) {
            changeClass = 'change-positive';
            changeIcon = '▲';
        } else if (changeNumber < 0 && !disableNegative) {
            changeClass = 'change-negative';
            changeIcon = '▼';
        }
    }

    const headerStatusClass = isSkeleton ? 'skeleton-header-label' : (status ? 'kpi-status' : 'kpi-status-hidden');
    const valueClass = isSkeleton ? 'kpi-value skeleton-value' : 'kpi-value';
    const labelClass = isSkeleton ? 'kpi-label skeleton-text-long' : 'kpi-label';
    const changeWrapperClass = isSkeleton ? 'kpi-change kpi-change-skeleton' : `kpi-change ${changeClass}`;
    const borderClass = (changeClass === 'change-negative' && !isSkeleton) ? 'kpi-card-negative-border' : '';

    return (
        <div className={`kpi-card ${borderClass}`}>
            <div className="kpi-header">
                {status && !isSkeleton && (
                    <span className={headerStatusClass}>
                        <span className="status-icon">⚠️</span> {status}
                    </span>
                )}
                {isSkeleton && <span className={headerStatusClass}></span>}
            </div>

            <div className="kpi-main">
                <div className="kpi-info">
                    <div className={labelClass}>{cleanLabel}</div>
                    <div className={valueClass}>{displayValue}</div>
                </div>

                {/* Tooltip automático */}
                {!isSkeleton && finalTooltipText && (
                    <div className="kpi-tooltip">
                        <h4 className="tooltip-title">{finalTooltipTitle}</h4>
                        <p className="tooltip-text">{finalTooltipText}</p>
                    </div>
                )}

                <div className={changeWrapperClass}>
                    {!isSkeleton && (
                        <>
                            {changeIcon && <span className={`change-icon ${changeClass}`}>{changeIcon}</span>}
                            <span className="change-value-baloon">{displayChange}</span>
                        </>
                    )}
                    {isSkeleton && <span className="change-skeleton-placeholder">{displayChange}</span>}
                </div>
            </div>
        </div>
    );
};

export default KpiCard;
