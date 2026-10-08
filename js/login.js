// login.js - validación del login y redirección a index.html (Integrante A)

// Obtenemos el formulario y sus campos.
var formLogin = document.getElementById("formLogin");
var correo = document.getElementById("correo");
var password = document.getElementById("password");
var errorLogin = document.getElementById("errorLogin");

// Muestra un mensaje de error en el aviso rojo.
function mostrarError(mensaje) {
    errorLogin.textContent = mensaje;
    errorLogin.classList.remove("d-none");
}

// Validamos los datos cuando se envía el formulario.
formLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    var valorCorreo = correo.value.trim();
    var valorPassword = password.value;

    if (!validarCorreo(valorCorreo)) {
        mostrarError("El correo no tiene un formato válido.");
        return;
    }

    if (!validarPassword(valorPassword)) {
        mostrarError("La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.");
        return;
    }

    // Guardamos el usuario en la sesión (llave acordada: "usuario").
    sessionStorage.setItem("usuario", valorCorreo);

    // Entramos al sistema.
    window.location.href = "index.html";
});
