
/* EDITAR PRODUCTOS - ENTREGABLE 3 */

/* OBTENER EL FORMULARIO */

const formularioEditar = document.getElementById("formulario-editar");

/* OBTENER EL CODIGO DESDE LA DIRECCION */

const parametros = new URLSearchParams(window.location.search);

let codigoOriginal = parametros.get("codigo");


/* MOSTRAR UN MENSAJE */

function mostrarMensaje(texto) {

    document.getElementById("mensaje-exito").textContent = texto;

}


/* CARGAR LOS DATOS DEL PRODUCTO */

function cargarProducto() {

    if (codigoOriginal === null) {

        mostrarMensaje("No se seleccionó ningún producto.");
        return;

    }

    const producto = buscarProductoPorCodigo(codigoOriginal);

    if (producto === null) {

        mostrarMensaje("No se encontró el producto.");
        return;

    }

    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("codigo").value = producto.codigo;
    document.getElementById("categoria").value = producto.categoria;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("cantidad").value = producto.cantidad;
    document.getElementById("fecha").value = producto.fecha || "";
    document.getElementById("proveedor").value = producto.proveedor;

}


/* LEER LOS DATOS DEL FORMULARIO */

function leerFormularioEdicion() {

    const precioTexto = document.getElementById("precio").value;
    const cantidadTexto = document.getElementById("cantidad").value;

    const producto = {

        nombre: document.getElementById("nombre").value.trim(),

        codigo: document.getElementById("codigo").value.trim(),

        categoria: document.getElementById("categoria").value,

        precio: Number(precioTexto),

        cantidad: Number(cantidadTexto),

        fecha: document.getElementById("fecha").value,

        proveedor: document.getElementById("proveedor").value

    };

    return {
        producto: producto,
        precioTexto: precioTexto,
        cantidadTexto: cantidadTexto
    };

}


/* VALIDAR Y GUARDAR LOS CAMBIOS */

function guardarEdicion(evento) {

    evento.preventDefault();

    mostrarMensaje("");

    /* COMPROBAR QUE EL PRODUCTO EXISTA */

    if (codigoOriginal === null ||
        buscarProductoPorCodigo(codigoOriginal) === null) {

        mostrarMensaje("No se puede actualizar este producto.");
        return;

    }

    const datos = leerFormularioEdicion();

    const producto = datos.producto;

    /* VALIDAR LOS CAMPOS */

    const errores = validarDatosProducto(
        producto,
        datos.precioTexto,
        datos.cantidadTexto
    );

    /* COMPROBAR CODIGO DUPLICADO */

    if (producto.codigo !== "" &&
        codigoProductoDuplicado(producto.codigo, codigoOriginal)) {

        errores.codigo = "Ya existe un producto con ese código.";

    }

    /* MOSTRAR ERRORES */

    const hayErrores = mostrarErroresProducto(errores);

    if (hayErrores === true) {
        return;
    }

    /* ACTUALIZAR EL PRODUCTO */

    const actualizado = actualizarProducto(codigoOriginal, producto);

    if (actualizado === true) {

        /* RECORDAR EL NUEVO CODIGO */

        codigoOriginal = producto.codigo;

        /* ACTUALIZAR LA DIRECCION SIN RECARGAR */

        const nuevaDireccion = "editar.html?codigo=" +
            encodeURIComponent(producto.codigo);

        window.history.replaceState(null, "", nuevaDireccion);

        mostrarMensaje("Producto actualizado correctamente.");

    } else {

        mostrarMensaje("No se pudo actualizar el producto.");

    }

}


/* DETECTAR EL ENVIO DEL FORMULARIO */

formularioEditar.addEventListener("submit", guardarEdicion);


/* CARGAR EL PRODUCTO SELECCIONADO */

cargarProducto();
