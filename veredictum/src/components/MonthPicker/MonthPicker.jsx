import React, { useState, useMemo, useCallback, useEffect } from 'react';
import './MonthPicker.css';
import '../../index.css';
// Importe o seu arquivo CSS. Se ele estiver no mesmo diretório, use:
// import './MonthPicker.css'; 

const MONTH_NAMES = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 
    'Maio', 'Junho', 'Julho', 'Agosto', 
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

/**
 * Componente Seletor de Mês e Ano.
 * @param {object} props
 * @param {boolean} props.isVisible - Controla a visibilidade do pop-up.
 * @param {Date} props.initialDate - Data inicial para a seleção (opcional).
 * @param {function(Date)} props.onConfirm - Função chamada ao clicar em 'OK' com a data selecionada.
 * @param {function} props.onCancel - Função chamada ao clicar em 'Cancelar'.
 */
const MonthPicker = ({ isVisible, initialDate = new Date(), onConfirm, onCancel }) => {
    // Estado para o mês e ano exibidos no cabeçalho do pop-up
    const [viewDate, setViewDate] = useState(initialDate);
    
    // Estado para o mês e ano SELECIONADOS pelo usuário
    const [selectedDate, setSelectedDate] = useState(initialDate);

    // Mês/Ano atuais exibidos no cabeçalho
    const currentMonthDisplay = useMemo(() => {
        return `${MONTH_NAMES[viewDate.getMonth()]} ${viewDate.getFullYear()}`;
    }, [viewDate]);

    // Função para renderizar os 12 botões de mês
    const renderMonthButtons = useMemo(() => {
        const buttons = [];
        const currentYear = viewDate.getFullYear();
        
        for (let i = 0; i < 12; i++) {
            const isSelected = (
                i === selectedDate.getMonth() && 
                currentYear === selectedDate.getFullYear()
            );

            const handleMonthSelect = () => {
                // Atualiza a data selecionada, mantendo o ano atual de visualização
                setSelectedDate(new Date(currentYear, i, 1));
            };

            buttons.push(
                <button 
                    key={i} 
                    className={isSelected ? 'selected' : ''}
                    onClick={handleMonthSelect}
                    type="button"
                >
                    {MONTH_NAMES[i].substring(0, 3)}
                </button>
            );
        }
        return buttons;
    }, [viewDate, selectedDate]);


    // Funções de navegação do ano
    const changeYear = useCallback((offset) => {
        setViewDate(prevDate => {
            const newYear = prevDate.getFullYear() + offset;
            // Cria uma nova data, garantindo que o mês não mude (ex: de 29 de Fev)
            return new Date(newYear, prevDate.getMonth(), 1);
        });
    }, []);

    const prevYear = () => changeYear(-1);
    const nextYear = () => changeYear(1);

    // Handlers para as ações OK/Cancelar
    const handleOk = () => {
        if (onConfirm) {
            onConfirm(selectedDate);
        }
    };

    const handleCancel = () => {
        // Ao cancelar, reseta o estado de visualização e seleção para o valor inicial
        setViewDate(initialDate);
        setSelectedDate(initialDate);
        if (onCancel) {
            onCancel();
        }
    };
    
    // O useEffect garante que o pop-up volte para a data inicial quando for aberto (se necessário)
    useEffect(() => {
        if (isVisible) {
            setViewDate(initialDate);
            setSelectedDate(initialDate);
        }
    }, [isVisible, initialDate]);


    return (
        <div id="month-picker" className={`month-picker-popup ${!isVisible ? 'hidden' : ''}`}>
            <div className="month-header">
                <button id="prev-month" onClick={prevYear} type="button">&lt;</button>
                <div id="current-month-display">{currentMonthDisplay}</div>
                <button id="next-month" onClick={nextYear} type="button">&gt;</button>
            </div>
            
            <div className="month-buttons">
                {renderMonthButtons}
            </div>
            
            <div className="calendar-actions">
                <button id="cancel-btn" onClick={handleCancel} type="button">Cancelar</button>
                <button id="ok-btn" onClick={handleOk} type="button">OK</button>
            </div>
        </div>
    );
};

export default MonthPicker;