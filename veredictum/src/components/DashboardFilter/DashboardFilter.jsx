// src/pages/Dashboard/DashboardFilter.jsx (Ajustado)

import React, { useState } from 'react';
import './DashboardFilter.css';

const DashboardFilter = ({ onApplyFilter }) => {
    const [selectedCatalog, setSelectedCatalog] = useState('');
    const [fromPeriod, setFromPeriod] = useState(''); // format YYYY-MM
    const [toPeriod, setToPeriod] = useState('');

    const handleApply = () => {
        if (!onApplyFilter) return;
        onApplyFilter({ catalog: selectedCatalog, from: fromPeriod, to: toPeriod });
    };

    return (
        <div className="dashboard-filter-bar">

            {/* Input "De" (mês/ano) */}
            <div className="filter-input-group">
                <label htmlFor="date-from">De</label>
                <div className="input-with-icon">
                    <input type="month" id="date-from" value={fromPeriod} onChange={e => setFromPeriod(e.target.value)} />
                    <span className="icon-calendar"></span>
                </div>
            </div>

            {/* Input "Para" (mês/ano) */}
            <div className="filter-input-group">
                <label htmlFor="date-to">Para</label>
                <div className="input-with-icon">
                    <input type="month" id="date-to" value={toPeriod} onChange={e => setToPeriod(e.target.value)} />
                    <span className="icon-calendar"></span>
                </div>
            </div>

            {/* Select "Catálogo" */}
            <div className="filter-input-group">
                <label htmlFor="catalog">Catálogo</label>
                <div className="input-with-icon select-container">
                    <select id="catalog" onChange={e => setSelectedCatalog(e.target.value)} value={selectedCatalog}>
                        <option value="" disabled>Catálogo</option>
                        <option value="atendimentos">Atendimentos</option>
                        <option value="contas">Contas</option>
                        <option value="notas">Notas Fiscais</option>
                    </select>

                    {/* Seta para baixo para o select */}
                    <span className="select-arrow" aria-hidden="true">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </div>
            </div>

            {/* Botão Filtrar (Estilo Sólido Escuro) */}
            <button className="filter-button button-dark-solid" onClick={handleApply}>Filtrar</button>
        </div>
    );
};

export default DashboardFilter;