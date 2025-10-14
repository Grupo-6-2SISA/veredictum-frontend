// src/components/Sidebar/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import './Sidebar.css';

// Dados para a navegação
const navItems = [
    { name: 'Visão Geral', iconPath: 'src/assets/svg/visao-geral.svg', path: './visao_geral.html', iconClass: 'icon_vg' },
    { name: 'Dashboard', iconPath: 'src/assets/svg/dash.svg', path: 'src/dashboard.html', iconClass: 'icon_dash' },
    { name: 'Painel', iconPath: 'src/assets/svg/painel.svg', path: 'src/painel_controle.html', iconClass: 'icon_painel' },
    { name: 'Gestão de Clientes', iconPath: 'src/assets/svg/funcionario.svg', path: 'src/clientes.html', iconClass: 'icon_funcionario' },
    { name: 'Agenda & Relacionamento', iconPath: 'src/assets/svg/agenda.svg', path: 'src/agenda_relacionamento.html', iconClass: 'icon_agenda' },
    { name: 'Gestão de Despesas', iconPath: 'src/assets/svg/despezas.svg', path: 'src/gestao_dispesas.html', iconClass: 'icon_notas' },
    { name: 'Gestão de Notas Fiscais', iconPath: 'src/assets/svg/notas_fiscais.svg', path: 'src/notas-fiscais.html', iconClass: 'icon_notas' },
    { name: 'Gestão de Logs', iconPath: 'src/assets/svg/logs.svg', path: 'src/log_envio_email.html', iconClass: 'icon_logs' },
];

const Sidebar = () => {
    const userName = sessionStorage.getItem("userName") || "Usuário";

    
    // 1. O estado irá armazenar o nome do arquivo ativo (ex: 'visao_geral.html')
    const [activeFile, setActiveFile] = useState('');

    // 2. Lógica useEffect (substitui o DOMContentLoaded)
    useEffect(() => {
        // Obtém o nome do arquivo da URL atual (corresponde à sua lógica JS)
        const currentPath = window.location.pathname;
        const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'visao_geral.html'; // Fallback para a página inicial
        setActiveFile(currentFile);
    }, []); // Executa apenas uma vez ao montar o componente

    // 3. Função para obter o caminho do ícone (aplica a lógica de _black.svg)
    const getIconSrc = (originalPath, linkPath) => {
        const linkFile = linkPath.substring(linkPath.lastIndexOf('/') + 1);
        
        // Verifica se o link é o ativo
        if (linkFile === activeFile) {
            // Se for ativo, troca o .svg por _black.svg
            return originalPath.replace('.svg', '_black.svg');
        }
        return originalPath;
    };
    
    // 4. Função para verificar se o link está ativo
    const isLinkActive = (linkPath) => {
        const linkFile = linkPath.substring(linkPath.lastIndexOf('/') + 1);
        return linkFile === activeFile;
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <img src="src/assets/svg/logo_vectorized.svg" alt="Logo Veredictum" />
                    <span className="menu-text-logo">Veredictum</span>
                </div>
                <span className="user-name">{userName}</span>
            </div>
            
            <nav className="sidebar-nav">
                <ul>
                    {navItems.map((item) => {
                        const active = isLinkActive(item.path);
                        
                        return (
                            <li key={item.name}>
                                <a 
                                    href={item.path} 
                                    className={active ? 'active' : ''}
                                >
                                    {/* Usa a função getIconSrc para definir o caminho correto do ícone */}
                                    <img 
                                        src={getIconSrc(item.iconPath, item.path)} 
                                        className={item.iconClass} 
                                        alt={item.name} 
                                    />
                                    {/* Aplica menu-text-active ou menu-text baseado no estado */}
                                    <span className={active ? 'menu-text-active' : 'menu-text'}>
                                        {item.name}
                                    </span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            
            <div className="sidebar-footer">
                <a href="/Home.jsx">
                    <img src="src/assets/svg/exit.svg" className="icon_exit" alt="" />
                </a>
                <span className="menu-text">Sair</span> 
            </div>
        </aside>
    );
};

export default Sidebar;