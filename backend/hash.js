const admin = require("firebase-admin");
const serviceAccount = require("./deposito-f5485-firebase-adminsdk-fbsvc-7185f7ab3e.json");
const bcrypt = require("bcrypt");

// Inicialize o Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Função para hashar a senha
async function hashPassword(password) {
  const saltRounds = 10; // Custo do hash (quanto maior, mais seguro, mas mais lento)
  return await bcrypt.hash(password, saltRounds);
}

// Função para atualizar a senha no Firestore
async function updateUserPassword(username, newPassword) {
  try {
    // Gera o hash da nova senha
    const hashedPassword = await hashPassword(newPassword);

    // Busca o usuário no Firestore
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("username", "==", username).get();

    if (snapshot.empty) {
      console.log("Usuário não encontrado");
      return;
    }

    // Atualiza a senha do usuário com o hash
    const userDoc = snapshot.docs[0];
    await userDoc.ref.update({ password: hashedPassword });

    console.log(`Senha do usuário ${username} atualizada para hash.`);
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
  }
}

// Exemplo de uso
updateUserPassword("caua", "1412"); // Substitua "caua" pelo nome de usuário correto