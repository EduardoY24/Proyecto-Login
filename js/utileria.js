/*
    Librería de funciones utilitarias
    Actividad 2
*/
// Valida que el correo tenga un formato correcto.
function validarCorreo(correo) {
    var expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (expresion.test(correo)) {
      return true;
    } else {
        return false;
}
}

// Valida que el texto solamente contenga letras y espacios.
function soloLetras(texto) {
    var expresion = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
    if (expresion.test(texto)) {
      return true;
    } else {
      return false;
    }
}

// Comprueba que un número no supere una cantidad máxima de caracteres.
function validarLongitud(numero, maxLongitud) {
    if (numero.toString().length <= maxLongitud) {
        return true;
    } else {
  return false;
    }
}
// Calcula la edad usando la fecha de nacimiento.
function calcularEdad(fechaNacimiento) {
    var fechaNac = new Date(fechaNacimiento);
    var fechaActual = new Date();
    var edad = fechaActual.getFullYear() - fechaNac.getFullYear();
    var mes = fechaActual.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNac.getDate())) {
        edad--;
}
    return edad;
}


// Comprueba si la persona tiene 18 años o más.
function esMayorDeEdad(fechaNacimiento) {
    var edad = calcularEdad(fechaNacimiento);
    if (edad >= 18) {
        return true;
    } else {
    return false;
}
}


// Valida que la contraseña tenga los requisitos solicitados.
function validarContra(contrasena) {
    var mayuscula = /[A-Z]/.test(contrasena);
    var minuscula = /[a-z]/.test(contrasena);
    var numero = /[0-9]/.test(contrasena);
    var especial = /[^A-Za-z0-9]/.test(contrasena);

  if (contrasena.length >= 8 &&
        mayuscula &&
        minuscula &&
        numero &&
        especial) {

        return true;

} else {
return false;
}
}


// Convierte todo el texto a mayúsculas.
function convertirMayusculas(texto) {

    return texto.toUpperCase();
}


// Calcula el promedio de varios números.
function calcularPromedio(numeros) {
var suma = 0;
for (var i = 0; i < numeros.length; i++) {
      suma = suma + numeros[i];
}
  return suma / numeros.length;
}

// Alias con el nombre que pide la Actividad 5 (usa la misma validación de validarContra).
function validarPassword(contrasena) {
    return validarContra(contrasena);
}
