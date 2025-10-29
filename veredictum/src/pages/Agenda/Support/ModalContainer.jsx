import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './ModalContainer.css';
import CloseIcon from '../../../assets/svg/close.svg';

/**
 * ModalContainer simples (backdrop + foco + ESC + bloqueio scroll)
 * Usa classes CSS com sufixo _L-agenda.
 */
export default function ModalContainer({
    show,
    onClose,
    title,
    children,
    modalId = 'modal-container',
    variant = 'default'
}) {
    const ref = useRef(null);
    const titleId = `${modalId}-title`;
    // Verifica se é o variant 'delete' para o novo estilo
    const isDeleteVariant = variant === 'delete'; 

    useEffect(() => {
        // ... (lógica de show, ESC, foco e overflow permanece a mesma)
        if (!show) return;

        const prevOverflow = document.body.style.overflow || '';
        document.body.style.overflow = 'hidden';

        const handleKey = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        window.addEventListener('keydown', handleKey);

        // Foco no container
        setTimeout(() => {
            try { ref.current?.focus?.(); } catch {}
        }, 0);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', handleKey);
        };
    }, [show, onClose]);

    if (!show) return null;

    const containerClass = `modal_L-agenda ${isDeleteVariant ? 'modal_L-delete' : ''}`;
    // O corpo do modal delete também tem o novo título
    const bodyClass = isDeleteVariant ? 'modal-body_L-agenda-delete' : 'modal-body_L-agenda';

    return (
        <>
            <div
                className={`modal-backdrop_L-${variant}`}
                onClick={onClose}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClose?.(); }}
                aria-hidden="true"
            />
            <div
                id={modalId}
                className={containerClass}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                ref={ref}
                onClick={(e) => e.stopPropagation()}
            >
                
                {/* * 1. Header Condicional: 
                * O header padrão é removido para o variant 'delete' 
                */}
                {!isDeleteVariant && (
                    <div className="modal-header_L-agenda">
                        <h2 id={titleId}>{title}</h2>
                        <button
                            type="button"
                            className="modal-close-btn_L-agenda"
                            onClick={onClose}
                            aria-label="Fechar"
                        >
                            <img src={CloseIcon} alt="Fechar" />
                        </button>
                    </div>
                )}
                
                {/* 2. Conteúdo do Modal (Body) */}
                <div className={bodyClass}>
                    {/* 3. Título específico para o variant 'delete' - Ficará no BODY */}
                    {isDeleteVariant && <h2 id={titleId} className="modal-delete-title">{title}</h2>}
                    {children}
                </div>
                
                {/* * 4. Botão de fechar específico para o variant 'delete' - 
                * Posição absoluta após o body
                */}
                {isDeleteVariant && (
                    <button
                        type="button"
                        className="btn-delete-close-ios"
                        onClick={onClose}
                        aria-label="Fechar"
                    >
                        {/* Como a imagem usa um X simples, vamos usar o mesmo CloseIcon */}
                        <img src={CloseIcon} alt="Fechar" />
                    </button>
                )}
            </div>
        </>
    );
}

ModalContainer.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node,
    modalId: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'add', 'edit', 'view', 'delete'])
};