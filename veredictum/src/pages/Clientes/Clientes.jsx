import React, { useState, useEffect, useRef } from 'react';
import './Clientes.css';

// componentes (caminhos ajustados para os arquivos reais)
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import btnIcon from '../../assets/svg/btn.svg';
import editIcon from '../../assets/svg/edit.svg';
import Toggle from '../../components/Toggle/Toggle_G.jsx';
import Modal from '../../components/Modal/Modal_G.jsx';
import Button from '../../components/Button/Button_G.jsx';
import Listagem from '../../components/Listagem/Listagem.jsx';
import Card from '../../components/Card/Card_G.jsx';
import '../../index.css';

import { getClientes, createCliente, updateCliente, activateCliente, deactivateCliente } from './Clientes.js';

const DEACTIVATION_ANIMATION_MS = 1000;


const CLIENT_FORM_COLUMNS = (clientList = []) => {
    const columns = [
        [
            { name: 'nome', label: 'Nome', type: 'text', required: true },
            { name: 'dataNascimento', label: 'Data de Nascimento', type: 'date' },
            { name: 'email', label: 'E-mail', type: 'email', required: true },
            { name: 'rg', label: 'RG', type: 'text', required: true },
            { name: 'cpf', label: 'CPF', type: 'text' },
        ],
        [
            { name: 'cnpj', label: 'CNPJ', type: 'text' },
            { name: 'telefone', label: 'Telefone', type: 'text', required: true, placeholder: '+5511999999999' },
            { name: 'cep', label: 'CEP', type: 'text', required: true },
            { name: 'logradouro', label: 'Logradouro', type: 'text', required: true },
            { name: 'bairro', label: 'Bairro', type: 'text', required: true },
        ],
        [
            { name: 'complemento', label: 'Complemento', type: 'text' },
            { name: 'localidade', label: 'Localidade', type: 'text' },
            { name: 'numero', label: 'Número', type: 'text', required: true },
            { name: 'inscricaoEstadual', label: 'Inscrição Estadual', type: 'text' },
            {
                name: 'isProBono',
                label: 'Pro-Bono?',
                type: 'select',
                defaultValue: 'false',
                options: [
                    { value: 'false', label: 'Não' },
                    { value: 'true', label: 'Sim' },
                ],
            },
        ],
        [
            {
                name: 'isAtivo',
                label: 'Status',
                type: 'select',
                defaultValue: 'true',
                options: [
                    { value: 'true', label: 'Ativo' },
                    { value: 'false', label: 'Inativo' },
                ],
            },
            { name: 'dataInicio', label: 'Data Início', type: 'date', required: true },
            {
                name: 'fkIndicador',
                label: 'Indicação',
                type: 'select',
                defaultValue: '',
                options: [
                    { value: '', label: 'Nenhuma' },
                    ...clientList.map(client => ({ value: client.idCliente, label: client.nome })),
                ],
            },
            {
                name: 'descricao',
                label: 'Descrição',
                type: 'textarea',
                placeholder: 'Detalhes do cliente...',
            },
        ],
    ];

    return columns;
};



const getFieldValue = (clientData, field) => {
    if (!clientData) return field.defaultValue ?? '';
    if (field.name === 'isProBono') return String(clientData.isProBono);
    if (field.name === 'isAtivo') return String(clientData.isAtivo); 
    if (field.name === 'fkIndicador') return clientData.fkIndicador ?? '';
    
    const value = clientData[field.name];
    
    if (field.type === 'date' && value) {
        return value.split('T')[0];
    }
    
    return value ?? field.defaultValue ?? '';
};

const renderFormColumns = (mode, clientData, clientList) => (
    CLIENT_FORM_COLUMNS(clientList).map((column, columnIndex) => (
        <div className="form-column" key={`column-${columnIndex}`}>
            {column.map((field) => {
                const baseProps = {
                    id: field.name,
                    name: field.name,
                    required: field.required,
                    disabled: mode === 'view',
                    placeholder: field.placeholder || '',
                };
                const defaultValue = getFieldValue(clientData, field);
                if (field.type === 'select') {
                    return (
                        <div className="form-group-client" key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <select {...baseProps} defaultValue={defaultValue}>
                                {field.options?.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    );
                }
                if (field.type === 'textarea') {
                    return (
                        <div className="form-group-client" key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <textarea {...baseProps} defaultValue={defaultValue} />
                        </div>
                    );
                }
                return (
                    <div className="form-group-client" key={field.name}>
                        <label htmlFor={field.name}>{field.label}</label>
                        <input {...baseProps} type={field.type} defaultValue={defaultValue} />
                    </div>
                );
            })}
        </div>
    ))
);

const TABLE_COLUMNS = [
    { key: 'nome', titulo: 'Nome', className: 'col-name' },
    { key: 'editar', titulo: 'Editar', className: 'col-edit' },
    { key: 'informacoes', titulo: 'Informações', className: 'col-info' },
    { key: 'status', titulo: 'Status', className: 'col-status' },
];

function Clientes() {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deactivatingClients, setDeactivatingClients] = useState([]);
    const deactivationTimersRef = useRef(new Map());

    const fetchClients = async () => {
        try {
            const response = await getClientes();
            setClients(response.data || []);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            setClients([]);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    useEffect(() => () => {
        deactivationTimersRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
        deactivationTimersRef.current.clear();
    }, []);

    const tableData = clients.map((client) => {
    const isDeactivating = deactivatingClients.includes(client.idCliente);

        return ({
            nome: (
                <div
                    className={`client-list-name ${isDeactivating ? 'client-list-name--deactivating' : ''}`.trim()}
                    data-client-id={client.idCliente}
                    data-row-state={isDeactivating ? 'deactivating' : 'stable'}
                >
                    <p>{client.nome}</p>
                </div>
            ),
            editar: (
                <Button className="btn-icon-only" type="button" onClick={() => handleOpenEdit(client)} aria-label={`Editar ${client.nome}`}>
                    <img src={editIcon} alt="Editar" />
                </Button>
            ),
            informacoes: (
                <Button className="btn-link" type="button" onClick={() => handleOpenView(client)}>Ver mais</Button>
            ),
            status: (
                <Toggle
                    label=""
                    checked={isDeactivating ? false : client.isAtivo}
                    onChange={() => handleToggleStatus(client)}
                    id={`toggle-status-${client.idCliente}`}
                    name={`toggle-status-${client.idCliente}`}
                    disabled={isDeactivating}
                />
            ),
        });
    });

    function handleOpenAdd() { setIsAddOpen(true); }
    function handleCloseAdd() { setIsAddOpen(false); }
    function handleOpenEdit(client) { setSelectedClient(client); setIsEditOpen(true); }
    function handleCloseEdit() { setIsEditOpen(false); setSelectedClient(null); }
    function handleOpenView(client) { setSelectedClient(client); setIsViewOpen(true); }
    function handleCloseView() { setIsViewOpen(false); setSelectedClient(null); }
    function handleOpenDelete(client) { setSelectedClient(client); setIsDeleteOpen(true); }
    function handleCloseDelete() { setIsDeleteOpen(false); setSelectedClient(null); }

    async function handleToggleStatus(client) {
        try {
            if (!client.isAtivo) {
                const pendingTimer = deactivationTimersRef.current.get(client.idCliente);
                if (pendingTimer) {
                    clearTimeout(pendingTimer);
                    deactivationTimersRef.current.delete(client.idCliente);
                }
                await activateCliente(client.idCliente);
                await fetchClients();
                setDeactivatingClients((prev) => prev.filter((id) => id !== client.idCliente));
            } else {
                handleOpenDelete(client);
            }
        } catch (error) {
            console.error("Erro ao alterar status do cliente:", error);
        }
    }

    async function handleConfirmDelete() {
        if (selectedClient) {
            const clientId = selectedClient.idCliente;
            setDeactivatingClients((prev) => (
                prev.includes(clientId) ? prev : [...prev, clientId]
            ));

            const existingTimer = deactivationTimersRef.current.get(clientId);
            if (existingTimer) {
                clearTimeout(existingTimer);
                deactivationTimersRef.current.delete(clientId);
            }

            const timeoutId = setTimeout(async () => {
                try {
                    await deactivateCliente(clientId);
                    await fetchClients();
                } catch (error) {
                    console.error("Erro ao desativar cliente:", error);
                    window.alert?.("Não foi possível desativar o cliente. Tente novamente.");
                } finally {
                    setDeactivatingClients((prev) => prev.filter((id) => id !== clientId));
                    deactivationTimersRef.current.delete(clientId);
                }
            }, DEACTIVATION_ANIMATION_MS);

            deactivationTimersRef.current.set(clientId, timeoutId);
        }
        handleCloseDelete();
    }

    
    const getClientDataFromForm = (formData) => {
        const fkIndicadorValue = formData.get('fkIndicador');

        const rawCpf = formData.get('cpf') || '';
        const sanitizedCpf = rawCpf.replace(/\D/g, '');
        if (sanitizedCpf.length > 11) {
            throw new Error('O CPF deve ter no máximo 11 dígitos.');
        }

        const rawInscricao = formData.get('inscricaoEstadual') || '';
        const sanitizedInscricao = rawInscricao.replace(/\D/g, '');
        if (sanitizedInscricao.length > 0 && sanitizedInscricao.length !== 9) {
            throw new Error('A inscrição estadual deve ter exatamente 9 dígitos.');
        }

        const data = {
            nome: formData.get('nome'),
            email: formData.get('email'),
            rg: formData.get('rg'),
            cpf: sanitizedCpf || null,
            cnpj: formData.get('cnpj') || null,
            telefone: formData.get('telefone'),
            dataNascimento: formData.get('dataNascimento') || null,
            dataInicio: formData.get('dataInicio') || null,
            cep: formData.get('cep'),
            logradouro: formData.get('logradouro'),
            bairro: formData.get('bairro'),
            localidade: formData.get('localidade'),
            numero: formData.get('numero'),
            complemento: formData.get('complemento'),
            descricao: formData.get('descricao'),
            inscricaoEstadual: sanitizedInscricao || null,
            isProBono: formData.get('isProBono') === 'true',
            isJuridico: !!formData.get('cnpj'),
            fkIndicador: fkIndicadorValue ? parseInt(fkIndicadorValue, 10) : null,
        };

        
        const isAtivoValue = formData.get('isAtivo');
        if (isAtivoValue !== null) {
            data.isAtivo = isAtivoValue === 'true';
        } else if (typeof data.isAtivo === 'undefined') {
            data.isAtivo = true;
        }

        return data;
    };


    async function handleSubmitAdd(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let newClient;

        try {
            newClient = getClientDataFromForm(formData);
        } catch (validationError) {
            window.alert(validationError.message);
            return;
        }
        
        try {
            await createCliente(newClient);
            fetchClients();
            handleCloseAdd();
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error.response?.data || error);
        }
    }

    async function handleSubmitEdit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const updatedData = {
            ...selectedClient,
        };
        
        try {
            Object.assign(updatedData, getClientDataFromForm(formData));
        } catch (validationError) {
            window.alert(validationError.message);
            return;
        }
        
        try {
            await updateCliente(selectedClient.idCliente, updatedData);
            fetchClients();
            handleCloseEdit();
        } catch (error) {
            console.error("Erro ao editar cliente:", error.response?.data || error);
        }
    }

    return (
        <div className="container clientes-page">
            <Sidebar />
            <main className="main-content clientes-main">
                <div className="header-top">
                    <div className="head-description">
                        <h1>Gestão de Clientes</h1>
                        <p className="description">Acesse, altere e mantenha as informações dos clientes<br /> sempre atualizadas.</p>
                    </div>
                    <Button className="btn-new-appointment" onClick={handleOpenAdd}>
                        Cadastrar Cliente
                        <img src={btnIcon} alt="Cadastrar novo cliente" />
                    </Button>
                </div>
                <section className="client-management-section">
                    <Card className="client-table-card" variant="clientes" headerContent={null}>
                        {clients.length > 0 ? (
                            <Listagem dados={tableData} colunas={TABLE_COLUMNS} variant="clientes" />
                        ) : (
                            <p className="listagem-vazia">Nenhum cliente cadastrado.</p>
                        )}
                    </Card>
                </section>

              
                <Modal
                    isOpen={isAddOpen}
                    variant="add"
                    title="Cadastrar Clientes"
                    onClose={handleCloseAdd}
                    modalId="new-appointment-modal-add-client"
                    formProps={{ id: 'formCadastrarCliente', onSubmit: handleSubmitAdd, className: 'appointment-form' }}
                    footer={(
                        <div className="form-footer-client">
                            <Button className="btn-new-appointment" type="submit">Cadastrar</Button>
                        </div>
                    )}>
                    <div className="form-row form-grid">{renderFormColumns('add', null, clients)}</div>
                </Modal>

                
                <Modal
                    isOpen={isEditOpen && Boolean(selectedClient)}
                    variant="edit"
                    title="Editar Clientes"
                    onClose={handleCloseEdit}
                    modalId="new-appointment-modal-edit-client"
                    formProps={{ id: 'formEditarCliente', onSubmit: handleSubmitEdit, className: 'appointment-form' }}
                    footer={(
                        <div className="form-footer-client">
                            <Button className="btn-new-appointment" type="submit">Salvar Alterações</Button>
                        </div>
                    )}>
                    <div className="form-row form-grid">{selectedClient && renderFormColumns('edit', selectedClient, clients)}</div>
                </Modal>

              
                <Modal
                    isOpen={isViewOpen && Boolean(selectedClient)}
                    variant="view"
                    title="Informações sobre o Cliente"
                    onClose={handleCloseView}
                    modalId="new-appointment-modal-view-client">
                    <form action="" className="appointment-form">
                        <div className="form-row form-grid">{selectedClient && renderFormColumns('view', selectedClient, clients)}</div>
                    </form>
                </Modal>
                
                <Modal
                    isOpen={isDeleteOpen && Boolean(selectedClient)}
                    variant="delete"
                    title="Desativar Cliente"
                    onClose={handleCloseDelete}
                    modalId="modal-delete-schedule"
                    footer={(
                        <>
                            <Button className="btn-cancel-delete" onClick={handleCloseDelete}>Não</Button>
                            <Button className="btn-confirm-delete" onClick={handleConfirmDelete}>Sim</Button>
                        </>
                    )}>
                    <p>Deseja desativar <span className="client-name">{selectedClient?.nome}</span>?</p>
                </Modal>
            </main>
        </div>
    );
}

export default Clientes;