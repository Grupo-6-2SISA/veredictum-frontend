// src/pages/Dashboard/BarChartStatic.jsx (NOVO com Recharts)

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

// Dados estáticos de exemplo (simulando a aparência do seu dashboard)
const data = [
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

const BarChartStatic = () => {
    return (
        // ResponsiveContainer garante que o gráfico se ajuste ao ChartContainer
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                barCategoryGap={5} // Espaço entre os grupos de barras (opcional)
                barGap={1} // Espaço entre as barras do mesmo grupo
            >
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#ededed" />
                
                {/* Eixo X: Meses */}
                <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: '10px' }} />
                
                {/* Eixo Y: Valores (0 a 100) */}
                <YAxis 
                    domain={[0, 100]} 
                    axisLine={false} 
                    tickLine={false} 
                    style={{ fontSize: '10px', fontFamily: "Montserrat" }} 
                    tickCount={11} // De 0 a 100 de 10 em 10
                />
                
                {/* Tooltip (removido para manter estático, mas pode ser reativado se necessário) */}
                {/* <Tooltip /> */}
                
                {/* Legenda (na parte inferior) */}
                <Legend iconType="square" wrapperStyle={{ bottom: 0, fontSize: '10px' }} />
                
                {/* Barras do Ano Anterior (Cinza) */}
                <Bar dataKey="Ano Anterior" fill="#A9A9A9" />
                
                {/* Barras do Ano Atual (Escuro) */}
                <Bar dataKey="Ano Atual" fill="#333333" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartStatic;