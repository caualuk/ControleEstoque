import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
  apiKey: "AIzaSyD_qIO-amtLA_NibLDNXNLZpPTw91cmZII",
  authDomain: "deposito-f5485.firebaseapp.com",
  projectId: "deposito-f5485",
  storageBucket: "deposito-f5485.firebasestorage.app",
  messagingSenderId: "498568571673",
  appId: "1:498568571673:web:89c7c3dd4cd9bd774eb388",
  measurementId: "G-E9V3YJK85J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, collection, addDoc };