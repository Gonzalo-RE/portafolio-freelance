document.addEventListener('DOMContentLoaded', () => {
    const contenedorServicios = document.getElementById('contenedor-servicios');
    const formContacto = document.getElementById('form-contacto');
    const mensajeFeedback = document.getElementById('mensaje-feedback');

   
    const API_URL = 'https://dantenetwork.gt.tc/index.php?action=api_servicios';
    

    // 1. Función asíncrona para consumir la API de Servicios Backend
    async function cargarServiciosDesdeAPI() {
        try {
            const respuesta = await fetch(API_URL);

            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }

            const datos = await respuesta.json();

            if (datos.status === 'success' && datos.data.length > 0) {
                // Limpiar la animación de carga
                contenedorServicios.innerHTML = '';

                // Renderizar dinámicamente cada servicio retornado por la API
                datos.data.forEach(servicio => {
                    const articulo = document.createElement('article');
                    articulo.className = 'tarjeta-proyecto';

                    articulo.innerHTML = `
                        <div>
                            <span class="tag-badge">Servicio Backend</span>
                            <h3>${sanitizarHTML(servicio.nombre)}</h3>
                            <p>${sanitizarHTML(servicio.descripcion)}</p>
                        </div>
                        <div>
                            <p class="precio-api">$${parseFloat(servicio.precio).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</p>
                            <a href="#contacto" class="btn-proyecto secundario">Solicitar Cotización</a>
                        </div>
                    `;

                    contenedorServicios.appendChild(articulo);
                });
            } else {
                contenedorServicios.innerHTML = `
                    <p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary);">
                        No se encontraron servicios disponibles en la API.
                    </p>`;
            }
        } catch (error) {
            console.error('Error al conectar con la API de servicios:', error);
            contenedorServicios.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; background: rgba(255, 69, 58, 0.15); border: 1px solid rgba(255, 69, 58, 0.3); padding: 20px; border-radius: 12px; color: #ff453a;">
                    ⚠️ No se pudo cargar los servicios dinámicos. Asegúrate de que el servidor backend (XAMPP o Nube) esté activo.
                </div>
            `;
        }
    }

    // 2. Helper de seguridad contra ataques XSS en renderizado dinámico del DOM
    function sanitizarHTML(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }

    // 3. Procesamiento del Formulario de Contacto
    if (formContacto) {
        formContacto.addEventListener('submit', (e) => {
            e.preventDefault();
            
            mensajeFeedback.className = 'feedback-box exito';
            mensajeFeedback.textContent = '¡Gracias por tu mensaje! Te responderé a la brevedad.';
            formContacto.reset();

            setTimeout(() => {
                mensajeFeedback.style.display = 'none';
            }, 5000);
        });
    }

    // Ejecutar el consumo asíncrono de la API al cargar la página
    cargarServiciosDesdeAPI();
});