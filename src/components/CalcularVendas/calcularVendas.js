import { collection, query, where, getDocs, onSnapshot, doc, setDoc, increment } from "firebase/firestore";
import { db } from "../../firebase.js";

const registrarVendaDiaria = async (valorVenda) => {
    try {
      const dataAtual = new Date().toISOString().split('T')[0];
      const docRef = doc(db, "dailySales", dataAtual);
  
      await setDoc(docRef, {
        total: increment(valorVenda),
        data: dataAtual,
      }, { merge: true });
  
      console.log("Venda registrada com sucesso:", { data: dataAtual, total: valorVenda });
    } catch (error) {
      console.error("Erro ao registrar venda diária:", error);
    }
};

export const obterDiasDaSemana = () => {
    return["Seg", "Ter", "Qua", "Qui","Sex", "Sáb", "Dom"];
}

export const calcularVendasDaSemana = (callback) => {
    if (typeof callback !== "function") {
        console.error("O parâmetro 'callback' deve ser uma função.");
        return;
    }

    try {
        const hoje = new Date();
        const umaSemanaAtras = new Date(hoje);
        umaSemanaAtras.setDate(hoje.getDate() - 6); // Últimos 7 dias (incluindo hoje)

        // Formata as datas para o formato AAAA-MM-DD
        const hojeFormatado = hoje.toISOString().split('T')[0];
        const umaSemanaAtrasFormatado = umaSemanaAtras.toISOString().split('T')[0];

        console.log("Buscando dados de:", umaSemanaAtrasFormatado, "até", hojeFormatado);

        // Consulta os documentos dos últimos 7 dias
        const vendasRef = collection(db, "dailySales");
        const q = query(vendasRef, where("data", ">=", umaSemanaAtrasFormatado), where("data", "<=", hojeFormatado));

        // Escuta as mudanças em tempo real
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            console.log("Dados recebidos do Firestore:", querySnapshot.docs);

            // Obtém os dias da semana na ordem correta
            const diasDaSemana = obterDiasDaSemana();

            // Cria um objeto para armazenar os totais de cada dia
            const vendasPorDia = {};
            diasDaSemana.forEach((dia) => {
                vendasPorDia[dia] = 0; // Inicializa todos os dias com 0
            });

            // Preenche os totais de cada dia
            querySnapshot.forEach((doc) => {
                const data = doc.data().data; // Data no formato AAAA-MM-DD
                const dataObj = new Date(data + "T00:00:00"); // Adiciona horário para evitar problemas de fuso horário

                // Obtém o dia da semana no formato "Seg", "Ter", etc.
                const diaDaSemana = dataObj.toLocaleDateString('pt-BR', { weekday: 'short' }).replace(".", "");
                const diaCapitalizado = diaDaSemana.charAt(0).toUpperCase() + diaDaSemana.slice(1);

                // Log para depuração
                console.log("Data:", data, "Dia da semana:", diaCapitalizado, "Total:", doc.data().total);

                // Atualiza o total do dia correspondente
                if (vendasPorDia.hasOwnProperty(diaCapitalizado)) {
                    vendasPorDia[diaCapitalizado] += doc.data().total;
                }
            });

            console.log("Vendas por dia:", vendasPorDia);

            // Chama o callback com os dados atualizados
            callback(vendasPorDia);
        });

        // Retorna a função de unsubscribe para limpar o listener
        return unsubscribe;
    } catch (error) {
        console.error("Erro ao calcular vendas da semana:", error);
        return () => {}; // Retorna uma função vazia para evitar erros
    }
};

export const calcularVendasDoMes = async () => {
    try {
      const hoje = new Date();
      const primeiroDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1); // Primeiro dia do mês
      const ultimoDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0); // Último dia do mês
  
      // Formata as datas para o formato YYYY-MM-DD
      const primeiroDiaFormatado = primeiroDiaDoMes.toISOString().split('T')[0];
      const ultimoDiaFormatado = ultimoDiaDoMes.toISOString().split('T')[0];
  
      // Consulta os documentos do mês atual
      const vendasRef = collection(db, "dailySales");
      const q = query(vendasRef, where("data", ">=", primeiroDiaFormatado), where("data", "<=", ultimoDiaFormatado));
      const querySnapshot = await getDocs(q);
  
      // Soma os totais do mês
      let totalMes = 0;
      querySnapshot.forEach((doc) => {
        totalMes += doc.data().total;
      });
  
      return totalMes;
    } catch (error) {
      console.error("Erro ao calcular vendas do mês:", error);
      return null;
    }
  };