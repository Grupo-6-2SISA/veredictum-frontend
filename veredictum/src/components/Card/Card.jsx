// src/components/Card/Card.jsx
import React from 'react';
import './Card.css'; 
// Supondo que você use uma biblioteca de ícones como react-icons
// import { FaRegCalendarAlt } from 'react-icons/fa'; 

const variantConfigs = {
    clientes: {
        inheritBaseClass: false,
        containerClasses: ['card-clientes'],
        headerClasses: ['card-clientes-header'],
        contentClasses: ['card-clientes-content'],
    },
};

const Card = ({ titulo, icone, children, className, variant, headerContent }) => {
    const variantConfig = variant ? variantConfigs[variant] : undefined;
    const shouldUseBaseClass = variantConfig?.inheritBaseClass !== false;
    const boxClassNames = shouldUseBaseClass ? ['card-box'] : [];
    const headerClassNames = ['card-header'];
    const contentClassNames = ['card-content-wrapper'];

    if (className) {
        boxClassNames.push(className);
    }

    if (variantConfig?.containerClasses) {
        boxClassNames.push(...variantConfig.containerClasses);
    }

    if (variantConfig?.headerClasses) {
        headerClassNames.push(...variantConfig.headerClasses);
    }

    if (variantConfig?.contentClasses) {
        contentClassNames.push(...variantConfig.contentClasses);
    }

    const renderHeaderContent = () => {
        if (headerContent !== undefined) {
            return headerContent;
        }

        return (
            <>
                {icone ? <span className="card-icon">{icone}</span> : null}
                {titulo ? <h2>{titulo}</h2> : null}
            </>
        );
    };

    return (
        <div
            className={boxClassNames.join(' ')}
            data-variant={variant}
        >
            <div className={headerClassNames.join(' ')}>
                {renderHeaderContent()}
            </div>
            <div className={contentClassNames.join(' ')}>
                {children}
            </div>
        </div>
    );
};

export default Card;