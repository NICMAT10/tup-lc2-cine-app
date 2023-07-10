//Paginacion
let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
  if (pagina < 89) {
    pagina += 1;
    cargarPeliculas();
  }
});

btnAnterior.addEventListener('click', () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
  }
});

async function cargarPeliculas() {
  const resultados = await obtenerDatosAPI();

  const cartelera = document.getElementById('contenedorPeliculas');
  cartelera.innerHTML = '';

  for (const pelicula of resultados) {
    const { poster_path, title, id, original_title, original_language, release_date } = pelicula;

    const tarjeta = document.createElement('div');
    tarjeta.classList.add('cartelera');
    tarjeta.innerHTML = `
      <div class="pelicula">
        <img class="poster" src="https://image.tmdb.org/t/p/w500/${poster_path}">
        <h3 class="titulo">${title}</h3>
        <p><b>Código:</b> <span class="codigo">${id}</span><br>
        <b>Título original:</b> ${original_title}<br>
        <b>Idioma original:</b> ${original_language}<br>
        <b>Año:</b> ${release_date}<br>
        <button class="button radius medium agregar-favoritos">Agregar a Favoritos</button>
      </div>`;

    cartelera.appendChild(tarjeta);
  }
  
}

async function obtenerDatosAPI() {
  try {
    const apiKey = '9f8b29787abf3118f815587d67917a25'; 
    const language = 'es-ES';

    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=${language}&page=${pagina}`;

    const response = await fetch(url);
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error('Error en al obtener los datos de api', error);
    return [];
  }
}


// Evento para agregar películas a favoritos por código
const formFavoritos = document.getElementById('form-favoritos');
formFavoritos.addEventListener('submit', async (event) => {
  event.preventDefault();
  const codigoInput = document.getElementById('movie-codigo');
  const codigo = parseInt(codigoInput.value.trim());

  if (!isNaN(codigo)) {
    await agregarPeliculaPorCodigo(codigo);
  } else {
    mostrarMensaje('error');
  }

  codigoInput.value = '';
});

// Evento para agregar películas a favoritos por botón
const cartelera = document.getElementById('contenedorPeliculas');
cartelera.addEventListener('click', async (event) => {
  if (event.target.classList.contains('agregar-favoritos')) {
    const tarjeta = event.target.closest('.cartelera');
    const codigo = parseInt(tarjeta.querySelector('.codigo').textContent);
    await agregarPeliculaPorCodigo(codigo);
  }
});

// Función para agregar películas a favoritos por código
async function agregarPeliculaPorCodigo(codigo) {
  try {
    const favoritos = JSON.parse(localStorage.getItem('FAVORITOS')) || [];

    if (favoritos.includes(codigo)) {
      mostrarMensaje('warning');
      return;
    }

    const resultados = await obtenerDatosAPI();
    const peliculaExistente = resultados.find((pelicula) => pelicula.id === codigo);

    if (!peliculaExistente) {
      mostrarMensaje('error');
      return;
    }

    favoritos.push(codigo);
    localStorage.setItem('FAVORITOS', JSON.stringify(favoritos));
    mostrarMensaje('success');
  } catch (error) {
    console.error('Error, no se agrego la pelicula por el codigo', error);
    mostrarMensaje('error');
  }
}

// Función para mostrar mensajes
function mostrarMensaje(idMensaje) {
  const mensajes = {
    success: 'Película agregada con éxito',
    error: 'Error: La Película seleccionada no se encuentra en la API o se produjo un error al consultar',
    warning: 'La Película ingresada ya se encuentra almacenada'
  };

  const mensajeElement = document.getElementById('sec-messages');
  const mensaje = mensajeElement.querySelector(`#${idMensaje}-message`);
  mensaje.style.display = 'block';

  setTimeout(() => {
    mensaje.style.display = 'none';
  }, 2500);
}

// Inicializar la carga de películas al cargar la página
cargarPeliculas();
