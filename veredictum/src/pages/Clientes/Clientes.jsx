import React, { useState } from 'react';
import './Clientes.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import btnIcon from '../../assets/svg/btn.svg';
import editIcon from '../../assets/svg/edit.svg';
import Toggle from '../../components/Toggle/Toggle';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import Listagem from '../../components/Listagem/Listagem';
import Card from '../../components/Card/Card';
import '../../components/Css/Main.css';

const initialClients = [
    {
        id: 1,
        nome: 'Manu Monteiro',
        dataNascimento: '1992-04-04',
        email: 'gabriel@example.com',
        rg: '987654301',
        cpf: '987.654.323-00',
        cnpj: '',
        telefone: '11 88888-8887',
        cep: '10000-000',
        logradouro: 'Rua Exemplo 3',
        bairro: 'Bairro Exemplo 3',
        complemento: '',
        localidade: 'Cidade Exemplo 4',
        numero: '451',
        inscricaoEstadual: '',
        proBono: false,
        status: 'Inativo',
        ativo: false,
        dataInicio: '2024-02-02',
        indicacao: 'Marketing',
        descricao: 'Contrato de serviço',
    },
    {
        id: 2,
        nome: 'Gabriel Cordeiro',
        dataNascimento: '1992-02-02',
        email: 'gabriel@example.com',
        rg: '987654321',
        cpf: '987.654.321-00',
        cnpj: '',
        telefone: '11 88888-8888',
        cep: '00000-000',
        logradouro: 'Rua Exemplo 2',
        bairro: 'Bairro Exemplo 2',
        complemento: '',
        localidade: 'Cidade Exemplo 2',
        numero: '456',
        inscricaoEstadual: '',
        proBono: false,
        status: 'Ativo',
        ativo: true,
        dataInicio: '2024-02-02',
        indicacao: 'Marketing',
        descricao: 'Contrato de serviço',
    },
];

const CLIENT_FORM_COLUMNS = [
    [
        { name: 'nome', label: 'Nome', type: 'text', required: true },
        { name: 'dataNascimento', label: 'Data de Nascimento', type: 'date' },
        { name: 'email', label: 'E-mail', type: 'email', required: true },
        { name: 'rg', label: 'RG', type: 'text', required: true },
        { name: 'cpf', label: 'CPF', type: 'text', required: true },
    ],
    [
        { name: 'cnpj', label: 'CNPJ', type: 'text' },
        { name: 'telefone', label: 'Telefone', type: 'text', required: true },
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
            name: 'proBono',
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
            name: 'status',
            label: 'Status',
            type: 'select',
            defaultValue: 'Ativo',
            options: [
                { value: 'Ativo', label: 'Ativo' },
                { value: 'Inativo', label: 'Inativo' },
            ],
        },
        { name: 'dataInicio', label: 'Data Início', type: 'date' },
        {
            name: 'indicacao',
            label: 'Indicação',
            type: 'select',
            defaultValue: 'Lista de clientes',
            options: [
                { value: 'Lista de clientes', label: 'Lista de clientes' },
                { value: 'Indicação', label: 'Indicação' },
                { value: 'Marketing', label: 'Marketing' },
            ],
        },
        {
            name: 'descricao',
            label: 'Descrição',
            type: 'textarea',
            placeholder: 'Caso de Herança...',
        },
    ],
];

const getFieldValue = (clientData, field) => {
    if (!clientData) {
        return field.defaultValue ?? '';
    }

    if (field.name === 'proBono') {
        return clientData.proBono ? 'true' : 'false';
    }

    const value = clientData[field.name];
    return value ?? field.defaultValue ?? '';
};

const renderFormColumns = (mode, clientData) => (
    CLIENT_FORM_COLUMNS.map((column, columnIndex) => (
        <div className="form-column" key={`column-${columnIndex}`}>
            {column.map((field) => {
                const baseProps = {
                    id: field.name,
                    name: field.name,
                    required: field.required,
                    disabled: mode === 'view',
                };

                const defaultValue = getFieldValue(clientData, field);

                if (field.type === 'select') {
                    return (
                        <div className="form-group-client" key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <select
                                {...baseProps}
                                defaultValue={defaultValue}
                            >
                                {field.options?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    );
                }

                if (field.type === 'textarea') {
                    return (
                        <div className="form-group-client" key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <textarea
                                {...baseProps}
                                placeholder={field.placeholder}
                                defaultValue={defaultValue}
                            />
                        </div>
                    );
                }

                return (
                    <div className="form-group-client" key={field.name}>
                        <label htmlFor={field.name}>{field.label}</label>
                        <input
                            {...baseProps}
                            type={field.type}
                            defaultValue={defaultValue}
                        />
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
    const [clients, setClients] = useState(initialClients);
    const [selectedClient, setSelectedClient] = useState(null);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

        const tableData = clients.map((client) => ({
            nome: (
                <div className="client-list-name">
                    <p>{client.nome}</p>
               
                </div>
            ),
            editar: (
                <Button
                    className="btn-icon-only"
                    type="button"
                    onClick={() => handleOpenEdit(client)}
                    aria-label={`Editar ${client.nome}`}
                >
                    <img src={editIcon} alt="Editar" />
                </Button>
            ),
            informacoes: (
                <Button
                    className="btn-link"
                    type="button"
                    onClick={() => handleOpenView(client)}
                >
                    Ver mais
                </Button>
            ),
            status: (
                <Toggle
                    label=""
                    checked={client.ativo}
                    onChange={(event) => handleToggleStatus(client, event.target.checked)}
                />
            ),
        }));

    function handleOpenAdd() {
        setIsAddOpen(true);
    }

    function handleCloseAdd() {
        setIsAddOpen(false);
    }

    function handleOpenEdit(client) {
        setSelectedClient(client);
        setIsEditOpen(true);
    }

    function handleCloseEdit() {
        setIsEditOpen(false);
        setSelectedClient(null);
    }

    function handleOpenView(client) {
        setSelectedClient(client);
        setIsViewOpen(true);
    }

    function handleCloseView() {
        setIsViewOpen(false);
        setSelectedClient(null);
    }

    function handleOpenDelete(client) {
        setSelectedClient(client);
        setIsDeleteOpen(true);
    }

    function handleToggleStatus(client, shouldActivate) {
        if (shouldActivate) {
            const updatedClients = clients.map((currentClient) => {
                if (currentClient.id === client.id) {
                    return { ...currentClient, ativo: true, status: 'Ativo' };
                }
                return currentClient;
            });
            setClients(updatedClients);
            return;
        }

        handleOpenDelete(client);
    }

    function handleCloseDelete() {
        setIsDeleteOpen(false);
        setSelectedClient(null);
    }
    
    function handleConfirmDelete() {
        if (selectedClient) {
            const updatedClients = clients.map((client) => {
                if (client.id === selectedClient.id) {
                    const newAtivo = !client.ativo;
                    return { ...client, ativo: newAtivo, status: newAtivo ? 'Ativo' : 'Inativo' };
                }
                return client;
            });
            setClients(updatedClients);
        }
        handleCloseDelete();
    }
    
    function handleSubmitAdd(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newClient = {
            id: Date.now(),
            nome: formData.get('nome'),
            email: formData.get('email'),
            telefone: formData.get('telefone'),
            ativo: formData.get('status') !== 'Inativo',
            status: formData.get('status') || 'Ativo',
            dataNascimento: formData.get('dataNascimento'),
            rg: formData.get('rg'),
            cpf: formData.get('cpf'),
            cnpj: formData.get('cnpj'),
            cep: formData.get('cep'),
            logradouro: formData.get('logradouro'),
            bairro: formData.get('bairro'),
            complemento: formData.get('complemento'),
            localidade: formData.get('localidade'),
            numero: formData.get('numero'),
            inscricaoEstadual: formData.get('inscricaoEstadual'),
            proBono: formData.get('proBono') === 'true',
            dataInicio: formData.get('dataInicio'),
            indicacao: formData.get('indicacao'),
            descricao: formData.get('descricao'),

        };
        event.currentTarget.reset();
        setClients([...clients, newClient]);
        handleCloseAdd();
    }
    
    function handleSubmitEdit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const updatedClients = clients.map((client) => {
            if (client.id === selectedClient.id) {
                return {
                    ...client,
                    nome: formData.get('nome'),
                    email: formData.get('email'),
                    telefone: formData.get('telefone'),
                    ativo: formData.get('status') !== 'Inativo',
                    status: formData.get('status') || 'Ativo',
                    dataNascimento: formData.get('dataNascimento'),
                    rg: formData.get('rg'),
                    cpf: formData.get('cpf'),
                    cnpj: formData.get('cnpj'),
                    cep: formData.get('cep'),
                    logradouro: formData.get('logradouro'),
                    bairro: formData.get('bairro'),
                    complemento: formData.get('complemento'),
                    localidade: formData.get('localidade'),
                    numero: formData.get('numero'),
                    inscricaoEstadual: formData.get('inscricaoEstadual'),
                    proBono: formData.get('proBono') === 'true',
                    dataInicio: formData.get('dataInicio'),
                    indicacao: formData.get('indicacao'),
                    descricao: formData.get('descricao'),
                };
            }
            return client;
        });
        setClients(updatedClients);
        handleCloseEdit();
    }
    
    return (
        <div className="container clientes-page">
            <Sidebar />

            <main className="main-content clientes-main">
                <div className="header-top">
                    <div className="head-description">
                        <h1>Gestão de Clientes</h1>
                        <p className="description">
                            Acesse, altere e mantenha as informações dos clientes
                            <br /> sempre atualizadas.
                        </p>
                    </div>

                    <Button className="btn-new-appointment" onClick={handleOpenAdd}>
                        Cadastrar Cliente
                        <img src={btnIcon} alt="Cadastrar novo cliente" />
                    </Button>
                </div>

                <section className="client-management-section">
                    <Card
                        className="client-table-card"
                        variant="clientes"
                        headerContent={null}
                    >
                        {clients.length ? (
                            <Listagem
                                dados={tableData}
                                colunas={TABLE_COLUMNS}
                                variant="clientes"
                            />
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
                            <Button className="btn-new-appointment" type="submit">
                                Cadastrar
                            </Button>
                        </div>
                    )}
                >
                    <div className="form-row form-grid">
                        {renderFormColumns('add', null)}
                    </div>
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
                            <Button className="btn-new-appointment" type="submit">
                                Editar
                            </Button>
                        </div>
                    )}
                >
                    <div className="form-row form-grid">
                        {selectedClient && renderFormColumns('edit', selectedClient)}
                    </div>
                </Modal>

                <Modal
                    isOpen={isViewOpen && Boolean(selectedClient)}
                    variant="view"
                    title="Informações sobre o Cliente"
                    onClose={handleCloseView}
                    modalId="new-appointment-modal-view-client"
                >
                    <div className="form-row form-grid">
                        {selectedClient && renderFormColumns('view', selectedClient)}
                    </div>
                </Modal>

                <Modal
                    isOpen={isDeleteOpen && Boolean(selectedClient)}
                    variant="delete"
                    title="Desativar Clientes"
                    onClose={handleCloseDelete}
                    modalId="modal-delete-schedule"
                    footer={(
                        <>
                            <Button className="btn-cancel-delete" onClick={handleCloseDelete}>
                                Não
                            </Button>
                            <Button className="btn-confirm-delete" onClick={handleConfirmDelete}>
                                Sim
                            </Button>
                        </>
                    )}
                >
                    <p>
                        Deseja desativar <span className="client-name">{selectedClient?.nome}</span>?
                    </p>
                </Modal>
            </main>
        </div>
    );
}

export default Clientes;