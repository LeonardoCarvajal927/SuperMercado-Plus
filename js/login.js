
var formulario = document.getElementById("loginForm");

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    var correo = document.getElementById("correo").value;
    var contrasena = document.getElementById("contrasena").value;
    var rol = document.getElementById("rol").value;
    var mensaje = document.getElementById("mensaje-error");

    if (correo == "" || contrasena == "" || rol == "") {

        mensaje.textContent = "Debes completar todos los campos.";

    } else if (correo == "admin@gmail.com" &&
            contrasena == "Admin123" &&
            rol == "admin") {

        window.location.href = "inicio.html";

    } else if (correo == "empleado@gmail.com" &&
            contrasena == "Empleado123" &&
            rol == "empleado") {

        window.location.href = "inicio.html";

    } else {

        mensaje.textContent = "Correo, contraseña o rol incorrectos.";

    }

});
