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
