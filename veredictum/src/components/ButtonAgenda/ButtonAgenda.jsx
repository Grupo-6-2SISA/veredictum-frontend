import React from 'react';
import './ButtonAgenda.css'; // O CSS para o estilo do botão
import AddPlusIcon from '../../assets/svg/Add_Plus_Square.svg';

const ButtonAgenda = ({ onClick, text = "Novo Agendamento"}) => {
    return (
        <button className="new-appointment-button-agenda" onClick={onClick}>
             {text}
            <img src={AddPlusIcon} alt="Adicionar" className="plus-icon-agenda" />
        </button>
    );
};

export default ButtonAgenda;