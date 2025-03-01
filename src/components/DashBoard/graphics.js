import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { dia: "Seg", Vendas: 15000, Despesas: 8000 },
  { dia: "Ter", Vendas: 20000, Despesas: 10000 },
  { dia: "Qua", Vendas: 18000, Despesas: 12000 },
  { dia: "Qui", Vendas: 22000, Despesas: 15000 },
  { dia: "Sex", Vendas: 25000, Despesas: 20000 },
  { dia: "Sáb", Vendas: 30000, Despesas: 25000 },
  { dia: "Dom", Vendas: 27000, Despesas: 23000 },
];

const Graphic = () => (
  <div style={{ width: 700, height: 300 }}>
    <h3 style={{ fontSize: "1rem", marginBottom: "8px" }}>
      Vendas x Despesas (Semanal)
    </h3>
    <ResponsiveContainer>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
      >
        <defs>
          <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dia" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="Vendas"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorVendas)"
        />
        <Area
          type="monotone"
          dataKey="Despesas"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorDespesas)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default Graphic;
