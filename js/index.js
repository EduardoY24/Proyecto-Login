// index.js - navbar con el usuario y cierre de sesión (Integrante A)

// Leemos el correo que se guardó en login.js.
var usuario = sessionStorage.getItem("usuario");

// Protección: si no hay sesión, regresamos al login.
if (usuario === null) {
    window.location.replace("login.html");
}

// Mostramos el correo en el navbar.
var nombreUsuario = document.getElementById("nombreUsuario");
if (usuario !== null) {
    nombreUsuario.textContent = usuario;
}

// Salir del sistema: borramos la sesión y volvemos al login.
var btnSalir = document.getElementById("btnSalir");
btnSalir.addEventListener("click", function (event) {
    event.preventDefault();
    sessionStorage.removeItem("usuario");
    window.location.replace("login.html");
});

// ===== Formulario de Captura de usuarios =====

var formCaptura = document.getElementById("formCaptura");

formCaptura.addEventListener("submit", function (event) {
    // Evitamos que el formulario recargue la página.
    event.preventDefault();

    var capUsuario = document.getElementById("capUsuario").value.trim();
    var capCorreo = document.getElementById("capCorreo").value.trim();
    var capPassword = document.getElementById("capPassword").value;

    var errorUsuario = document.getElementById("errorCapUsuario");
    var errorCorreo = document.getElementById("errorCapCorreo");
    var errorPassword = document.getElementById("errorCapPassword");
    var mensajeExito = document.getElementById("mensajeCapturaExito");

    // Limpiamos los mensajes de un intento anterior.
    errorUsuario.textContent = "";
    errorCorreo.textContent = "";
    errorPassword.textContent = "";
    mensajeExito.classList.add("d-none");

    // Cambia a false si algún campo no cumple.
    var formularioValido = true;

    if (capUsuario === "") {
        errorUsuario.textContent = "Escribe el nombre de usuario.";
        formularioValido = false;
    }

    // validarCorreo viene de utileria.js.
    if (!validarCorreo(capCorreo)) {
        errorCorreo.textContent = "El correo no tiene un formato válido.";
        formularioValido = false;
    }

    // validarPassword viene de utileria.js.
    if (!validarPassword(capPassword)) {
        errorPassword.textContent = "La contraseña no cumple con los requisitos.";
        formularioValido = false;
    }

    // Si todo está bien, mostramos el mensaje y limpiamos el formulario.
    if (formularioValido) {
        mensajeExito.textContent = "Usuario " + capUsuario + " capturado correctamente.";
        mensajeExito.classList.remove("d-none");
        formCaptura.reset();
    }
});
