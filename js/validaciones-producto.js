

function validarDatosProducto(producto, precioTexto, cantidadTexto) {

    const errores = {};

    /* NOMBRE */

    if (producto.nombre === "") {
        errores.nombre = "El nombre es obligatorio.";
    }

    /* CODIGO */

    if (producto.codigo === "") {
        errores.codigo = "El código es obligatorio.";
    }

    /* CATEGORIA */

    if (producto.categoria === "") {
        errores.categoria = "Selecciona una categoría.";
    }

    /* PRECIO */

    if (precioTexto === "" ||
        !Number.isFinite(producto.precio) ||
        producto.precio <= 0) {

        errores.precio = "El precio debe ser mayor que cero.";
    }

    /* CANTIDAD */

    if (cantidadTexto === "" ||
        !Number.isInteger(producto.cantidad) ||
        producto.cantidad < 0) {

        errores.cantidad =
            "La cantidad debe ser un entero igual o mayor que cero.";
    }

    /* PROVEEDOR */

    if (producto.proveedor === "") {
        errores.proveedor = "Selecciona un proveedor.";
    }

    return errores;
}


/* COMPROBAR SI UN CODIGO YA ESTA REGISTRADO */

function codigoProductoDuplicado(codigo, codigoOriginal) {

    const existente = buscarProductoPorCodigo(codigo);

    if (existente === null) {
        return false;
    }

    /* AL EDITAR, SE PERMITE CONSERVAR EL CODIGO ORIGINAL */

    if (codigo === codigoOriginal) {
        return false;
    }

    return true;
}


/* MOSTRAR ERRORES DEBAJO DEL FORMULARIO */

function mostrarErroresProducto(errores) {

    const campos = [
        "nombre",
        "codigo",
        "categoria",
        "precio",
        "cantidad",
        "proveedor"
    ];

    let hayErrores = false;

    for (let i = 0; i < campos.length; i++) {

        const campo = campos[i];

        const elemento = document.getElementById("error-" + campo);

        elemento.textContent = errores[campo] || "";

        if (errores[campo]) {
            hayErrores = true;
        }

    }

    return hayErrores;
}
