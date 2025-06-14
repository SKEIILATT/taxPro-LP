import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getDatabase, ref, set, push, get} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Configuración del Firebase con el .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Obtiene la base de datos del firebase
const database = getDatabase(app);
//Método POST
document.getElementById("consultaForm").addEventListener("submit", async function(e){
    e.preventDefault();
    const consulta = {
        nombre: document.getElementById("nombre").value,
        cedula: document.getElementById("cedula").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        tipoCliente: document.getElementById("tipoCliente").value,
        servicio: document.getElementById("servicio").value,
        urgencia: document.getElementById("urgencia").value,
        descripcion: document.getElementById("descripcion").value,
        fecha: new Date().toISOString()
    };
    // Guardar en Firebase
    const consultasRef = ref(database, "consultas");
    const nuevaConsulta = push(consultasRef);
    await set(nuevaConsulta,consulta);
    
    alert("Datos enviados correctamente!");
    e.target.reset();
});

// GET: Leer todas las consultas desde Firebase y se la muestra en consola (prueba del get )
export async function obtenerConsultas() {
  const consultasRef = ref(database, "consultas");
  const snapshot = await get(consultasRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
}

//Esto es solo para prueba del get
obtenerConsultas().then(data => console.log("Consultas en Firebase:", data));




export { app, analytics, database };