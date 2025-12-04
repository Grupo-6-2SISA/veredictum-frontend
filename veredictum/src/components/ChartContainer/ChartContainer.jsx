import React from 'react';
import './ChartContainer.css';
import InfoIcon from '../../assets/svg/info.svg';

const ChartContainer = ({ title, tooltipTitle, tooltipText, children }) => {
    
    const finalTooltipText = tooltipText || "Informações sobre este gráfico.";
    const finalTooltipTitle = tooltipTitle || title;

    return (
        <div className="chart-container">
            <div className="chart-header">
                <h3 className="chart-title">{title}</h3>

                <div className="info-tooltip-wrapper">
                    <img
                        src={InfoIcon}
                        alt="Informação"
                        className="info-icon"
                        style={{ width: '16px', height: '16px', display: 'block' }}
                    />

                    {finalTooltipTitle && (
                        <div className="chart-tooltip">
                            <h4>{finalTooltipTitle}</h4>
                            <p>{finalTooltipText}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="chart-content">
                {children}
            </div>
        </div>
    );
};

export default ChartContainer;
