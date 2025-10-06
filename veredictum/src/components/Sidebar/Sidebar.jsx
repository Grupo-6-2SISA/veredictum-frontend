import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import '../../index.css';


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
    const userName = "Lismara Ribeiro";
    
    const [activeFile, setActiveFile] = useState('');

    useEffect(() => {
        const currentPath = window.location.pathname;
        let currentFile = '';

        const pathSegments = currentPath.split('/');
        const lastSegment = pathSegments[pathSegments.length - 1];
        
        if (!lastSegment || lastSegment === 'index.html' || lastSegment === 'index.html') {
            currentFile = 'visao_geral.html'; 
        } else {
            currentFile = lastSegment;
        }

        setActiveFile(currentFile);
    }, []); 

    const getIconSrc = (originalPath, linkPath) => {
        const linkFile = linkPath.substring(linkPath.lastIndexOf('/') + 1);
        
        if (linkFile === activeFile) {
            return originalPath.replace('.svg', '_black.svg');
        }
        return originalPath;
    };
    
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
                                    <img 
                                        src={getIconSrc(item.iconPath, item.path)} 
                                        className={item.iconClass} 
                                        alt={item.name} 
                                    />
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
                    <img src="src/assets/svg/exit.svg" className="icon_exit" alt="Sair" />
                     <span className="menu-text">Sair</span> 
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;