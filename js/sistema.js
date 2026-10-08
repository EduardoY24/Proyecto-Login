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
 * idSeccionAMostrar - El id de la sección que se quiere ver.
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

/* ===== 3. Formulario de alumnos: validación del número de control ===== */

var formAlumno = document.getElementById("formAlumno");

/**
 * Revisa que un texto tenga únicamente dígitos del 0 al 9.
 *  texto - El texto a revisar.
 * true si todos los caracteres son dígitos.
 */
function soloDigitos(texto) {
  var todosSonDigitos = true;

  for (var i = 0; i < texto.length; i++) {
    var caracter = texto.charAt(i);

    if (caracter < "0" || caracter > "9") {
      todosSonDigitos = false;
    }
  }

  return todosSonDigitos;
}

formAlumno.addEventListener("submit", function (evento) {
  // Evitamos que el formulario recargue la página.
  evento.preventDefault();

  var nombre = document.getElementById("alumnoNombre").value.trim();
  var numeroControl = document.getElementById("alumnoNumeroControl").value.trim();

  var errorNombre = document.getElementById("errorAlumnoNombre");
  var errorNumeroControl = document.getElementById("errorAlumnoNumeroControl");
  var mensajeExito = document.getElementById("mensajeAlumnoExito");

  // Ocultamos el mensaje de éxito de un registro anterior.
  mensajeExito.classList.add("d-none");

  // Esta variable cambia a false si algo no cumple.
  var formularioValido = true;

  // --- Validación del nombre ---
  if (nombre === "") {
    errorNombre.textContent = "Escribe el nombre del alumno.";
    formularioValido = false;
  } else {
    errorNombre.textContent = "";
  }

  // --- Validación del número de control (exactamente 6 dígitos) ---
  if (numeroControl === "") {
    errorNumeroControl.textContent = "Escribe el número de control.";
    formularioValido = false;
  } else {
    if (soloDigitos(numeroControl) === false) {
      errorNumeroControl.textContent = "El número de control solo puede tener dígitos (0-9).";
      formularioValido = false;
    } else {
      // validarLongitud viene de utileria.js: revisa que NO pase de 6.
      if (validarLongitud(numeroControl, 6) === false) {
        errorNumeroControl.textContent = "El número de control no puede tener más de 6 dígitos.";
        formularioValido = false;
      } else {
        // validarLongitud no revisa que lleguen a 6, lo revisamos aquí.
        if (numeroControl.length < 6) {
          errorNumeroControl.textContent = "El número de control debe tener exactamente 6 dígitos.";
          formularioValido = false;
        } else {
          errorNumeroControl.textContent = "";
        }
      }
    }
  }

 // Si todo es válido, mostramos el mensaje de éxito y limpiamos el formulario.
   // Si el nombre y el número de control son válidos, revisamos la fecha.
  if (formularioValido === true) {
    var fechaNacimiento = document.getElementById("alumnoFechaNacimiento").value;
    var errorFecha = document.getElementById("errorAlumnoFecha");
    errorFecha.textContent = "";

    if (fechaNacimiento === "") {
      errorFecha.textContent = "Selecciona la fecha de nacimiento.";
      return;
    }

    // calcularEdad y esMayorDeEdad vienen de utileria.js.
    var edad = calcularEdad(fechaNacimiento);

    // Si la edad es negativa, la fecha es del futuro.
    if (edad < 0) {
      errorFecha.textContent = "La fecha de nacimiento no puede ser futura.";
      return;
    }

    var esMayor = esMayorDeEdad(fechaNacimiento);
    var textoResultado = "";

    if (esMayor === true) {
      textoResultado = nombre + " tiene " + edad + " años, por lo tanto SÍ es mayor de edad.";
    } else {
      textoResultado = nombre + " tiene " + edad + " años, por lo tanto NO es mayor de edad.";
    }

    // Escribimos el resultado dentro del modal y lo mostramos.
    document.getElementById("modalEdadTexto").textContent = textoResultado;
    var modalEdad = bootstrap.Modal.getOrCreateInstance(document.getElementById("modalEdad"));
    modalEdad.show();

    mensajeExito.classList.remove("d-none");
    formAlumno.reset();
  }
});