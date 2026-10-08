/*
  sistema.js
  --------------------------------------------------
  Lógica de la parte interna del sistema (index.html) - Integrante B.
  Aquí se controla:
  1. El botón hamburguesa que abre y cierra el sidebar.
  2. El cambio de sección desde el menú lateral.
  3. El formulario de alumnos y la validación del número de control.
  4. El modal que dice si el alumno es mayor de edad.
*/
/* ===== 1. Botón hamburguesa: abrir y cerrar el sidebar ===== */

// Guardamos el botón y el panel del sidebar en variables.
var botonHamburguesa = document.getElementById("botonHamburguesa");
var elementoSidebar = document.getElementById("sidebar");

botonHamburguesa.addEventListener("click", function () {
  // getOrCreateInstance le pide a Bootstrap el "control" de este panel.
  var sidebarBootstrap = bootstrap.Offcanvas.getOrCreateInstance(elementoSidebar);

  // toggle() abre el panel si está cerrado y lo cierra si está abierto.
  sidebarBootstrap.toggle();
});
/* ===== 2. Cambiar de sección desde el sidebar ===== */

// Los ids de las secciones que viven dentro de <main>.
// seccionCaptura es de Eduardo, seccionInicio y seccionAlumnos son mías.
var idsDeSecciones = ["seccionInicio", "seccionCaptura", "seccionAlumnos"];

/**
 * Muestra una sección y oculta las demás. Después cierra el sidebar.
 * @param {string} idSeccionAMostrar - El id de la sección que se quiere ver.
 */
function mostrarSeccion(idSeccionAMostrar) {
  for (var i = 0; i < idsDeSecciones.length; i++) {
    var seccion = document.getElementById(idsDeSecciones[i]);

    // Si la sección todavía no existe en la página, la saltamos.
    if (seccion !== null) {
      if (idsDeSecciones[i] === idSeccionAMostrar) {
        seccion.classList.remove("d-none");
      } else {
        seccion.classList.add("d-none");
      }
    }
  }

  // Cerramos el sidebar para que se vea el contenido.
  var sidebarBootstrap = bootstrap.Offcanvas.getOrCreateInstance(elementoSidebar);
  sidebarBootstrap.hide();
}

/**
 * Conecta un enlace del sidebar con una sección.
 * idEnlace - El id del enlace del menú.
 * dSeccion - El id de la sección que debe mostrar.
 */
function conectarEnlace(idEnlace, idSeccion) {
  var enlace = document.getElementById(idEnlace);

  if (enlace !== null) {
    enlace.addEventListener("click", function (evento) {
      // preventDefault evita que el "#" del enlace mueva la página hacia arriba.
      evento.preventDefault();
      mostrarSeccion(idSeccion);
    });
  }
}

conectarEnlace("enlaceInicio", "seccionInicio");
conectarEnlace("enlaceCaptura", "seccionCaptura");
conectarEnlace("enlaceAlumnos", "seccionAlumnos");

// Al cargar la página, mostramos solo la sección de inicio.
mostrarSeccion("seccionInicio");