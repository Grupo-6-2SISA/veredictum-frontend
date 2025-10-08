import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

import BtnIcon from "../../assets/svg/btn.svg";
import CalendarIcon from "../../assets/svg/calendar.svg";
import SetaIcon from "../../assets/svg/seta.svg";
import EditIcon from "../../assets/svg/edit.svg";

import Sidebar from "../../components/Sidebar/Sidebar";
import ModalAdicionarDespesa from "../../components/Modals/ModalAdicionarDespesa";
import ModalEditarDespesa from "../../components/Modals/ModalEditarDespesa";
import ModalInfoDespesa from "../../components/Modals/ModalInfoDespesa";

import "./GestaoDespesas.css";


const mockExpenses = [
  {
    id: 1,
    etiqueta: "Luz",
    vencimento: "2025-06-09",
    pago: true,
    url: "",
    comentario: "Conta de energia elétrica.",
  },
  {
    id: 2,
    etiqueta: "Água",
    vencimento: "2025-06-11",
    pago: false,
    url: "http://faturaagua.com",
    comentario: "Conta de água e saneamento.",
  },
];

export default function GestaoDespesas() {
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Junho");
  const [monthTotal, setMonthTotal] = useState("124,33");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const [editingItem, setEditingItem] = useState(null);
  const [infoItem, setInfoItem] = useState(null);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  // === MODAL ADICIONAR ===
  const openModal = () => setShowAddModal(true);
  const closeModal = () => setShowAddModal(false);

  const handleAddExpense = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newExpense = {
      etiqueta: formData.get("etiqueta"),
      url: formData.get("url"),
      vencimento: formData.get("vencimento"),
      comentario: formData.get("comentario"),
      pago: formData.get("pago_sim") === "sim",
    };
    console.log("Nova despesa adicionada:", newExpense);
    closeModal();
  };

  // === MODAL EDITAR ===
  const openModalEdit = (etiqueta) => {
    const itemToEdit = mockExpenses.find((item) => item.etiqueta === etiqueta);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setShowEditModal(true);
    }
  };

  const closeModalEdit = () => {
    setShowEditModal(false);
    setEditingItem(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedItem = {
      id: editingItem.id,
      etiqueta: formData.get("etiqueta"),
      url: formData.get("url"),
      vencimento: formData.get("vencimento"),
      comentario: formData.get("comentario"),
      pago: formData.get("edit-pago") === "sim",
    };
    console.log("Despesa atualizada:", updatedItem);
    closeModalEdit();
  };

  // === MODAL VER MAIS ===
  const modalVerMais = (etiqueta) => {
    const itemInfo = mockExpenses.find((item) => item.etiqueta === etiqueta);
    if (itemInfo) {
      setInfoItem(itemInfo);
      setShowInfoModal(true);
    }
  };

  const closeModalVerMais = () => {
    setShowInfoModal(false);
    setInfoItem(null);
  };

  // === GRÁFICO ===
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current && typeof Chart !== "undefined") {
      const ctx = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out"],
          datasets: [
            {
              label: "Gastos Mensais",
              data: [150, 205, 180, 120, 190, 321, 173, 156, 180, 212],
              borderColor: "#000000",
              backgroundColor: "transparent",
              borderWidth: 2,
              pointBackgroundColor: "#000000",
              pointBorderColor: "#000000",
              pointRadius: 4,
              pointHoverRadius: 6,
              tension: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              beginAtZero: true,
              grid: { display: false },
              ticks: { color: "#666", font: { size: 12 } },
            },
            x: {
              grid: { display: false },
              ticks: { color: "#666", font: { size: 12 } },
            },
          },
        },
      });
    }

    return () => chartInstance.current?.destroy();
  }, []);

  // === TOTAL DO MÊS ===
  useEffect(() => {
    const fakeTotals = {
      Janeiro: "87,50", Fevereiro: "102,40", Março: "198,90", Abril: "156,00",
      Maio: "205,12", Junho: "124,33", Julho: "178,44", Agosto: "143,20",
      Setembro: "199,60", Outubro: "220,90", Novembro: "180,10", Dezembro: "250,75",
    };
    setMonthTotal(fakeTotals[selectedMonth] || "0,00");
  }, [selectedMonth]);

  return (
    <div className="container">
      <Sidebar />

      <main className="main-content">
        <header className="header">
          <h1>Gestão de Despesas</h1>
          <button className="add-expense-btn" onClick={openModal}>
            <span>Adicionar Despesa</span>
            <img src={BtnIcon} alt="Adicionar" />
          </button>
        </header>

        {/* 🔹 SELETOR DE MÊS */}
        <div className="month-selector">
          <div className="month-selector-container">
            <button
              className="month-selector-btn"
              onClick={() => setShowMonthPicker(!showMonthPicker)}
            >
              <img src={CalendarIcon} alt="Calendário" />
              <span>{selectedMonth}</span>
              <img src={SetaIcon} alt="Seta" />
            </button>
          </div>

          {showMonthPicker && (
            <div id="month-picker" className="month-picker-popup">
              <div className="month-header">
                <div id="current-month-display">Selecione um mês</div>
              </div>

              <div className="month-buttons">
                {months.map((month) => (
                  <button
                    key={month}
                    className={`month-btn ${selectedMonth === month ? "active" : ""}`}
                    onClick={() => {
                      setSelectedMonth(month);
                      setShowMonthPicker(false);
                    }}
                  >
                    {month}
                  </button>
                ))}
              </div>

              <div className="calendar-actions">
                <button id="cancel-btn" onClick={() => setShowMonthPicker(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          )}

          <div className="total-month">
            <span>
              Total do mês: <strong id="monthTotal">R$ {monthTotal}</strong>
            </span>
          </div>
        </div>

        {/* 🔹 CONTEÚDO PRINCIPAL */}
        <div className="content-grid">
          <div className="bills-section">
            <div className="section-header">
              <h2>Contas a Pagar</h2>
            </div>

            <div className="table-container">
              <table  style={{ border: 'none' }} className="bills-table">
                <thead>
                  <tr>
                    <th>Etiqueta</th>
                    <th>Data de Vencimento</th>
                    <th>Pago</th>
                    <th>Editor</th>
                    <th>Informações</th>
                  </tr>
                </thead>
                <tbody>
                  {mockExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.etiqueta}</td>
                      <td>{expense.vencimento}</td>
                      <td>
                        <span className={`status ${expense.pago ? "paid" : "unpaid"}`}>
                          {expense.pago ? "Sim" : "Não"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => openModalEdit(expense.etiqueta)}
                        >
                          <img src={EditIcon} alt="Editar" />
                        </button>
                      </td>
                      <td>
                        <button
                          className="info-link"
                          onClick={() => modalVerMais(expense.etiqueta)}
                        >
                          Ver mais
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* GRÁFICO */}
          <div className="chart-section">
            <h2>Valor Gasto por Ano</h2>
            <div className="chart-container">
              <canvas ref={chartRef} id="expenseChart"></canvas>
            </div>
          </div>
        </div>
      </main>

      {/* === MODAIS === */}
      <ModalAdicionarDespesa
        show={showAddModal}
        onClose={closeModal}
        onSubmit={handleAddExpense}
      />

      <ModalEditarDespesa
        show={showEditModal}
        onClose={closeModalEdit}
        onSubmit={handleEditSubmit}
        editingItem={editingItem}
      />

      <ModalInfoDespesa
        show={showInfoModal}
        onClose={closeModalVerMais}
        infoItem={infoItem}
      />
    </div>
  );
}
