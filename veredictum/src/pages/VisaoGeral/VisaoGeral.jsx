// src/pages/VisaoGeral/VisaoGeral.jsx
import React from 'react';
// A importação do Sidebar agora deve funcionar, pois vamos criá-lo.
import Sidebar from '../../components/Sidebar/Sidebar'; 
import './VisaoGeral.css';

const VisaoGeral = () => {
    return (
        // O elemento principal precisa da classe 'container' para o layout do sidebar.
        <div className="container"> 
            {/* Passando o nome completo, conforme seu HTML */}
            <Sidebar nomeCompleto="Lismara Ribeiro" /> 
            
            <main className="main-content">
                <h1>Visão Geral</h1>
                {/* O restante do conteúdo principal estará vazio por enquanto */}
                <p>Conteúdo da Visão Geral será adicionado aqui.</p>
            </main>
        </div>
    );
};

export default VisaoGeral;