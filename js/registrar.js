
/* REGISTRAR PRODUCTOS - SUPERMERCADO PLUS */

/* OBTENER EL FORMULARIO */

var formulario = document.getElementById("formulario-producto");

/* DETECTAR CUANDO SE PRESIONA GUARDAR */

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    /* OBTENER LOS DATOS ESCRITOS */

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

    /* COMPROBAR LOS DATOS */

    var correcto = true;

    /* VALIDAR NOMBRE */

    if (nombre.trim() == "") {

        document.getElementById("error-nombre").textContent =
            "El nombre del producto es obligatorio.";

        correcto = false;
    }

    /* VALIDAR CODIGO */

    if (codigo.trim() == "") {

        document.getElementById("error-codigo").textContent =
            "El código es obligatorio.";

        correcto = false;
    }

    /* VALIDAR CATEGORIA */

    if (categoria == "") {

        document.getElementById("error-categoria").textContent =
            "Selecciona una categoría.";

        correcto = false;
    }

    /* VALIDAR PRECIO */

    if (precio == "" || Number(precio) <= 0) {

        document.getElementById("error-precio").textContent =
            "El precio debe ser mayor que cero.";

        correcto = false;
    }

    /* VALIDAR CANTIDAD */

    if (cantidad == "" || Number(cantidad) < 0 ||
        Number.isInteger(Number(cantidad)) == false) {

        document.getElementById("error-cantidad").textContent =
            "La cantidad debe ser un número entero igual o mayor que cero.";

        correcto = false;
    }

    /* VALIDAR PROVEEDOR */

    if (proveedor == "") {

        document.getElementById("error-proveedor").textContent =
            "Selecciona un proveedor.";

        correcto = false;
    }

    /* MOSTRAR MENSAJE DE EXITO */

    if (correcto == true) {

        document.getElementById("mensaje-exito").textContent =
            "Producto registrado correctamente (simulación).";

    }

});
