
//Cambiar a modo oscuro mediante el btn-tema
const botonTema = document.getElementById('btn-tema');

botonTema.addEventListener('click', function(){
    document.body.classList.toggle('modo-oscuro');

    if(document.body.classList.contains('modo-oscuro')) {
        botonTema.textContent = '☀️ Modo Claro';
    }else{
        botonTema.textContent = '🌙 Modo Oscuro';
    }
});

//Capturar el formukarui y el parrafo de estado
const formulario = document.getElementById('form-contacto');
const mensajeEstado = document.getElementById('mensaje-estado');

formulario.addEventListener('submit', function(e) {
    //Evitar que la pagina se recarge
    e.preventDefault()

    //Obtener los valores ingresados por el usuario
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    //Validar que ningun campo este vacio
    if (nombre === '' || email === '' || mensaje === '') {
        mensajeEstado.textContent = '❌ Por favor, llena todos los campos del formulario.';
        mensajeEstado.className = 'estado-error';
    } else {
        mensajeEstado.textContent = '✅ ¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.';
        mensajeEstado.className = 'estado-exito';
        formulario.reset(); // Limpia los campos del formulario
    }
});

//Cargar testimonios desde una API REST publica
async function cargarTestimonios() {
    const contenedor = document.getElementById('contenedor-testimonios');

    try {
        //Peticion a la API publica de usuarios
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3');
        const usuarios = await respuesta.json();

        //limpiar el mensaje de cargando
        contenedor.innerHTML = '';
        
        //Recorre los datos y se crea tarjetas dinamicas
        usuarios.forEach(usuario => {
            const tarjeta = document.createElement('article');
            tarjeta.className = 'card-proyecto';
            tarjeta.innerHTML = `
                <h3>${usuario.name}</h3>
                <p><strong>Empresa:</strong> ${usuario.company.name}</p>
                <p>"Gonzalo realizó un trabajo excelente. Su atención al detalle y entrega a tiempo superaron nuestras expectativas."</p>
            `;
            contenedor.appendChild(tarjeta);
        });
        
    } catch (error) {
        contenedor.innerHTML = '<p class="estado-error">Ocurrió un error al cargar los testimonios.</p>';
        console.error('Error al conectar con la API:', error);
        
    }
    
}

//Ejecutar la funcion cuando cargue la pagina
cargarTestimonios();