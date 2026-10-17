


var producto = document.getElementById("producto");
var cantidad = document.getElementById("cantidad");
var cliente = document.getElementById("cliente");
var metodoPago = document.getElementById("metodo-pago");

var botonAgregar = document.getElementById("agregar-producto");
var botonCancelar = document.getElementById("cancelar-venta");
var botonRegistrar = document.getElementById("registrar-venta");

var tabla = document.getElementById("tabla-venta");
var total = document.getElementById("total");

var error = document.getElementById("error-producto");
var mensaje = document.getElementById("mensaje-venta");


/* CALCULAR TOTAL DE LA VENTA */

function calcularTotal() {

    var filas = tabla.rows;
    var suma = 0;

    for (var i = 0; i < filas.length; i++) {

        var precioTexto = filas[i].cells[1].textContent;

        precioTexto = precioTexto.replace("$", "");
        precioTexto = precioTexto.replace(".", "");

        var precio = Number(precioTexto);

        var unidades = Number(filas[i].cells[2].textContent);

        var subtotal = precio * unidades;

        suma = suma + subtotal;

    }

    total.textContent = "$ " + suma.toLocaleString("es-CO");

}


/* AGREGAR PRODUCTO */

botonAgregar.addEventListener("click", function() {

    error.textContent = "";
    mensaje.textContent = "";

    var precio = Number(producto.value);
    var unidades = Number(cantidad.value);

    /* VALIDAR PRODUCTO */

    if (producto.value == "") {

        error.textContent = "Debes seleccionar un producto.";
        return;

    }

    /* VALIDAR CANTIDAD */

    if (cantidad.value == "" ||
        unidades <= 0 ||
        Number.isInteger(unidades) == false) {

        error.textContent = "Ingresa una cantidad entera mayor que cero.";
        return;

    }

    /* OBTENER EL NOMBRE DEL PRODUCTO */

    var opcion = producto.options[producto.selectedIndex];

    var nombre = opcion.textContent.split(" - ")[0];

    /* CALCULAR SUBTOTAL */

    var subtotal = precio * unidades;

    /* CREAR UNA FILA */

    var fila = tabla.insertRow();

    /* CREAR LAS CELDAS */

    var celdaNombre = fila.insertCell(0);
    var celdaPrecio = fila.insertCell(1);
    var celdaCantidad = fila.insertCell(2);
    var celdaSubtotal = fila.insertCell(3);
    var celdaAcciones = fila.insertCell(4);

    /* COLOCAR LOS DATOS */

    celdaNombre.textContent = nombre;

    celdaPrecio.textContent = "$ " + precio.toLocaleString("es-CO");

    celdaCantidad.textContent = unidades;

    celdaSubtotal.textContent = "$ " + subtotal.toLocaleString("es-CO");

    /* CREAR BOTON QUITAR */

    var botonQuitar = document.createElement("button");

    botonQuitar.textContent = "Quitar";
    botonQuitar.type = "button";
    botonQuitar.className = "boton-quitar";

    celdaAcciones.appendChild(botonQuitar);

    /* ACTUALIZAR TOTAL */

    calcularTotal();

    /* LIMPIAR CAMPOS */

    producto.value = "";
    cantidad.value = 1;

});


/* QUITAR PRODUCTO */

tabla.addEventListener("click", function(evento) {

    if (evento.target.classList.contains("boton-quitar")) {

        var boton = evento.target;

        var celda = boton.parentElement;

        var fila = celda.parentElement;

        fila.remove();

        calcularTotal();

        mensaje.textContent = "";

    }

});


/* CANCELAR VENTA */

botonCancelar.addEventListener("click", function() {

    tabla.innerHTML = "";

    total.textContent = "$ 0";

    cliente.value = "";
    metodoPago.value = "";
    producto.value = "";
    cantidad.value = 1;

    error.textContent = "";
    mensaje.textContent = "Venta cancelada. No se guardaron datos.";

});


/* REGISTRAR VENTA */

botonRegistrar.addEventListener("click", function() {

    error.textContent = "";
    mensaje.textContent = "";

    /* COMPROBAR PRODUCTOS */

    if (tabla.rows.length == 0) {

        error.textContent = "Agrega al menos un producto.";
        return;

    }

    /* COMPROBAR METODO DE PAGO */

    if (metodoPago.value == "") {

        error.textContent = "Selecciona un método de pago.";
        return;

    }

    /* MOSTRAR MENSAJE */

    mensaje.textContent = "Venta registrada correctamente (simulación).";

});


/* CALCULAR EL TOTAL INICIAL */

calcularTotal();
