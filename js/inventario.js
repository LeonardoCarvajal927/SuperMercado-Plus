
/* INVENTARIO - SUPERMERCADO PLUS */

/* BUSCAR PRODUCTOS */

var buscador = document.getElementById("buscar");

buscador.addEventListener("input", function() {

    var texto = buscador.value.toLowerCase();

    var filas = document.querySelectorAll("tbody tr");

    for (var i = 0; i < filas.length; i++) {

        var codigo = filas[i].cells[0].textContent.toLowerCase();

        var nombre = filas[i].cells[1].textContent.toLowerCase();

        if (codigo.includes(texto) || nombre.includes(texto)) {

            filas[i].style.display = "";

        } else {

            filas[i].style.display = "none";

        }

    }

});


/* ELIMINAR PRODUCTOS */

var botonesEliminar = document.querySelectorAll(".boton-eliminar");

var ventana = document.getElementById("ventana-eliminar");

var cancelar = document.getElementById("cancelar-eliminar");

var confirmar = document.getElementById("confirmar-eliminar");

var filaSeleccionada;


/* ABRIR LA VENTANA */

for (var i = 0; i < botonesEliminar.length; i++) {

    botonesEliminar[i].addEventListener("click", function() {

        filaSeleccionada = this.parentElement.parentElement;

        var nombreProducto = filaSeleccionada.cells[1].textContent;

        document.getElementById("texto-eliminar").textContent =
            "¿Estás seguro de eliminar " + nombreProducto + "?";

        ventana.style.display = "flex";

    });

}


/* CANCELAR ELIMINACION */

cancelar.addEventListener("click", function() {

    ventana.style.display = "none";

});


/* CONFIRMAR ELIMINACION */

confirmar.addEventListener("click", function() {

    filaSeleccionada.remove();

    ventana.style.display = "none";

});
