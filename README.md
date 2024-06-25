
# Festival Musica - Introduccion a Performance Web

## Introducción al Performance Web

El performance web se refiere a la velocidad y eficiencia con la que un sitio web se carga y se ejecuta en un navegador. Un buen performance es crucial para una experiencia de usuario positiva y para retener a los visitantes. Los conceptos clave incluyen:

1. **Tiempo de Carga:** Tiempo que tarda una página en cargarse completamente.
2. **Interactividad:** Rapidez con la que una página responde a las interacciones del usuario.
3. **Estabilidad Visual:** Estabilidad de los elementos visuales durante la carga.
4. **Renderizado:** Proceso de construcción de la página en el navegador.

Optimizar estos aspectos reduce el tiempo de carga y mejora la experiencia del usuario.

## Minificar CSS y JS

Minificar es eliminar caracteres innecesarios (espacios, comentarios) de los archivos de código sin cambiar su funcionalidad, reduciendo así el tamaño del archivo y el tiempo de carga.

### Ejemplos:

**CSS antes de minificar:**
```css
body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}
h1 {
    color: blue;
    font-size: 24px;
    margin-bottom: 10px;
}
```

**CSS después de minificar:**
```css
body{margin:0;padding:0;font-family:Arial,sans-serif}h1{color:blue;font-size:24px;margin-bottom:10px}
```

### Herramientas para Minificar:
- **CSS:** CSSNano, CleanCSS.
- **JavaScript:** UglifyJS, Terser.
- **Automatización:** NPM Scripts, Gulp/Grunt.

### En el proyecto:
Usamos `gulpfile.scss` y `gulp-terser` para minificar los archivos CSS y JS respectivamente.

## Agregar Lazy Loading a las Imágenes

Lazy Loading es una técnica que carga imágenes solo cuando están a punto de ser visibles, mejorando la velocidad de carga inicial y reduciendo el uso de ancho de banda.

### Ejemplo en HTML:
```html
<img src="placeholder.jpg" data-src="imagen-real.jpg" alt="Descripción de la imagen" loading="lazy">
```

### Implementación en JavaScript:
```javascript
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll("img[loading='lazy']");
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
    });
});
```

### En el proyecto:
Aplicamos Lazy Loading en imágenes del `index.html` y en la sección de galería para reducir el tamaño de carga.

## Creando versiones más pequeñas de las imágenes con Sharp

Sharp es una biblioteca de Node.js para el procesamiento de imágenes. Permite redimensionar, convertir formatos, recortar, rotar y optimizar imágenes.

### Ejemplo:
```javascript
const sharp = require('sharp');
sharp('input.jpg').resize(300, 300).toFile('output.jpg');
```

### En el proyecto:
Usamos Sharp para redimensionar imágenes de la galería, reduciendo su tamaño y mejorando el performance.

## ¿Qué es WebP? y cómo generar imágenes

WebP es un formato de imagen desarrollado por Google que ofrece compresión con y sin pérdida, permitiendo imágenes de alta calidad con tamaños de archivo más pequeños.

### Características:
- Compresión con y sin pérdida.
- Soporte para transparencia y animación.
- Mejor calidad y tamaño reducido comparado con JPEG y PNG.

### Generar imágenes WebP con Sharp:
```javascript
const sharp = require('sharp');
sharp('input.jpg').toFormat('webp').toFile('output.webp');
```

### En el proyecto:
Usamos Sharp para generar imágenes en formato WebP y las servimos usando la etiqueta `<picture>` en HTML.

## ¿Qué es AVIF? y cómo generar imágenes

AVIF es un formato de imagen basado en el códec AV1, ofreciendo alta compresión sin pérdida de calidad, soporte para HDR y transparencia.

### Generar imágenes AVIF con Sharp:
```javascript
const sharp = require('sharp');
sharp('input.jpg').toFormat('avif').toFile('output.avif');
```

### En el proyecto:
Usamos Sharp para generar imágenes en formato AVIF y las servimos usando la etiqueta `<picture>` en HTML, siguiendo el orden: AVIF, WebP, JPG/PNG.

## Sirviendo imágenes AVIF y WebP con `<picture>`

### En el proyecto:
Modificamos el archivo `index.html` y `app.js` para servir las imágenes en el orden: AVIF, WebP y JPG/PNG, asegurando el mejor performance posible.

### Ejemplo en HTML:
```html
<picture>
    <source srcset="dist/img/imagen.avif" type="image/avif">
    <source srcset="dist/img/imagen.webp" type="image/webp">
    <img src="dist/img/imagen.jpg" alt="Descripción de la imagen">
</picture>
```

Con estos cambios, el sitio carga más rápido y ofrece una mejor experiencia de usuario.
## Instrucciones de Ejecución

Para ejecutar el proyecto, sigue estos pasos:

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
