import React, { useEffect, useState } from "react";
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
import { calcularVendasDaSemana, obterDiasDaSemana } from "../CalcularVendas/calcularVendas.js";
import styled from "styled-components";

const GraphicContainer = styled.div`
  width: 750px;
  height: 300px;
  padding: 50px;
`

const Graphic = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const atualizarGrafico = (vendasPorDia) => {
      console.log("Dados recebidos para o gráfico:", vendasPorDia);

      const diasDaSemana = obterDiasDaSemana();

      const dadosFormatados = diasDaSemana.map((dia) => ({
        dia,
        Vendas: vendasPorDia[dia] || 0,
        Despesas: 0, // Despesas podem ser ajustadas
      }));

      console.log("Dados formatados para o gráfico:", dadosFormatados);

      setData(dadosFormatados);
    };

    const unsubscribe = calcularVendasDaSemana(atualizarGrafico);

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <GraphicContainer>
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
    </GraphicContainer>
  );
};

export default Graphic;