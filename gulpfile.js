import path from 'path' // libreria para crear rutas o difinirlas con node
import fs from 'fs' // libreria para crear carpetas usando node
import { glob } from 'glob' // libreria de node
import sharp from 'sharp' // importamos shrap

// Importamos las funciones src, dest, y watch de gulp
import { src, dest, watch, series } from 'gulp';


// Importamos gulpSass de 'gulp-sass' y dartSass de 'sass'
import gulpSass from 'gulp-sass'; // Importa el plugin gulp-sass
import * as dartSass from 'sass'; // Importa dartSass de la librería 'sass'

// Configuramos gulpSass para que utilice dartSass
const sass = gulpSass(dartSass); // Configura gulpSass para usar dartSass

import terser from 'gulp-terser'

// Definimos una función para manejar archivos JavaScript
export function js(done) {
  src('src/js/app.js') // Selecciona el archivo app.js en el directorio src/js
    //.pipe(terser()) // Aplicamos tercer
    .pipe(dest('dist/js')); // Copia el archivo a la carpeta dist/js

  done(); // Indica que la tarea ha finalizado
}

// Definimos una función para compilar archivos SASS a CSS
export function css(done) {
  src('src/scss/app.scss', { sourcemaps: true }) // Selecciona el archivo app.scss en el directorio src/scss y habilita sourcemaps
    .pipe(sass({
      outputStyle: 'compressed' // minifica el contenido en dist/css/app.css

    }
    ).on('error', sass.logError)) // Compila SASS a CSS y maneja errores
    .pipe(dest('dist/css', { sourcemaps: true })); // Guarda el CSS compilado en el directorio dist/css y habilita sourcemaps

  done(); // Indica que la tarea ha finalizado
}

//---------------------------------------------------------------------------
// PERFOMANCE EN IMAGENES USANDO "Sharp"

export async function crop(done) {
  // Define la carpeta de entrada donde se encuentran las imágenes originales
  const inputFolder = 'src/img/gallery/full';
  // Define la carpeta de salida donde se guardarán las imágenes redimensionadas
  const outputFolder = 'src/img/gallery/thumb';
  // Define el ancho al cual se redimensionarán las imágenes
  const width = 250;
  // Define la altura a la cual se redimensionarán las imágenes
  const height = 180;

  // Verifica si la carpeta de salida existe, si no, la crea
  if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
  }

  // Lee los archivos en la carpeta de entrada y filtra solo los archivos .jpg
  const images = fs.readdirSync(inputFolder).filter(file => {
      return /\.(jpg)$/i.test(path.extname(file));
  });

  // Intenta procesar cada archivo de imagen
  try {
      images.forEach(file => {
          // Define la ruta completa del archivo de entrada
          const inputFile = path.join(inputFolder, file);
          // Define la ruta completa del archivo de salida
          const outputFile = path.join(outputFolder, file);

          // Usa Sharp para redimensionar la imagen y guardarla en la carpeta de salida
          sharp(inputFile) 
              .resize(width, height, {
                  position: 'centre'  // Asegura que la imagen esté centrada al redimensionar
              })
              .toFile(outputFile);  // Guarda la imagen redimensionada en la ruta de salida
      });

      // Llama a done() para indicar que la tarea ha finalizado
      done();
  } catch (error) {
      // Manejo de errores: imprime el error en la consola
      console.log(error);
  }
}


//---------------------------------------------------------------------------

//---------------------------------------------------------------------------
// FUNCION PARA TRANSFORMAR IMAGENES WebP

export async function imagenes(done) {
  // Define el directorio de origen donde se encuentran las imágenes originales
  const srcDir = './src/img';
  // Define el directorio de salida donde se guardarán las imágenes procesadas
  const buildDir = './dist/img';

  // Utiliza glob para obtener una lista de todas las imágenes con extensiones jpg y png
  // en el directorio de origen y sus subdirectorios
  const images = await glob('./src/img/**/*{jpg,png}');

  // Itera sobre cada archivo de imagen encontrado
  images.forEach(file => {
      // Obtiene la ruta relativa del archivo respecto al directorio de origen
      const relativePath = path.relative(srcDir, path.dirname(file));
      // Construye el directorio de salida correspondiente manteniendo la estructura de directorios
      const outputSubDir = path.join(buildDir, relativePath);
      // Llama a la función para procesar la imagen, pasando el archivo y el directorio de salida
      procesarImagenes(file, outputSubDir);
  });

  // Llama a done() para indicar que la tarea ha finalizado
  done();
}

function procesarImagenes(file, outputSubDir) {
  // Verifica si el directorio de salida existe, si no, lo crea
  if (!fs.existsSync(outputSubDir)) {
      fs.mkdirSync(outputSubDir, { recursive: true });
  }

  // Obtiene el nombre base del archivo sin la extensión
  const baseName = path.basename(file, path.extname(file));
  // Obtiene la extensión del archivo
  const extName = path.extname(file);
  // Construye la ruta completa del archivo de salida con su extensión original
  const outputFile = path.join(outputSubDir, `${baseName}${extName}`);
  // Construye la ruta completa del archivo de salida en formato WebP
  const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`);
  // Construye la ruta completa del archivo de salida en formato Avif
  const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`);

  // Define las opciones de calidad para la compresión de las imágenes
  const options = { quality: 80 };

  // Procesa y guarda la imagen en formato JPEG con las opciones definidas
  sharp(file).jpeg(options).toFile(outputFile);
  // Procesa y guarda la imagen en formato WebP con las opciones definidas
  sharp(file).webp(options).toFile(outputFileWebp);
  // Procesa y guarda la imagen en formato Avif con las opciones definidas
  sharp(file).avif().toFile(outputFileAvif);
}


//---------------------------------------------------------------------------

// Definimos una función para observar cambios en archivos SASS y JavaScript
export function dev() {
  watch('src/scss/**/*.scss', css); // Observa cambios en archivos .scss dentro de src/scss y subdirectorios y ejecuta la tarea css
  watch('src/js/**/*.js', js); // Observa cambios en archivos .js dentro de src/js y subdirectorios y ejecuta la tarea js
  // Observa los cambios en todos los archivos .png y .jpg dentro del directorio 'src/img' y sus subdirectorios,
  // y ejecuta la función 'imagenes' cuando se detectan cambios.
  watch('src/img/**/*.{png,jpg}', imagenes);

}

// Definimos la tarea por defecto para ejecutar en serie las tareas js, css y dev
export default series(imagenes, crop, js, css, dev); // Ejecuta las tareas en orden: crop, js, css, y dev

