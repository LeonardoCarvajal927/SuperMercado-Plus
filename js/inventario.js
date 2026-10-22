

const buscador = document.getElementById("buscar");

const tablaProductos = document.getElementById("tabla-productos");

const ventanaEliminar = document.getElementById("ventana-eliminar");

const textoEliminar = document.getElementById("texto-eliminar");

const botonCancelar = document.getElementById("cancelar-eliminar");

const botonConfirmar = document.getElementById("confirmar-eliminar");


/* CODIGO DEL PRODUCTO QUE SE QUIERE ELIMINAR */

let codigoSeleccionado = "";


/* CARGAR LOS PRODUCTOS DEL INVENTARIO */

function cargarInventario() {

    const productos = obtenerProductos();

    mostrarProductos(productos);

}


/* BUSCAR PRODUCTOS MIENTRAS SE ESCRIBE */

function buscarProductos() {

    const texto = buscador.value.toLowerCase().trim();

    const productos = obtenerProductos();

    const resultados = [];

    for (let i = 0; i < productos.length; i++) {

        const nombre = productos[i].nombre.toLowerCase();

        const codigo = productos[i].codigo.toLowerCase();

        if (nombre.includes(texto) || codigo.includes(texto)) {

            resultados.push(productos[i]);

        }

    }

    mostrarProductos(resultados);

}


/* ABRIR VENTANA PARA ELIMINAR */

function abrirVentanaEliminar(codigo) {

    const producto = buscarProductoPorCodigo(codigo);

    if (producto === null) {
        return;
    }

    codigoSeleccionado = codigo;

    textoEliminar.textContent =
        "¿Estás seguro de eliminar " + producto.nombre + "?";

    ventanaEliminar.style.display = "flex";

}


/* CERRAR VENTANA PARA ELIMINAR */

function cerrarVentanaEliminar() {

    ventanaEliminar.style.display = "none";

    codigoSeleccionado = "";

}


/* CONFIRMAR ELIMINACION */

function confirmarEliminacion() {

    if (codigoSeleccionado === "") {
        return;
    }

    eliminarProducto(codigoSeleccionado);

    cerrarVentanaEliminar();

    buscarProductos();

}


/* DETECTAR EL BUSCADOR */

buscador.addEventListener("input", buscarProductos);


/* DETECTAR LOS BOTONES ELIMINAR */

tablaProductos.addEventListener("click", function(evento) {

    if (evento.target.classList.contains("boton-eliminar")) {

        const codigo = evento.target.dataset.codigo;

        abrirVentanaEliminar(codigo);

    }

});


/* BOTON CANCELAR */

botonCancelar.addEventListener("click", cerrarVentanaEliminar);


/* BOTON CONFIRMAR */

botonConfirmar.addEventListener("click", confirmarEliminacion);


/* MOSTRAR LOS PRODUCTOS AL ABRIR LA PAGINA */

cargarInventario();
