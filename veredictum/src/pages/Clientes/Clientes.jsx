import React, { useState } from 'react';
import './Clientes.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Listagem from '../../components/Listagem/Listagem';
import btnIcon from '../../assets/svg/btn.svg';
import closeIcon from '../../assets/svg/close.svg';
import clientsIcon from '../../assets/svg/clientes.svg';
import Card from '../../components/Card/Card';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import Toggle from '../../components/Toggle/Toggle';

const initialClients = [
    {
       "id": 1,
      "nome": "Manu Monteiro",
      "dataNascimento": "1992-04-04",
      "email": "gabriel@example.com",
      "rg": "987654301",
      "cpf": "987.654.323-00",
      "cnpj": null,
      "telefone": "11888888887",
      "cep": "10000-000",
      "logradouro": "Rua Exemplo 3",
      "bairro": "Bairro Exemplo 3",
      "complemento": null,
      "localidade": "Cidade Exemplo 4",
      "numero": "451",
      "inscricaoEstadual": null,
            "proBono": false,
            "status": "Inativo",
            "ativo": false,
      "dataInicio": "2024-02-02",
      "indicacao": "Marketing",
      "descricao": "Contrato de serviço"
    },
    {
        "id": 2,
      "nome": "Gabriel Cordeiro",
      "dataNascimento": "1992-02-02",
      "email": "gabriel@example.com",
      "rg": "987654321",
      "cpf": "987.654.321-00",
      "cnpj": null,
      "telefone": "11888888888",
      "cep": "00000-000",
      "logradouro": "Rua Exemplo 2",
      "bairro": "Bairro Exemplo 2",
      "complemento": null,
      "localidade": "Cidade Exemplo 2",
      "numero": "456",
      "inscricaoEstadual": null,
            "proBono": false,
            "status": "Ativo",
            "ativo": true,
      "dataInicio": "2024-02-02",
      "indicacao": "Marketing",
      "descricao": "Contrato de serviço"
    },
];

function Clientes() {
    const [clients, setClients] = useState(initialClients);
    const [selectedClient, setSelectedClient] = useState(null);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const columns = [
        { key: 'nome', titulo: 'Nome' },
        { key: 'editar', titulo: 'Editar' },
        { key: 'informacoes', titulo: 'Informações' },
        { key: 'status', titulo: 'Status' },
    ];

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
    }

    function handleOpenView(client) {
        setSelectedClient(client);
        setIsViewOpen(true);
    }

    function handleCloseView() {
        setIsViewOpen(false);
    }

    function handleOpenDelete(client) {
        setSelectedClient(client);
        setIsDeleteOpen(true);
    }

    function handleCloseDelete() {
        setIsDeleteOpen(false);
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
    
    const tableData = clients.map((client) => ({
        nome: (
            <div className="client-list-name">
                <strong>{client.nome}</strong>
            </div>
        ),
        editar: (
            <Button className="btn-secondary" onClick={() => handleOpenEdit(client)}>
                <img src="../../src/assets/svg/edit.svg" alt="Editar" />
            </Button>
        ),
        informacoes: (
            <Button className="btn-link" onClick={() => handleOpenView(client)}>
                Ver mais
            </Button>
        ),
        status: (
            <Toggle
                checked={client.ativo}
                onChange={() => handleOpenDelete(client)}
            />
        ),
    }));

    return (
        <div className="clientes">
            <Sidebar />

            <main className="main-content">
                <div className="header-top">
                
                    <div className="head-description">
                        <h1>Gestão de Clientes</h1>
                         <Button className="btn-new-appointment" onClick={handleOpenAdd}>
                        <img src={btnIcon} alt="Adicionar" />
                        Cadastrar Cliente
                    </Button>
                        <p className="description">
                            Acesse, altere e mantenha as informações dos clientes
                            <br /> sempre atualizadas.
                        </p>
                       
                    </div>

                
                </div>

                <section className="client-management-section">
                    <Card
                        icone={<img src={clientsIcon} alt="Clientes" />}
                        className="client-table-card"
                        variant="clientes"
                    >
                        <Listagem
                            dados={tableData}
                            colunas={columns}
                            variant="clientes"
                        />
                    </Card>
                </section>

                {isAddOpen && (
                 <>
                    <div className="modal-backdrop-add" onClick={handleCloseAdd}></div>
                    <div id="new-appointment-modal-add-client" className="modal">
                       <div className="modal-content">
                         <div className="modal-header">
                           <h2>Cadastrar Clientes</h2>
                           <button type="button" className="modal-close-btn" onClick={handleCloseAdd}>
                             <img src={closeIcon} alt="Fechar" />
                           </button>
                         </div>
                         <form className="appointment-form" id="formCadastrarCliente" onSubmit={handleSubmitAdd}>
                             <div className="form-footer-client">
                                 <Button type="submit" className="btn-new-appointment">
                                     Cadastrar
                                 </Button>
                             </div>
                         </form>
                       </div>
                    </div>
                 </>
                )}

                <Modal
                    isEditOpen={isEditOpen}
                    isViewOpen={isViewOpen}
                    isDeleteOpen={isDeleteOpen}
                    clientName={selectedClient ? selectedClient.nome : ''}
                    clientData={selectedClient}
                    onCloseEdit={handleCloseEdit}
                    onCloseView={handleCloseView}
                    onCloseDelete={handleCloseDelete}
                    onSubmitEdit={handleSubmitEdit}
                    onConfirmDelete={handleConfirmDelete}
                />
            </main>
        </div>
    );
}

export default Clientes;