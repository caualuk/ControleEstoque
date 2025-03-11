import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";

const consultarVendas = async (data) => {
    try {
        const docRef = doc(db, "dailySales", data);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            console.log("Total de vendas em", data, ":", docSnap.data().total);
            return docSnap.data().total;
        } else{
            console.log("Nenhuma venda encontrada para a data:", data);
            return 0;
        }
    } catch (error) {
        console.error("Erro ao consultar vendas diarias:", error);
        return null;
    }
}

