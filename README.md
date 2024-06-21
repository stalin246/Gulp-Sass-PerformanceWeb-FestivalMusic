
# FestivalMusic-Gulp-Sass

Página web para un festival de música utilizando Gulp para la automatización de tareas y Sass para la gestión de estilos CSS. La página incluye secciones como información sobre el festival, lineup, boletos, galería y contacto.

## Descripción

El proyecto "Techno & EDM Festival" es una página web interactiva diseñada para promover un festival de música. Utiliza tecnologías modernas como Gulp y Sass para facilitar el desarrollo y la gestión de estilos. Las principales características incluyen una galería de imágenes, una sección de boletos, un lineup de artistas y una navegación fluida entre secciones.

## Características Principales

- **Navegación fija:** El encabezado se mantiene fijo en la parte superior al hacer scroll.
- **Galería de imágenes:** Una galería interactiva que muestra imágenes en un modal cuando se hace clic en ellas.
- **Enlaces resaltados:** Los enlaces de navegación se resaltan automáticamente según la sección visible en la pantalla.
- **Desplazamiento suave:** Navegación suave entre secciones al hacer clic en los enlaces del menú.
- **Compilación automática de Sass a CSS:** Utiliza Gulp para compilar archivos Sass a CSS y observa cambios en tiempo real.
- **Organización modular de CSS:** El uso de Sass permite escribir estilos de manera modular y más eficiente.

## Tecnologías Utilizadas

- **HTML**
- **CSS (Sass)**
- **JavaScript**
- **Gulp**
- **Node.js y NPM**

## Instalación

Sigue estos pasos para instalar y configurar el proyecto en tu máquina local:

1. **Clonar el repositorio:**

   ```sh
   git clone https://github.com/tu-usuario/Gulp-Sass-FestivalMusic.git
   ```

2. **Navegar al directorio del proyecto:**

   ```sh
   cd Gulp-Sass-FestivalMusic
   ```

3. **Instalar las dependencias:**

   ```sh
   npm install
   ```

## Uso

Sigue estos pasos para compilar el proyecto y ejecutar las tareas de desarrollo:

1. **Ejecutar las tareas de desarrollo:**

   ```sh
   npm run dev
   ```

   Este comando iniciará Gulp, que observará los archivos Sass y JavaScript para compilar y generar los archivos correspondientes en el directorio `dist/`.

## Estructura del Proyecto

- **src/scss/**: Archivos Sass para los estilos.
- **src/js/**: Archivos JavaScript para la interactividad.
- **dist/**: Archivos compilados y generados.
- **gulpfile.js**: Configuración de tareas de Gulp.
- **package.json**: Dependencias y scripts del proyecto.

## Contribuir

Si deseas contribuir al proyecto, por favor sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una rama con tu nueva funcionalidad (`git checkout -b nueva-funcionalidad`).
3. Realiza los cambios necesarios y haz un commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Empuja los cambios a la rama (`git push origin nueva-funcionalidad`).
5. Abre un Pull Request.

## Autor

Luis Valencia

## Licencia

Este proyecto está bajo la licencia ISC.
