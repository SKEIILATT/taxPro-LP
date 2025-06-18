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
/*export async function obtenerConsultas() {
  const consultasRef = ref(database, "consultas");
  const snapshot = await get(consultasRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
}*/



// --- Comportamiento en vivo para actualizar cotización e info cliente ---
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultaForm');
    const nombreInput = document.getElementById('nombre');
    const cedulaInput = document.getElementById('cedula');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');
    const tipoClienteSelect = document.getElementById('tipoCliente');
    const servicioSelect = document.getElementById('servicio');
    const urgenciaSelect = document.getElementById('urgencia');
    const descripcionTextarea = document.getElementById('descripcion');
    
    const cotizacionContent = document.getElementById('cotizacionContent');
    const clienteContent = document.getElementById('clienteContent');

    function actualizarCotizacion() {
        const servicioSeleccionado = servicioSelect.options[servicioSelect.selectedIndex];
        const urgenciaSeleccionada = urgenciaSelect.options[urgenciaSelect.selectedIndex];
        
        if (servicioSeleccionado.value) {
            const precioBase = parseFloat(servicioSeleccionado.dataset.precio) || 0;
            const multiplicador = parseFloat(urgenciaSeleccionada.dataset.multiplicador) || 1;
            const precioFinal = precioBase * multiplicador;
            const descuento = tipoClienteSelect.value === 'adulto-mayor' || tipoClienteSelect.value === 'persona-discapacidad' ? 0.15 : 0;
            const precioConDescuento = precioFinal * (1 - descuento);
            
            cotizacionContent.innerHTML = `
                <div class="space-y-4">
                    <div class="flex justify-between items-center py-2 border-b border-amber-500/20">
                        <span class="text-stone-300">Servicio:</span>
                        <span class="text-white font-semibold">${servicioSeleccionado.text.split(' - ')[0]}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-amber-500/20">
                        <span class="text-stone-300">Precio Base:</span>
                        <span class="text-white">$${precioBase}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-amber-500/20">
                        <span class="text-stone-300">Urgencia:</span>
                        <span class="text-white">${urgenciaSeleccionada.text.split(' - ')[0]}</span>
                    </div>
                    ${multiplicador > 1 ? `
                    <div class="flex justify-between items-center py-2 border-b border-amber-500/20">
                        <span class="text-stone-300">Recargo por urgencia:</span>
                        <span class="text-amber-400">+$${(precioFinal - precioBase).toFixed(2)}</span>
                    </div>
                    ` : ''}
                    ${descuento > 0 ? `
                    <div class="flex justify-between items-center py-2 border-b border-amber-500/20">
                        <span class="text-stone-300">Descuento especial:</span>
                        <span class="text-green-400">-15%</span>
                    </div>
                    ` : ''}
                    <div class="flex justify-between items-center py-3 bg-amber-500/20 rounded-lg px-4">
                        <span class="text-white font-semibold text-lg">Total:</span>
                        <span class="text-amber-400 font-bold text-2xl">$${precioConDescuento.toFixed(2)}</span>
                    </div>
                    <div class="text-center">
                        <p class="text-stone-400 text-sm">* Precios incluyen IVA</p>
                        ${descuento > 0 ? '<p class="text-green-400 text-sm">* Descuento aplicado automáticamente</p>' : ''}
                    </div>
                </div>
            `;
        }
    }

    function actualizarInfoCliente() {
        const nombre = nombreInput.value;
        const cedula = cedulaInput.value;
        const email = emailInput.value;
        const telefono = telefonoInput.value;
        const tipoCliente = tipoClienteSelect.options[tipoClienteSelect.selectedIndex].text;
        
        if (nombre || cedula || email || telefono) {
            clienteContent.innerHTML = `
                <div class="space-y-3">
                    ${nombre ? `
                    <div class="flex justify-between items-center py-2 border-b border-white/10">
                        <span class="text-stone-400">Nombre:</span>
                        <span class="text-white">${nombre}</span>
                    </div>
                    ` : ''}
                    ${cedula ? `
                    <div class="flex justify-between items-center py-2 border-b border-white/10">
                        <span class="text-stone-400">Cédula/RUC:</span>
                        <span class="text-white">${cedula}</span>
                    </div>
                    ` : ''}
                    ${email ? `
                    <div class="flex justify-between items-center py-2 border-b border-white/10">
                        <span class="text-stone-400">Email:</span>
                        <span class="text-white">${email}</span>
                    </div>
                    ` : ''}
                    ${telefono ? `
                    <div class="flex justify-between items-center py-2 border-b border-white/10">
                        <span class="text-stone-400">Teléfono:</span>
                        <span class="text-white">${telefono}</span>
                    </div>
                    ` : ''}
                    ${tipoClienteSelect.value ? `
                    <div class="flex justify-between items-center py-2">
                        <span class="text-stone-400">Tipo:</span>
                        <span class="text-blue-400">${tipoCliente}</span>
                    </div>
                    ` : ''}
                </div>
            `;
        }
    }

    // Listeners para actualización en tiempo real
    servicioSelect.addEventListener('change', actualizarCotizacion);
    urgenciaSelect.addEventListener('change', actualizarCotizacion);
    tipoClienteSelect.addEventListener('change', function() {
        actualizarCotizacion();
        actualizarInfoCliente();
    });
    nombreInput.addEventListener('input', actualizarInfoCliente);
    cedulaInput.addEventListener('input', actualizarInfoCliente);
    emailInput.addEventListener('input', actualizarInfoCliente);
    telefonoInput.addEventListener('input', actualizarInfoCliente);

    // Opcional: actualiza al cargar la página si hay datos prellenados
    actualizarCotizacion();
    actualizarInfoCliente();
});
export { app, analytics, database };