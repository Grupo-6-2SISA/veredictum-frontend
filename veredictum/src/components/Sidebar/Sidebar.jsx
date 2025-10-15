import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import '../../index.css';

// 1. Adicione a propriedade 'adminOnly' aos itens restritos
const navItems = [
    { name: 'Visão Geral', iconPath: 'src/assets/svg/visao-geral.svg', path: './VisaoGeral', iconClass: 'icon_vg' },
    { name: 'Dashboard', iconPath: 'src/assets/svg/dash.svg', path: './Dashboard', iconClass: 'icon_dash' },
    // Item restrito a administradores
    { name: 'Painel', iconPath: 'src/assets/svg/painel.svg', path: './Painel', iconClass: 'icon_painel', adminOnly: true },
    { name: 'Gestão de Clientes', iconPath: 'src/assets/svg/funcionario.svg', path: './Clientes', iconClass: 'icon_funcionario' },
    { name: 'Agenda & Relacionamento', iconPath: 'src/assets/svg/agenda.svg', path: './Agenda', iconClass: 'icon_agenda' },
    { name: 'Gestão de Despesas', iconPath: 'src/assets/svg/despezas.svg', path: './GestaoDespesas', iconClass: 'icon_notas' },
    { name: 'Gestão de Notas Fiscais', iconPath: 'src/assets/svg/notas_fiscais.svg', path: './NotasFiscais', iconClass: 'icon_notas' },
    // Item restrito a administradores
    { name: 'Gestão de Logs', iconPath: 'src/assets/svg/logs.svg', path: './Logs', iconClass: 'icon_logs'},
];

const Sidebar = () => {
    const userName = sessionStorage.getItem("userName") || "Usuário";

    
    const [activeFile, setActiveFile] = useState('');

    useEffect(() => {
        const currentPath = window.location.pathname;
        let currentFile = '';

        const pathSegments = currentPath.split('/');
        const lastSegment = pathSegments[pathSegments.length - 1];
        
        if (!lastSegment || lastSegment === 'index.html' || lastSegment === 'index.html') {
            currentFile = 'visao_geral.html'; 
        } else {
            // Remove a extensão do arquivo se necessário (ex: Dashboard.html -> Dashboard)
            currentFile = lastSegment.includes('.') ? lastSegment.substring(0, lastSegment.lastIndexOf('.')) : lastSegment;
        }

        // Mapeia o path do navItems para o nome do arquivo para melhor comparação
        const mappedNavItems = navItems.map(item => item.path.substring(item.path.lastIndexOf('/') + 1));
        
        // Ajuste para garantir que o activeFile corresponda ao formato de path dos navItems
        let matchFound = false;
        for (const itemPath of mappedNavItems) {
            const fileName = itemPath.replace('./', '').replace('/', '');
            if (currentFile.toLowerCase().includes(fileName.toLowerCase().replace('./', '').replace('/', ''))) {
                setActiveFile(fileName);
                matchFound = true;
                break;
            }
        }
        
        if (!matchFound) {
             setActiveFile('VisaoGeral'); // Define um default se não encontrar
        }
    }, []); 

    const getIconSrc = (originalPath, linkPath) => {
        const linkFile = linkPath.substring(linkPath.lastIndexOf('/') + 1);
        
        // A comparação agora é mais robusta (compara o arquivo ativo com o link)
        if (linkFile.toLowerCase().includes(activeFile.toLowerCase())) {
            return originalPath.replace('.svg', '_black.svg');
        }
        return originalPath;
    };
    
    const isLinkActive = (linkPath) => {
        const linkFile = linkPath.substring(linkPath.lastIndexOf('/') + 1);
        return linkFile.toLowerCase().includes(activeFile.toLowerCase());
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
                    {/* 3. Filtra a lista antes de renderizar */}
                    {navItems
                        .filter(item => !item.adminOnly || isAdmin)
                        .map((item) => {
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