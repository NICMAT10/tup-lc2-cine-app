async function obtenerDatosAPI() {
  try {
      const apiKey = '9f8b29787abf3118f815587d67917a25';
      const language = 'es-ES';
      const page = 1;

      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}&page=${page}`;

      const response = await fetch(url);
      const data = await response.json();

      return data.results;
  } catch (error) {
      console.error('Error:', error);
      return [];
  }
}