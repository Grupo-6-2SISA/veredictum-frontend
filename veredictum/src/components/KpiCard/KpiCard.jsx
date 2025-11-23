import React from 'react';
import './KpiCard.css';

const KpiCard = ({ label, value, change, status, tooltipTitle, tooltipText }) => {
    const isSkeleton = !value && !change;
    const displayValue = value || '00';
    const displayChange = change || '0%';

    const matchPercent = label ? label.match(/\s*(\(\s*\d{1,3}%\s*\))/) : null;
    const displayPercent = matchPercent ? matchPercent[1] : '';
    const cleanLabel = label ? label.replace(/\s*(\(\s*\d{1,3}%\s*\))/, '').trim() : '';

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
        } else if (changeNumber < 0) {
            changeClass = 'change-negative';
            changeIcon = '▼';
        }
    } else {
        if (change && String(change).includes('+')) {
            changeClass = 'change-positive';
            changeIcon = '▲';
        } else if (change && String(change).includes('-')) {
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
                    <div className={valueClass}>
                        {displayValue}
                        <span className="percent">{displayPercent}</span>
                    </div>
                </div>

                {!isSkeleton && tooltipText && (
                    <div className="kpi-tooltip">
                        <h4 className="tooltip-title">{tooltipTitle || cleanLabel}</h4>
                        <p className="tooltip-text">{tooltipText}</p>
                    </div>
                )}

                <div className={changeWrapperClass}>
                    {!isSkeleton && (
                        <>
                            {changeIcon && <span className={`change-icon ${changeClass}`}>{changeIcon}</span>}
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