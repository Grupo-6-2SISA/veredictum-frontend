import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { listarDespesas, getTotalPorMesEAno, valorPorAno } from "../GestadoDespesas/GestaoDespesas"; 

import BtnIcon from "../../assets/svg/btn.svg";
import CalendarIcon from "../../assets/svg/calendar.svg";
import SetaIcon from "../../assets/svg/seta.svg";
import EditIcon from "../../assets/svg/edit.svg";

import Sidebar from "../../components/Sidebar/Sidebar";
import ModalAdicionarDespesa from "../GestadoDespesas/Support/ModalAdicionarDespesa";
import ModalEditarDespesa from "../GestadoDespesas/Support/ModalEditarDespesa";
import ModalInfoDespesa from "../GestadoDespesas/Support/ModalInfoDespesa";

import "./GestaoDespesas.css";

export default function GestaoDespesas() {

  const [expenses, setExpenses] = useState([]);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Junho");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [monthTotal, setMonthTotal] = useState("0,00");
  const [yearData, setYearData] = useState([]);

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

  // === LISTAR DESPESAS ===
  useEffect(() => {
    async function fetchDespesas() {
      try {
        const response = await listarDespesas();
        const despesasOrdenadas = response.data.sort((a, b) => {
          const dataA = new Date(a.dataVencimento);
          const dataB = new Date(b.dataVencimento);
          if (a.isPago !== b.isPago) {
            return a.isPago ? 1 : -1;
          }
          return dataA - dataB;
        });
        setExpenses(despesasOrdenadas);
      } catch (error) {
        console.error("Erro ao buscar despesas:", error);
      }
    }
    fetchDespesas();
  }, []);

  // === TOTAL DO MÊS ===
  useEffect(() => {
    const mesNumerico = months.indexOf(selectedMonth) + 1;

    async function fetchMonthTotal() {
      try {
        const response = await getTotalPorMesEAno(mesNumerico, selectedYear);
        if (response.status === 200 && response.data != null) {
          const totalFormatado = response.data.toFixed(2).replace('.', ',');
          setMonthTotal(totalFormatado);
        } else {
          setMonthTotal("0,00");
        }
      } catch (error) {
        console.error("Erro ao buscar total do mês:", error);
        setMonthTotal("0,00");
      }
    }

    fetchMonthTotal();
  }, [selectedMonth, selectedYear]);

  // === DADOS DO GRÁFICO ===
  useEffect(() => {
    async function fetchYearData() {
      try {
        const response = await valorPorAno(selectedYear);
        if (response.status === 200 && Array.isArray(response.data)) {
          setYearData(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
      }
    }
    fetchYearData();
  }, [selectedYear]);

  // === GRÁFICO ===
  useEffect(() => {
    if (!yearData.length) return;

    const valoresPorMes = new Array(12).fill(0);
    yearData.forEach((item) => {
      valoresPorMes[item.mes - 1] = item.valor;
    });

    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: months.map((m) => m.substring(0, 3)),
        datasets: [
          {
            label: `Gastos Mensais (${selectedYear})`,
            data: valoresPorMes,
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

    return () => chartInstance.current?.destroy();
  }, [yearData, selectedYear]);

  // === MODAIS ===
  const openModal = () => setShowAddModal(true);
  const closeModal = () => setShowAddModal(false);

  const openModalEdit = (etiqueta) => {
    const itemToEdit = expenses.find((item) => item.etiqueta === etiqueta);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setShowEditModal(true);
    }
  };

  const closeModalEdit = () => {
    setShowEditModal(false);
    setEditingItem(null);
  };

  const modalVerMais = (etiqueta) => {
    const itemInfo = expenses.find((item) => item.etiqueta === etiqueta);
    if (itemInfo) {
      setInfoItem(itemInfo);
      setShowInfoModal(true);
    }
  };

  const closeModalVerMais = () => {
    setShowInfoModal(false);
    setInfoItem(null);
  };

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

        {/* SELETOR DE MÊS E ANO */}
        <div className="month-selector">
          <div className="month-selector-container">
            <button className="month-selector-btn" onClick={() => setShowMonthPicker(!showMonthPicker)}>
              <img src={CalendarIcon} alt="Calendário" />
              <span>{selectedMonth} / {selectedYear}</span>
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
              </div> <br />

              <div className="year-selector">
                <label htmlFor="year">Ano:</label> <br /><br />
                <select
                  id="year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                >
                  {[2023, 2024, 2025, 2026].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div className="calendar-actions">
                <button id="cancel-btn" onClick={() => setShowMonthPicker(false)}>Cancelar</button>
              </div>
            </div>
          )}

          <div className="total-month">
            <span>Total do mês: <strong id="monthTotal">R$ {monthTotal}</strong></span>
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="content-grid">
          <div className="bills-section">
            <div className="section-header"><h2>Contas a Pagar</h2></div>

            <div className="table-container">
              <table style={{ border: "none" }} className="bills-table">
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
                  {expenses.map((expense) => (
                    <tr key={expense.idConta}>
                      <td>{expense.etiqueta}</td>
                      <td>{expense.dataVencimento}</td>
                      <td>
                        <span className={`status ${expense.isPago ? "paid" : "unpaid"}`}>
                          {expense.isPago ? "Sim" : "Não"}
                        </span>
                      </td>
                      <td>
                        <button className="edit-btn" onClick={() => openModalEdit(expense.etiqueta)}>
                          <img src={EditIcon} alt="Editar" />
                        </button>
                      </td>
                      <td>
                        <button className="info-link" onClick={() => modalVerMais(expense.etiqueta)}>Ver mais</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* GRÁFICO */}
          <div className="chart-section">
            <h2>Valor Gasto por Ano ({selectedYear})</h2>
            <div className="chart-container">
              <canvas ref={chartRef} id="expenseChart"></canvas>
            </div>
          </div>
        </div>
      </main>

      {/* === MODAIS === */}
      <ModalAdicionarDespesa show={showAddModal} onClose={closeModal} />
      <ModalEditarDespesa show={showEditModal} onClose={closeModalEdit} editingItem={editingItem} />
      <ModalInfoDespesa show={showInfoModal} onClose={closeModalVerMais} infoItem={infoItem} />
    </div>
  );
}
