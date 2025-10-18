import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import '../../index.css';

// itens de navegação (use paths consistentes com o roteamento)
const navItems = [
    { name: 'Visão Geral', iconPath: 'src/assets/svg/visao-geral.svg', path: '/VisaoGeral', iconClass: 'icon_vg' },
    { name: 'Dashboard', iconPath: 'src/assets/svg/dash.svg', path: '/Dashboard', iconClass: 'icon_dash' },
    { name: 'Painel', iconPath: 'src/assets/svg/painel.svg', path: '/Painel', iconClass: 'icon_painel', adminOnly: true },
    { name: 'Gestão de Clientes', iconPath: 'src/assets/svg/funcionario.svg', path: '/Clientes', iconClass: 'icon_funcionario' },
    { name: 'Agenda & Relacionamento', iconPath: 'src/assets/svg/agenda.svg', path: '/Agenda', iconClass: 'icon_agenda' },
    { name: 'Gestão de Despesas', iconPath: 'src/assets/svg/despezas.svg', path: '/GestaoDespesas', iconClass: 'icon_notas' },
    { name: 'Gestão de Notas Fiscais', iconPath: 'src/assets/svg/notas_fiscais.svg', path: '/NotasFiscais', iconClass: 'icon_notas' },
    { name: 'Gestão de Logs', iconPath: 'src/assets/svg/logs.svg', path: '/logs', iconClass: 'icon_logs', adminOnly: true },
];

const Sidebar = () => {
    const userName = sessionStorage.getItem('userName') || 'Usuário';

        // lê isAdmin salvo no login (sessionStorage) e normaliza para boolean
    const [isAdmin, setIsAdmin] = useState(() => {
        const raw = sessionStorage.getItem('isAdmin');
        console.log('[Sidebar] isAdmin (init raw):', raw);
        return raw === 'true' || raw === '1';
    });

    const [activeFile, setActiveFile] = useState('');


    // Normaliza e protege isAdmin para evitar ReferenceError em runtime
    const adminFlag = typeof isAdmin !== 'undefined' && (isAdmin === true || isAdmin === 'true' || isAdmin === '1');



    useEffect(() => {
        console.log('[Sidebar] mounted - userName:', userName, 'isAdmin:', isAdmin);

        const onStorage = (e) => {
            if (e.key === 'isAdmin') {
                const newVal = e.newValue === 'true' || e.newValue === '1';
                console.log('[Sidebar] storage event isAdmin:', e.newValue, '->', newVal);
                setIsAdmin(newVal);
            }
            if (e.key === 'userName') {
                console.log('[Sidebar] storage event userName:', e.newValue);
            }
        };
        window.addEventListener('storage', onStorage);

        // determina rota ativa a partir do pathname e normaliza
        const currentPath = (window.location.pathname || '/').toLowerCase();
        // se estiver na raiz, assumimos visão geral
        const normalized = currentPath === '/' || currentPath === '' ? '/visao-geral' : currentPath;
        // pega apenas o primeiro segmento relevante para comparação (ex: /clientes/123 -> clientes)
        const firstSegment = normalized.split('/').filter(Boolean)[0] || 'visao-geral';
        setActiveFile(firstSegment);

        return () => {
            window.removeEventListener('storage', onStorage);
            console.log('[Sidebar] unmounted');
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getIconSrc = (originalPath, linkPath) => {
        const linkClean = (linkPath || '').replace('/', '').toLowerCase();
        if (activeFile && linkClean.includes(activeFile.toLowerCase())) {
            return originalPath.replace('.svg', '_black.svg');
        }
        return originalPath;
    };

    const isLinkActive = (linkPath) => {
        const linkClean = (linkPath || '').replace('/', '').toLowerCase();
        return activeFile.toLowerCase() === linkClean;
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <img src="src/assets/svg/logo_vectorized.svg" alt="Logo Veredictum" />
                    <span className="menu-text-logo">Veredictum</span>
                </div>
                    <div className="user-info">
                        <span className="user-name">{userName}</span>
                        {/* {adminFlag && <span className="user-role badge-admin">Administrador</span>} */}
                    </div>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {navItems
                        .filter(item => !item.adminOnly || adminFlag)
                        .map((item) => {
                            const active = isLinkActive(item.path);
                            return (
                                <li key={item.name}>
                                    <a href={item.path} className={active ? 'active' : ''}>
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
                <a href="/home">
                    <img src="src/assets/svg/exit.svg" className="icon_exit" alt="Sair" />
                    <span className="menu-text">Sair</span>
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;