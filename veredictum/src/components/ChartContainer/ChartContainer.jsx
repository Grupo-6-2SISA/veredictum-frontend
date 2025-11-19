// src/pages/Dashboard/ChartContainer.jsx

import React from 'react';
import './ChartContainer.css';
import BarChartStatic from './BarChartStatic'; // Importa o gráfico estático

// Componente para o ícone de informação neutro
const InfoIconPlaceholder = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#999' }}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
);

const ChartContainer = ({ title }) => {
    return (
        <div className="chart-container">
            <div className="chart-header">
                <h3 className="chart-title">{title}</h3> 
                <div className="info-tooltip-wrapper">
                    {/* ... (código do InfoIconPlaceholder) ... */}
                </div>
            </div>
            
            {/* O conteúdo do gráfico usa BarChartStatic */}
            <div className="chart-content">
                <BarChartStatic />
            </div>
        </div>
    );
};

export default ChartContainer;