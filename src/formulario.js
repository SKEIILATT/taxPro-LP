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

    // Función para actualizar la cotización
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

    // Función para actualizar información del cliente
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

    // Event listeners para actualización en tiempo real
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

    // Manejo del envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simular envío
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = `
            <span class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-stone-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
            </span>
        `;
        submitButton.disabled = true;
        
        // Simular delay de envío
        setTimeout(() => {
            alert('¡Consulta enviada exitosamente! Te contactaré en las próximas 24 horas.');
            form.reset();
            cotizacionContent.innerHTML = `
                <div class="text-center py-8">
                    <svg class="mx-auto h-12 w-12 text-amber-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p class="text-stone-300">Selecciona un servicio para ver la cotización</p>
                </div>
            `;
            clienteContent.innerHTML = `
                <div class="text-center py-8">
                    <svg class="mx-auto h-12 w-12 text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p class="text-stone-300">Completa tus datos para ver el resumen</p>
                </div>
            `;
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
});