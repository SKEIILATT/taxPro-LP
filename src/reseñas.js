
document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    const nombreReview = document.getElementById('nombreReview');
    const servicioReview = document.getElementById('servicioReview');
    const calificacion = document.getElementById('calificacion');
    const comentarios = document.getElementById('comentarios');
    const reviewPreview = document.getElementById('reviewPreview');
    const previewContent = document.getElementById('previewContent');

    // Función para generar estrellas
    function generarEstrellas(rating) {
        let estrellas = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                estrellas += '<svg class="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
            } else {
                estrellas += '<svg class="h-4 w-4 text-stone-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
            }
        }
        return estrellas;
    }

    // Función para obtener iniciales del nombre
    function obtenerIniciales(nombre) {
        return nombre.split(' ').map(word => word.charAt(0)).join('').toUpperCase().substring(0, 2);
    }

    // Función para obtener nombre del servicio
    function obtenerNombreServicio(valor) {
        const servicios = {
            'declaracion-iva': 'Declaración de IVA',
            'declaracion-renta': 'Declaración Impuesto a la Renta',
            'anexos-gastos': 'Anexos de Gastos Personales',
            'devolucion-iva-tercera-edad': 'Devolución IVA Tercera Edad',
            'devolucion-retenciones': 'Devolución de Retenciones',
            'gestion-ruc': 'Gestión de RUC',
            'firma-electronica': 'Firma Electrónica',
            'consultoria-general': 'Consultoría General'
        };
        return servicios[valor] || valor;
    }

    // Función para actualizar vista previa
    function actualizarVistaPrevia() {
        const nombre = nombreReview.value;
        const servicio = servicioReview.value;
        const rating = parseInt(calificacion.value);
        const comentario = comentarios.value;

        if (nombre && servicio && rating) {
            const iniciales = obtenerIniciales(nombre);
            const nombreServicio = obtenerNombreServicio(servicio);
            const estrellas = generarEstrellas(rating);

            previewContent.innerHTML = `
                <div class="flex items-start space-x-4">
                    <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-semibold text-sm">
                        ${iniciales}
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-semibold text-white text-sm">${nombre}</h4>
                            <div class="flex space-x-1">
                                ${estrellas}
                            </div>
                        </div>
                        <div class="text-yellow-400 text-xs mb-2">${nombreServicio}</div>
                        ${comentario ? `<p class="text-stone-300 text-xs">"${comentario}"</p>` : ''}
                        <div class="text-stone-400 text-xs mt-2">Ahora</div>
                    </div>
                </div>
            `;
            reviewPreview.classList.remove('hidden');
        } else {
            reviewPreview.classList.add('hidden');
        }
    }

    // Event listeners para vista previa en tiempo real
    nombreReview.addEventListener('input', actualizarVistaPrevia);
    servicioReview.addEventListener('change', actualizarVistaPrevia);
    calificacion.addEventListener('change', actualizarVistaPrevia);
    comentarios.addEventListener('input', actualizarVistaPrevia);

    // Manejo del envío del formulario
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = reviewForm.querySelector('button[type="submit"]');
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
            alert('¡Gracias por tu reseña! Tu opinión es muy importante para nosotros.');
            reviewForm.reset();
            reviewPreview.classList.add('hidden');
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
});
