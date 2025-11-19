// src/pages/Dashboard/DashboardFilter.jsx (Ajustado)

import React from 'react';
import './DashboardFilter.css';

const DashboardFilter = () => {
    return (
        <div className="dashboard-filter-bar">

            {/* Input "De" */}
            <div className="filter-input-group">
                <label htmlFor="date-from">De</label>
                <div className="input-with-icon">
                    <input type="text" id="date-from" placeholder="MM/YYYY" />
                    <span className="icon-calendar"></span> {/* Ícone de Calendário */}
                </div>
            </div>

            {/* Input "Para" */}
            <div className="filter-input-group">
                <label htmlFor="date-to">Para</label>
                <div className="input-with-icon">
                    <input type="text" id="date-to" placeholder="MM/YYYY" />
                    <span className="icon-calendar"></span> {/* Ícone de Calendário */}
                </div>
            </div>

            {/* Select "Catálogo" */}
            <div className="filter-input-group">
                <label htmlFor="catalog">Catálogo</label>
                <div className="input-with-icon select-container">
                    <select id="catalog">
                        <option value="" disabled>Catálogo</option>
                        <option value="cat1">Atendimentos</option>
                        <option value="cat2">Contas</option>
                        <option value="cat3">Notas Fiscais</option>
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
            <button className="filter-button button-dark-solid">Filtrar</button>
        </div>
    );
};

export default DashboardFilter;