
/* FORMULARIO DE EDITAR PRODUCTO */

var formulario = document.getElementById("formulario-editar");

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    /* OBTENER LOS DATOS */

    var nombre = document.getElementById("nombre").value;
    var codigo = document.getElementById("codigo").value;
    var categoria = document.getElementById("categoria").value;
    var precio = document.getElementById("precio").value;
    var cantidad = document.getElementById("cantidad").value;
    var proveedor = document.getElementById("proveedor").value;

    /* LIMPIAR LOS MENSAJES ANTERIORES */

    document.getElementById("error-nombre").textContent = "";
    document.getElementById("error-codigo").textContent = "";
    document.getElementById("error-categoria").textContent = "";
    document.getElementById("error-precio").textContent = "";
    document.getElementById("error-cantidad").textContent = "";
    document.getElementById("error-proveedor").textContent = "";
    document.getElementById("mensaje-exito").textContent = "";

    /* COMPROBAR LOS CAMPOS */

    var correcto = true;

    if (nombre.trim() == "") {
        document.getElementById("error-nombre").textContent = "El nombre es obligatorio.";
        correcto = false;
    }

    if (codigo.trim() == "") {
        document.getElementById("error-codigo").textContent = "El código es obligatorio.";
        correcto = false;
    }

    if (categoria == "") {
        document.getElementById("error-categoria").textContent = "Selecciona una categoría.";
        correcto = false;
    }

    if (precio == "" || Number(precio) <= 0) {
        document.getElementById("error-precio").textContent = "El precio debe ser mayor que cero.";
        correcto = false;
    }

    if (cantidad == "" || Number(cantidad) < 0 || Number.isInteger(Number(cantidad)) == false) {
        document.getElementById("error-cantidad").textContent = "Ingresa una cantidad entera igual o mayor que cero.";
        correcto = false;
    }

    if (proveedor == "") {
        document.getElementById("error-proveedor").textContent = "Selecciona un proveedor.";
        correcto = false;
    }

    /* MOSTRAR RESULTADO */

    if (correcto == true) {
        document.getElementById("mensaje-exito").textContent = "Producto actualizado correctamente (simulación).";
    }

});
