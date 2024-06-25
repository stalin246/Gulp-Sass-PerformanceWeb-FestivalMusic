// Ejecuta las funciones cuando el contenido del DOM se ha cargado completamente
document.addEventListener('DOMContentLoaded', function(){
    navegacionFija(); // Llama a la función para la navegación fija
    crearGaleria();   // Llama a la función para crear la galería
    resaltarEnlace(); // Llama a la función para resaltar los enlaces de navegación
    scrollNav();      // Llama a la función para el desplazamiento suave de la navegación
});

// Función para la navegación fija
function navegacionFija(){
    const header = document.querySelector('header'); // Selecciona el elemento 'header'
    const sobreFestival = document.querySelector('.sobre-festival'); // Selecciona el elemento con la clase 'sobre-festival'

    // Agrega un event listener para el evento de desplazamiento (scroll)
    document.addEventListener('scroll', function(){
        // Verifica si la parte inferior del elemento 'sobre-festival' está por encima del viewport
        if(sobreFestival.getBoundingClientRect().bottom < 1){
            header.classList.add('fixed'); // Añade la clase 'fixed' al header
        } else {
            header.classList.remove('fixed'); // Remueve la clase 'fixed' del header
        }
    });
}

// Función para crear la galería de imágenes
function crearGaleria(){
    const CANT_IMG = 16; // Define la cantidad de imágenes en la galería
    const galeria = document.querySelector('.galeria-imagenes'); // Selecciona el contenedor de la galería

    // Crea y añade las imágenes a la galería
    for(let i = 1; i <= CANT_IMG; i++){
        const imagen = document.createElement('Picture'); // Crea un nuevo elemento de imagen
        // Define el contenido HTML del elemento 'picture' con varias fuentes de imagen
        imagen.innerHTML = `
            <source srcset="dist/img/gallery/thumb/${i}.avif" type="image/avif">
            <source srcset="dist/img/gallery/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="dist/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
        `;

      
        galeria.appendChild(imagen); // Añade la imagen a la galería

        // Agrega un event listener para mostrar la imagen en un modal al hacer clic
        imagen.onclick = function(){
            mostrarImagen(i); // Llama a la función para mostrar la imagen en un modal
        }
    }
}

// Función para mostrar una imagen en un modal
function mostrarImagen(i){
    const imagen = document.createElement('PICTURE'); // Crea un nuevo elemento de imagen
    // Define el contenido HTML del elemento 'picture' con varias fuentes de imagen
    imagen.innerHTML = `
        <source srcset="dist/img/gallery/full/${i}.avif" type="image/avif">
        <source srcset="dist/img/gallery/full/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="dist/img/gallery/full/${i}.jpg" alt="imagen galeria">
    `;

    // Crea el modal
    const modal = document.createElement('DIV'); // Crea un nuevo elemento de div para el modal
    modal.classList.add('modal'); // Añade la clase 'modal' al div
    modal.onclick = cerrarModal; // Cierra el modal al hacer clic en cualquier parte del mismo

    // Crea el botón para cerrar el modal
    const cerrarModalBtn = document.createElement('BUTTON'); // Crea un nuevo elemento de botón
    cerrarModalBtn.textContent = 'X'; // Establece el texto del botón
    cerrarModalBtn.classList.add('btn-cerrar'); // Añade la clase 'btn-cerrar' al botón
    cerrarModalBtn.onclick = cerrarModal; // Cierra el modal al hacer clic en el botón

    modal.appendChild(imagen); // Añade la imagen al modal
    modal.appendChild(cerrarModalBtn); // Añade el botón de cerrar al modal

    // Añade el modal al cuerpo del documento
    const body = document.querySelector('body'); // Selecciona el elemento 'body'
    body.classList.add('overflow-hidden'); // Añade la clase 'overflow-hidden' al cuerpo para evitar el desplazamiento
    body.appendChild(modal); // Añade el modal al cuerpo del documento
}

// Función para cerrar el modal
function cerrarModal(){
    const modal = document.querySelector('.modal'); // Selecciona el modal
    modal.classList.add('fade-Out'); // Añade la clase 'fade-Out' para la animación de salida

    // Elimina el modal después de 500 ms (tiempo de la animación)
    setTimeout(() => {
        modal?.remove(); // Elimina el modal del DOM
        const body = document.querySelector('body'); // Selecciona el elemento 'body'
        body.classList.remove('overflow-hidden'); // Remueve la clase 'overflow-hidden' del cuerpo
    }, 500);
}

// Función para resaltar el enlace de navegación correspondiente a la sección visible
function resaltarEnlace(){
    document.addEventListener('scroll', function(){
       const sections = document.querySelectorAll('section'); // Selecciona todas las secciones
       const navLinks = document.querySelectorAll('.navegacion-principal a'); // Selecciona todos los enlaces de la navegación principal

       let actual = ''; // Variable para almacenar la sección actual visible

       // Itera sobre cada sección para determinar cuál está visible
       sections.forEach(section => {
           const sectionTop = section.offsetTop; // Calcula la distancia desde la parte superior del documento hasta la sección
           const sectionHeight = section.clientHeight; // Obtiene la altura de la sección
           if (window.scrollY >= (sectionTop - sectionHeight / 3)){ // Verifica si la sección está en la vista actual
               actual = section.id; // Establece 'actual' al id de la sección visible
           }
       });

       // Itera sobre cada enlace de navegación
       navLinks.forEach(link => {
           link.classList.remove('active'); // Remueve la clase 'active' de todos los enlaces
           if(link.getAttribute('href') === '#' + actual){ // Verifica si el enlace corresponde a la sección actual
               link.classList.add('active'); // Añade la clase 'active' al enlace correspondiente
           }
       });
    });
}

// Función para el desplazamiento suave de la navegación
function scrollNav(){
    const navLinks = document.querySelectorAll('.navegacion-principal a'); // Selecciona todos los enlaces de la navegación principal

    // Itera sobre cada enlace de navegación
    navLinks.forEach(link => {
        // Agrega un event listener para el evento de clic en cada enlace
        link.addEventListener('click', e => {
            e.preventDefault(); // Previene el comportamiento predeterminado del enlace (desplazamiento instantáneo)
            const sectionScroll = e.target.getAttribute('href'); // Obtiene el valor del atributo href del enlace
            const section = document.querySelector(sectionScroll); // Selecciona la sección correspondiente
            section.scrollIntoView({ behavior: 'smooth' }); // Desplaza suavemente la vista hasta la sección seleccionada
        });
    });
}
