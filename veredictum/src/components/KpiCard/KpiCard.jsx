// src/pages/Dashboard/KpiCard.jsx

import React from 'react';
import './KpiCard.css';

const KpiCard = ({ label, value, change, status }) => {
    
    const isSkeleton = !value && !change;
    const displayValue = value || '00';
    const displayChange = change || '0%';
    
    // Lógica para extrair o percentual
    const matchPercent = label.match(/\s*(\(\s*\d{1,3}%\s*\))/);
    const displayPercent = matchPercent ? matchPercent[1] : '';
    const cleanLabel = label.replace(/\s*(\(\s*\d{1,3}%\s*\))/, '').trim(); 
    
    // Lógica para determinar a classe de cor da variação (change) e o ícone de seta
    let changeClass = '';
    let changeIcon = null; 
    
    if (change && change.includes('+')) {
        changeClass = 'change-positive';
        changeIcon = '▲'; 
    } else if (change && change.includes('-')) {
        changeClass = 'change-negative';
        changeIcon = '▼'; 
    }
    
    // Classes condicionais para esqueleto
    const headerStatusClass = isSkeleton ? 'skeleton-header-label' : (status ? 'kpi-status' : 'kpi-status-hidden');
    const valueClass = isSkeleton ? 'kpi-value skeleton-value' : 'kpi-value';
    const labelClass = isSkeleton ? 'kpi-label skeleton-text-long' : 'kpi-label';
    // O kpi-change agora é apenas o contêiner de posicionamento absoluto
    const changeWrapperClass = isSkeleton ? 'kpi-change kpi-change-skeleton' : `kpi-change ${changeClass}`; 
    
    return (
        <div className="kpi-card">
            
            {/* 1. Header com Status/Cuidado */}
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
                    
                    {/* 🚀 AJUSTE CRUCIAL: Mover o Label para CIMA */}
                    
                    {/* 1. Label (Título) agora vem primeiro */}
                    <div className={labelClass}>{cleanLabel}</div>
                    
                    {/* 2. Valor principal e percentual secundário (vem depois) */}
                    <div className={valueClass}>
                        {displayValue} 
                        <span className="percent">{displayPercent}</span>
                    </div>
                    
                </div>
                
                {/* 🚀 AJUSTE: O wrapper agora contém a Seta e o Balão separadamente */}
                <div className={changeWrapperClass}>
                    {!isSkeleton && (
                        <>
                            {/* Seta Desconectada e Colorida */}
                            <span className={`change-icon ${changeClass}`}>{changeIcon}</span>
                            
                            {/* Balão com o Percentual (Fundo Colorido) */}
                            <span className="change-value-baloon">
                                {displayChange}
                            </span>
                        </>
                    )}
                    {isSkeleton && <span className="change-skeleton-placeholder">{displayChange}</span>}
                </div>
            </div>
            
        </div>
    );
};

export default KpiCard;