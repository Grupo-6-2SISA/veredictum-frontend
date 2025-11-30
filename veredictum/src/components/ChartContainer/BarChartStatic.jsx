// src/pages/Dashboard/BarChartStatic.jsx

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip, // 🚀 Mantenha o Tooltip importado
    Legend,
    ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: '#fff',
                padding: '10px',
                borderRadius: '1px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                fontSize: '12px'
            }}>
                <strong>{label}</strong>
                {payload.map((item, index) => (
                    <p key={index} style={{ margin: 0, color: item.color }}>
                        {item.name}: <strong>{item.value}</strong>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

// 🚀 1. Renomeie 'data' para 'defaultData' (se for usar Tooltip customizado, pule para o Bloco 2)
const defaultData = [
    { name: 'JAN', 'Ano Anterior': 20, 'Ano Atual': 10 },
    { name: 'FEV', 'Ano Anterior': 45, 'Ano Atual': 35 },
    { name: 'MAR', 'Ano Anterior': 30, 'Ano Atual': 65 },
    { name: 'ABR', 'Ano Anterior': 60, 'Ano Atual': 40 },
    { name: 'MAI', 'Ano Anterior': 50, 'Ano Atual': 70 },
    { name: 'JUN', 'Ano Anterior': 75, 'Ano Atual': 85 },
    { name: 'JUL', 'Ano Anterior': 55, 'Ano Atual': 95 },
    { name: 'AGO', 'Ano Anterior': 90, 'Ano Atual': 80 },
    { name: 'SET', 'Ano Anterior': 80, 'Ano Atual': 90 },
    { name: 'OUT', 'Ano Anterior': 70, 'Ano Atual': 75 },
    { name: 'NOV', 'Ano Anterior': 40, 'Ano Atual': 50 },
    { name: 'DEZ', 'Ano Anterior': 65, 'Ano Atual': 100 },
];



// 🚀 2. Aceita a prop 'data'
const BarChartStatic = ({ data }) => {

    // 🚀 3. Define qual dado usar
    const chartData = data && data.length > 0 ? data : defaultData;

    return (
        <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    // 🚀 Margens alteradas
                    margin={{ top: 15, right: 20, left: 10, bottom: 10 }}
                    // 🚀 Espaçamento entre grupos e entre barras
                    barCategoryGap="25%"
                    barGap={8}
                >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#ededed" />

                    {/* Eixo X: Meses */}
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        // 🚀 Tamanho da fonte alterado
                        style={{ fontSize: '11px' }}
                    />

                    {/* Eixo Y: Valores */}
                    <YAxis
                        // 🚀 Removido domain e tickCount
                        axisLine={false}
                        tickLine={false}
                        // 🚀 Tamanho da fonte e formato
                        style={{ fontSize: '11px' }}
                        allowDecimals={false} // Não permite decimais
                    />

                    {/* Tooltip (remover o antigo e adicionar o novo) */}
                    <Tooltip content={<CustomTooltip />} /> 

                    {/* Legenda (na parte inferior) */}
                    <Legend
                        iconType="square"
                        // 🚀 Tamanho da fonte alterado
                        wrapperStyle={{ bottom: 0, fontSize: '11px' }}
                    />

                    {/* Barras do Ano Anterior (Cinza) */}
                    <Bar
                        dataKey="Ano Anterior"
                        fill="#A9A9A9"
                        // 🚀 Adicionado largura, raio e animação
                        barSize={26}
                        radius={[1, 1, 0, 0]}
                        animationDuration={900}
                    />

                    {/* Barras do Ano Atual (Escuro) */}
                    <Bar
                        dataKey="Ano Atual"
                        fill="#333333"
                        // 🚀 Adicionado largura, raio e animação
                        barSize={26}
                        radius={[1, 1, 0, 0]}
                        animationDuration={900}
                    />
                </BarChart>
        </ResponsiveContainer>
    );
};
    
export default BarChartStatic;