// index.js - navbar con el usuario y cierre de sesión (Integrante A)

// Leemos el correo que se guardó en login.js.
var usuario = sessionStorage.getItem("usuario");

// Mostramos el correo en el navbar.
var nombreUsuario = document.getElementById("nombreUsuario");
if (usuario !== null) {
    nombreUsuario.textContent = usuario;
}
