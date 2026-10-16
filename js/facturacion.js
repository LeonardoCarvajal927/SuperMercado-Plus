
/* FACTURACION - SUPERMERCADO PLUS */

/* BUSCAR FACTURAS */

var botonBuscar = document.getElementById("boton-buscar");

botonBuscar.addEventListener("click", function() {

    var buscar = document.getElementById("buscar").value;

    buscar = buscar.toLowerCase();

    var filas = document.querySelectorAll(
        ".contenedor-tabla tbody tr"
    );

    for (var i = 0; i < filas.length; i++) {

        var numero = filas[i].cells[0].textContent;

        numero = numero.toLowerCase();

        if (numero.includes(buscar)) {

            filas[i].style.display = "";

        } else {

            filas[i].style.display = "none";

        }

    }

});


/* VER DETALLE DE FACTURA */

var botonesDetalle = document.querySelectorAll(".boton-detalle");

for (var i = 0; i < botonesDetalle.length; i++) {

    botonesDetalle[i].addEventListener("click", function() {

        var numero = this.getAttribute("data-factura");

        var cliente = "";
        var fecha = "";
        var total = "";

        /* IDENTIFICAR LA FACTURA */

        if (numero == "F001") {

            cliente = "Carlos Pérez";
            fecha = "15/10/2026";
            total = "$ 45.500";

        } else if (numero == "F002") {

            cliente = "María López";
            fecha = "15/10/2026";
            total = "$ 78.200";

        } else if (numero == "F003") {

            cliente = "Juan Gómez";
            fecha = "14/10/2026";
            total = "$ 32.000";

        } else if (numero == "F004") {

            cliente = "Ana Rodríguez";
            fecha = "14/10/2026";
            total = "$ 56.000";

        }

        /* MOSTRAR LOS DATOS */

        document.getElementById("numero-factura").textContent =
            "Factura: " + numero;

        document.getElementById("cliente-factura").textContent =
            "Cliente: " + cliente;

        document.getElementById("fecha-factura").textContent =
            "Fecha: " + fecha;

        document.getElementById("total-factura").textContent =
            "Total: " + total;

        /* OCULTAR PRODUCTOS DE EJEMPLO DE OTRAS FACTURAS */

        var productos = document.getElementById("productos-factura");

        if (numero == "F001") {

            productos.style.display = "";

        } else {

            productos.style.display = "none";

        }

        /* ABRIR DETALLE */

        document.getElementById("detalle-factura").style.display =
            "block";

    });

}


/* CERRAR DETALLE */

var botonCerrar = document.getElementById("cerrar-detalle");

botonCerrar.addEventListener("click", function() {

    document.getElementById("detalle-factura").style.display =
        "none";

});
