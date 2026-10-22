

const formularioRegistro = document.getElementById("formulario-producto");


/* OBTENER LOS DATOS DEL FORMULARIO */

function leerFormularioRegistro() {

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


/* VALIDAR Y REGISTRAR EL PRODUCTO */

function guardarFormularioRegistro(evento) {

    evento.preventDefault();

    document.getElementById("mensaje-exito").textContent = "";

    const datos = leerFormularioRegistro();

    const producto = datos.producto;

    /* VALIDACIONES GENERALES */

    const errores = validarDatosProducto(
        producto,
        datos.precioTexto,
        datos.cantidadTexto
    );

    /* COMPROBAR CODIGO DUPLICADO */

    if (producto.codigo !== "" &&
        codigoProductoDuplicado(producto.codigo, null)) {

        errores.codigo = "Ya existe un producto con este código.";

    }

    /* MOSTRAR LOS ERRORES */

    const hayErrores = mostrarErroresProducto(errores);

    if (hayErrores === true) {
        return;
    }

    /* GUARDAR EN LOCALSTORAGE */

    registrarProducto(producto);

    /* MENSAJE DE EXITO */

    document.getElementById("mensaje-exito").textContent =
        "Producto registrado y guardado correctamente.";

    /* LIMPIAR FORMULARIO */

    formularioRegistro.reset();

}


/* DETECTAR EL ENVIO DEL FORMULARIO */

formularioRegistro.addEventListener("submit", guardarFormularioRegistro);
