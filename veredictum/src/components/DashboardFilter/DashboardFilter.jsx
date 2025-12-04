import React, { useState } from 'react';
import './DashboardFilter.css';


const getCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
};


const DashboardFilter = ({ onApplyFilter }) => {
    const [selectedCatalog, setSelectedCatalog] = useState('');
    const [fromPeriod, setFromPeriod] = useState(getCurrentMonth());
    const [toPeriod, setToPeriod] = useState(getCurrentMonth());

    const handleCatalogChange = (newCatalog) => {
        setSelectedCatalog(newCatalog);

        if (onApplyFilter) {
            onApplyFilter({
                catalog: newCatalog,
                from: '',
                to: ''
            });
        }
    };

    const handleApply = () => {
        if (!selectedCatalog || !fromPeriod || !toPeriod) {
            alert('Preencha Catálogo, De e Para antes de filtrar.');
            return;
        }

        if (fromPeriod > toPeriod) {
            alert('Período inválido: "De" deve ser anterior ou igual a "Para".');
            return;
        }

        if (onApplyFilter) {
            onApplyFilter({
                catalog: selectedCatalog,
                from: fromPeriod,
                to: toPeriod
            });
        }
    };

    return (
        <div className="dashboard-filter-bar">

            {/* Input "De" */}
            <div className="filter-input-group">
                <label htmlFor="date-from">De</label>
                <div className="input-with-icon">
                    <input
                        type="month"
                        id="date-from"
                        value={fromPeriod}
                        onChange={e => setFromPeriod(e.target.value)}
                    />
                </div>
            </div>

            {/* Input "Para" */}
            <div className="filter-input-group">
                <label htmlFor="date-to">Para</label>
                <div className="input-with-icon">
                    <input
                        type="month"
                        id="date-to"
                        value={toPeriod}
                        onChange={e => setToPeriod(e.target.value)}
                    />
                </div>
            </div>

            {/* Select "Catálogo" */}
            <div className="filter-input-group">
                <label htmlFor="catalog">Catálogo</label>
                <div className="input-with-icon select-container">

                    <select
                        id="catalog"
                        value={selectedCatalog}
                        onChange={e => handleCatalogChange(e.target.value)}
                    >
                        <option value="" disabled>Geral</option>
                        <option value="atendimentos">Atendimentos</option>
                        <option value="contas">Contas</option>
                        <option value="notas">Notas Fiscais</option>
                    </select>

                    <span className="select-arrow" aria-hidden="true">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1 1L7 7L13 1"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                </div>
            </div>

            {/* Botão Filtrar */}
            <button
                className="filter-button button-dark-solid"
                onClick={handleApply}
            >
                Filtrar
            </button>
        </div>
    );
};

export default DashboardFilter;
