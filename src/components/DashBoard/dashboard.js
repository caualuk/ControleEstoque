import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Funcionários', value: 41, color: '#007bff' },
  { name: 'Energia', value: 5, color: '#d63384' },
  { name: 'Aluguel', value: 6, color: '#dc3545' },
  { name: 'Impostos', value: 13, color: '#ffc107' },
  { name: 'Desp.Bancária', value: 4, color: '#20c997' },
  { name: 'Publicidade', value: 29, color: '#0d6efd' },
  { name: 'Fornecedores', value: 29, color: '#0dcaf0' }
];

const Dashboard = () => {
  return (
    <div className='p-4' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 className='text-xl font-semibold mb-2'>Despesas por Categoria <span className='text-teal-500'>(01/10/22 à 01/02/23)</span></h2>
      <PieChart width={400} height={300}>
        <Pie data={data} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={100} fill='#8884d8' label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Dashboard;