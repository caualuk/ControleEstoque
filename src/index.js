import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GastosProvider } from './components/Pagamentos/pagamentosContext';
import { RecebimentosProvider } from './components/Receber/recebimentosContext';
import { ClientesProvider } from './components/ClientesProvider/ClientesProvider';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
      <GastosProvider>
        <RecebimentosProvider>
        <App />
        </RecebimentosProvider>
      </GastosProvider>
  </React.StrictMode>
);