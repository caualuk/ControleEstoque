import { collection, query, where, getDocs, onSnapshot, doc, setDoc, increment } from "firebase/firestore";
import { db } from "../../firebase.js";

// Função para obter a data atual no formato YYYY-MM-DD (fuso horário local)
const getDataAtualLocal = () => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0"); // Mês começa em 0, então adicionamos 1
    const dia = String(hoje.getDate()).padStart(2, "0"); // Dia do mês
    return `${ano}-${mes}-${dia}`; // Formato YYYY-MM-DD
};

// Função para registrar uma venda diária
const registrarVendaDiaria = async (valorVenda) => {
    try {
        const dataAtual = getDataAtualLocal(); // Obtém a data local
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

// Função para obter os dias da semana
export const obterDiasDaSemana = () => {
    return ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
};

// Função para calcular as vendas da semana
export const calcularVendasDaSemana = (callback) => {
    if (typeof callback !== "function") {
        console.error("O parâmetro 'callback' deve ser uma função.");
        return;
    }

    try {
        const hoje = new Date();
        const umaSemanaAtras = new Date(hoje);
        umaSemanaAtras.setDate(hoje.getDate() - 6); // Últimos 7 dias (incluindo hoje)

        // Formata as datas para o formato YYYY-MM-DD
        const hojeFormatado = getDataAtualLocal(); // Data atual local
        const umaSemanaAtrasFormatado = `${umaSemanaAtras.getFullYear()}-${String(umaSemanaAtras.getMonth() + 1).padStart(2, "0")}-${String(umaSemanaAtras.getDate()).padStart(2, "0")}`;

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
                const data = doc.data().data; // Data no formato YYYY-MM-DD
                const dataObj = new Date(data + "T00:00:00"); // Converte para objeto Date

                // Obtém o dia da semana no formato "Seg", "Ter", etc.
                const diaDaSemana = dataObj.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "");
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

// Função para calcular as vendas do mês
export const calcularVendasDoMes = async () => {
    try {
        const hoje = new Date();
        const primeiroDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1); // Primeiro dia do mês
        const ultimoDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0); // Último dia do mês

        // Formata as datas para o formato YYYY-MM-DD
        const primeiroDiaFormatado = `${primeiroDiaDoMes.getFullYear()}-${String(primeiroDiaDoMes.getMonth() + 1).padStart(2, "0")}-${String(primeiroDiaDoMes.getDate()).padStart(2, "0")}`;
        const ultimoDiaFormatado = `${ultimoDiaDoMes.getFullYear()}-${String(ultimoDiaDoMes.getMonth() + 1).padStart(2, "0")}-${String(ultimoDiaDoMes.getDate()).padStart(2, "0")}`;

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