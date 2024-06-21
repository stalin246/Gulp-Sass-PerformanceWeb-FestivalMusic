// Importamos las funciones src, dest, y watch de gulp
import { src, dest, watch, series } from 'gulp';

// Importamos gulpSass de 'gulp-sass' y dartSass de 'sass'
import gulpSass from 'gulp-sass'; // Importa el plugin gulp-sass
import * as dartSass from 'sass'; // Importa dartSass de la librería 'sass'

// Configuramos gulpSass para que utilice dartSass
const sass = gulpSass(dartSass); // Configura gulpSass para usar dartSass

// Definimos una función para manejar archivos JavaScript
export function js(done) {
  src('src/js/app.js') // Selecciona el archivo app.js en el directorio src/js
    .pipe(dest('dist/js')); // Copia el archivo a la carpeta dist/js

  done(); // Indica que la tarea ha finalizado
}

// Definimos una función para compilar archivos SASS a CSS
export function css(done) {
  src('src/scss/app.scss', { sourcemaps: true }) // Selecciona el archivo app.scss en el directorio src/scss y habilita sourcemaps
    .pipe(sass().on('error', sass.logError)) // Compila SASS a CSS y maneja errores
    .pipe(dest('dist/css', { sourcemaps: true })); // Guarda el CSS compilado en el directorio dist/css y habilita sourcemaps

  done(); // Indica que la tarea ha finalizado
}

// Definimos una función para observar cambios en archivos SASS y JavaScript
export function dev() {
  watch('src/scss/**/*.scss', css); // Observa cambios en archivos .scss dentro de src/scss y subdirectorios y ejecuta la tarea css
  watch('src/js/**/*.js', js); // Observa cambios en archivos .js dentro de src/js y subdirectorios y ejecuta la tarea js
}

// Definimos la tarea por defecto para ejecutar en serie las tareas js, css y dev
export default series(js, css, dev); // Ejecuta las tareas en orden: js, css y dev
