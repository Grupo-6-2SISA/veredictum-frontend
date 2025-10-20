import React, { useState, useEffect } from "react";
import FecharIcon from "../../../assets/svg/fechar.svg";
import './ModalContainer.css'; // <-- usar CSS centralizado em vez de ../GestaoDespesas.css
import { editarAtendimento, apiClient } from "../Agenda.js";

export default function ModalEditarAtendimento({ show, onClose, editingItem, atualizarLista }) {
    const [clientes, setClientes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [isPago, setIsPago] = useState(false);

    useEffect(() => {
        if (!show) return;
        let mounted = true;
        const fetchLists = async () => {
            try {
                const [cRes, uRes] = await Promise.all([
                    apiClient.get("/clientes").catch(() => ({ data: [] })),
                    apiClient.get("/usuarios").catch(() => ({ data: [] })),
                ]);
                if (!mounted) return;
                setClientes(cRes.data || []);
                setUsuarios(uRes.data || []);
            } catch (e) {
                console.error("Erro ao carregar listas:", e);
            }
        };
        fetchLists();
        return () => { mounted = false; };
    }, [show]);

    useEffect(() => {
        if (!editingItem) return;
        setIsPago(Boolean(editingItem.isPago));
    }, [editingItem]);

    if (!show || !editingItem) return null;

    // extrai date/time de dataInicio para preencher inputs
    const parseDate = (iso) => {
        if (!iso) return { date: "", time: "" };
        try {
            const d = new Date(iso);
            const date = d.toISOString().split("T")[0];
            const time = d.toTimeString().slice(0, 5);
            return { date, time };
        } catch {
            return { date: "", time: "" };
        }
    };
    const { date: initialDate, time: initialTime } = parseDate(editingItem.dataInicio);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fkCliente = e.target.fkCliente?.value || "";
        const nomeClienteManual = e.target.nomeCliente?.value?.trim() || "";
        const fkUsuario = e.target.fkUsuario?.value || "";
        const etiqueta = e.target.etiqueta?.value?.trim() || null;
        const valorRaw = e.target.valor?.value;
        const valor = valorRaw === "" ? null : parseFloat(valorRaw);
        const descricao = e.target.descricao?.value?.trim() || null;
        const data = e.target.data?.value;
        const hora = e.target.hora?.value;
        const shouldEnviarEmail = !!e.target.shouldEnviarEmail?.checked;
        const isPagoLocal = isPago;

        // validações simples
        if (!fkCliente && !nomeClienteManual) { alert("Informe cliente (selecione ou digite o nome)."); return; }
        if (!fkUsuario) { alert("Selecione o responsável."); return; }
        if (!data || !hora) { alert("Selecione data e hora."); return; }
        if (valor !== null && (isNaN(valor) || valor < 0)) { alert("Valor inválido."); return; }

        const dataInicioISO = `${data}T${hora}:00`;
        let dataFimISO = null;
        try {
            const d = new Date(dataInicioISO);
            d.setHours(d.getHours() + 1);
            dataFimISO = d.toISOString();
        } catch (err) {
            console.error("Erro ao calcular dataFim", err);
        }

        const nomeCliente = nomeClienteManual || (clientes.find(c => String(c.idCliente ?? c.id) === String(fkCliente))?.nome || "");

        const atendimentoDTO = {
            fkCliente: fkCliente ? Number(fkCliente) : null,
            nomeCliente: nomeCliente,
            fkUsuario: fkUsuario ? Number(fkUsuario) : null,
            etiqueta,
            valor: valor === null ? null : Number(valor),
            descricao,
            dataInicio: dataInicioISO,
            dataFim: dataFimISO,
            // backend exige dataVencimento não-nulo -> usar existente ou dataInicio como fallback
            dataVencimento: editingItem.dataVencimento ?? dataInicioISO,
            isPago: isPagoLocal,
            shouldEnviarEmail
        };

        console.debug("ModalEditarAtendimento - payload:", atendimentoDTO);

        try {
            const id = editingItem.idAtendimento ?? editingItem.id;
            const res = await editarAtendimento(id, atendimentoDTO);
            console.log("Atendimento atualizado:", res?.data);
            alert("Atendimento atualizado com sucesso!");
            if (typeof atualizarLista === "function") await atualizarLista();
            onClose();
        } catch (err) {
            console.error("Erro ao atualizar atendimento:", err);
            const msg = err?.response?.data?.message || err?.message || "Erro de conexão";
            alert("Erro ao atualizar atendimento: " + msg);
        }
    };

    return (
        <div id="ModalEditarAtendimento" className="modal">
            <div className="modal_content_despesas" style={{ maxWidth: 980 }}>
                <div className="modal-header">
                    <h2>Editar Agendamento</h2>
                    <button className="modal-close-btn" onClick={onClose} type="button">
                        <img src={FecharIcon} alt="Fechar" />
                    </button>
                </div>

                <form id="editAppointmentForm" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="fkCliente">Cliente</label>
                            {clientes.length > 0 ? (
                                <select id="fkCliente" name="fkCliente" defaultValue={editingItem.fkCliente ?? editingItem.fkCliente}>
                                    <option value="">Selecione...</option>
                                    {clientes.map(c => (
                                        <option key={c.idCliente ?? c.id} value={c.idCliente ?? c.id}>
                                            {c.nome || c.nomeCliente || `#${c.idCliente ?? c.id}`}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input id="nomeCliente" name="nomeCliente" defaultValue={editingItem.nomeCliente || editingItem.nome || ""} />
                            )}
                            {clientes.length > 0 && (
                                <input name="nomeCliente" defaultValue={editingItem.nomeCliente || editingItem.nome || ""} placeholder="Nome (opcional)" />
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="fkUsuario">Responsável</label>
                            <select id="fkUsuario" name="fkUsuario" defaultValue={editingItem.fkUsuario ?? editingItem.fkUsuario}>
                                <option value="">Selecione...</option>
                                {usuarios.map(u => (
                                    <option key={u.idUsuario ?? u.id} value={u.idUsuario ?? u.id}>
                                        {u.nome || u.nomeUsuario || `#${u.idUsuario ?? u.id}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="etiqueta">Etiqueta</label>
                            <input id="etiqueta" name="etiqueta" defaultValue={editingItem.etiqueta || ""} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="valor">Valor</label>
                            <input id="valor" name="valor" type="number" step="0.01" defaultValue={editingItem.valor ?? ""} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                            <label htmlFor="descricao">Descrição</label>
                            <textarea id="descricao" name="descricao" rows={3} defaultValue={editingItem.descricao || ""} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="hora">Selecione a hora de início</label>
                            <input type="time" id="hora" name="hora" defaultValue={initialTime} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="data">Selecione o dia</label>
                            <input type="date" id="data" name="data" defaultValue={initialDate} required />
                        </div>
                    </div>

                    <div style={{ marginTop: 8 }}>
                        <label>
                            <input type="checkbox" id="shouldEnviarEmail" name="shouldEnviarEmail" defaultChecked={Boolean(editingItem.shouldEnviarEmail)} />
                            {" "}Enviar e-mail de lembrete?
                        </label>
                    </div>

                    <div className="form-footer-notas" style={{ marginTop: 16 }}>
                        <div id="div_para_checkbox_edit">
                            <label className="pagamento-label">Pago?</label>
                            <div id="switch_edit" className="switch-row">
                                <span className="switch-text off">Não</span>
                                <label className="switch">
                                    <input type="checkbox" id="edit-pago-switch" name="isPago" checked={isPago} onChange={() => setIsPago(!isPago)} />
                                    <span className="slider"></span>
                                </label>
                                <span className="switch-text on">Sim</span>
                            </div>
                        </div>

                        <div id="div_para_botao">
                            <button type="submit" className="modal-add-btn_save">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
