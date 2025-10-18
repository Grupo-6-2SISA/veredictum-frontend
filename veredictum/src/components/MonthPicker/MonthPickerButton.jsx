import React, { useState } from 'react';
import MonthPicker from './MonthPicker'; // Mantém o caminho relativo (estão na mesma pasta)
import './MonthPicker.css';
import '../../index.css';

const MONTH_NAMES = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 
    'Maio', 'Junho', 'Julho', 'Agosto', 
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

/**
 * Componente que exibe o botão do mês e gerencia o MonthPicker.
 * @param {function(Date)} onMonthChange - Callback chamada quando um novo mês é confirmado.
 */
const MonthPickerButton = ({ onMonthChange }) => {
    // Estado para controlar a visibilidade do pop-up
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    
    // Estado para armazenar o mês e ano atualmente selecionados
    const [selectedDate, setSelectedDate] = useState(new Date());

    const currentDisplay = `${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getFullYear()} ▾`;

    // Função para confirmar a seleção do mês
    const handleConfirm = (date) => {
        setSelectedDate(date);
        setIsPickerVisible(false);
        // Notifica o componente pai (Agenda) sobre a mudança de mês
        if (onMonthChange) {
            onMonthChange(date);
        }
    };

    // Função para cancelar a seleção
    const handleCancel = () => {
        setIsPickerVisible(false);
    };

    // Função para abrir o seletor
    const handleButtonClick = () => {
        setIsPickerVisible(true);
    };

    return (
        <div className="month-selector-wrapper">
            <button 
                className="month-button"
                onClick={handleButtonClick}
            >
                {currentDisplay}
            </button>
            
            <MonthPicker
                isVisible={isPickerVisible}
                // Garante que o MonthPicker sempre abra na data atualmente selecionada
                initialDate={selectedDate} 
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default MonthPickerButton;