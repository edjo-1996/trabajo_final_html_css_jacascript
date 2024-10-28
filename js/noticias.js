
// Función para cargar las noticias desde el archivo JSON
const cargarNoticias = () => {
  // Usamos fetch para obtener el archivo JSON
  fetch('/js/noticias.json')
    .then(response => {




      if (!response.ok) {
        throw new Error('Error al cargar las noticias');
      }
      return response.json(); // Convertimos la respuesta en un objeto JSON
    })
    .then(noticias => {
      // Iteramos sobre cada noticia y las agregamos al DOM




      const noticiasContainer = document.getElementById('noticias-container');


      noticias.forEach(noticia => {
        // Creamos un nuevo elemento para cada noticia
        const noticiaElemento = document.createElement('div');
        noticiaElemento.classList.add('noticia');

        // Agregamos el título
        const tituloElemento = document.createElement('h2');
        tituloElemento.textContent = noticia.titulo;
        noticiaElemento.appendChild(tituloElemento);

        // Agregamos la descripción de la noticia
        const descripcionElemento = document.createElement('p');
        descripcionElemento.textContent = noticia.descripcion;
        noticiaElemento.appendChild(descripcionElemento);

        // Agregamos el enlace
        const enlaceElemento = document.createElement('a');
        enlaceElemento.href = noticia.enlace;
        enlaceElemento.classList.add('a-button');
        enlaceElemento.textContent = 'Leer más';
        enlaceElemento.target = '_blank'; // Abre el enlace en una nueva pestaña
        noticiaElemento.appendChild(enlaceElemento);

        // Agregamos el elemento de la noticia al contenedor
        noticiasContainer.appendChild(noticiaElemento);
      });
    })
    .catch(error => {
      console.error('Hubo un problema con la carga de las noticias:', error);
    });
}

// Llamamos a la función para cargar las noticias
cargarNoticias();

