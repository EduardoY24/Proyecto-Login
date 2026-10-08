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