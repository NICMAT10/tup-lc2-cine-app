
/*async function obtenerDatosAPI() {
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
});*/