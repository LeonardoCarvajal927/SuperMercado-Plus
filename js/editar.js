
const formularioEditar = document.getElementById("formulario-editar");

const campoImagenEditar = document.getElementById("imagen");
const vistaPreviaEditar = document.getElementById("vista-previa");
const textoSinImagen = document.getElementById("texto-sin-imagen");
const errorImagenEditar = document.getElementById("error-imagen");

// OBTENER EL CODIGO DESDE LA DIRECCION
const parametros = new URLSearchParams(window.location.search);

let codigoOriginal = parametros.get("codigo");

// GUARDAR LA IMAGEN ACTUAL O SU REEMPLAZO
let imagenActual = "";


// MOSTRAR UN MENSAJE
function mostrarMensaje(texto) {

    document.getElementById("mensaje-exito").textContent = texto;

}


// MOSTRAR IMAGEN O TEXTO "SIN IMAGEN"
function mostrarImagen(imagen) {

    if (imagen) {

        vistaPreviaEditar.src = imagen;
        vistaPreviaEditar.style.display = "block";
        textoSinImagen.style.display = "none";

    } else {

        vistaPreviaEditar.removeAttribute("src");
        vistaPreviaEditar.style.display = "none";
        textoSinImagen.style.display = "block";

    }

}


// PROCESAR Y REDUCIR UNA IMAGEN
function procesarImagenEdicion(archivo) {

    return new Promise(function (resolve, reject) {

        const tiposPermitidos = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!tiposPermitidos.includes(archivo.type)) {
            reject(new Error("Selecciona una imagen JPG, PNG o WebP."));
            return;
        }

        if (archivo.size > 5 * 1024 * 1024) {
            reject(new Error("La imagen no puede superar 5 MB."));
            return;
        }

        const lector = new FileReader();

        lector.onload = function () {

            const imagen = new Image();

            imagen.onload = function () {

                const canvas = document.createElement("canvas");
                const contexto = canvas.getContext("2d");

                if (contexto === null) {
                    reject(new Error("No se pudo procesar la imagen."));
                    return;
                }

                const tamañoMaximo = 400;

                let ancho = imagen.width;
                let alto = imagen.height;

                if (ancho > alto && ancho > tamañoMaximo) {

                    alto = Math.round(alto * tamañoMaximo / ancho);
                    ancho = tamañoMaximo;

                } else if (alto >= ancho && alto > tamañoMaximo) {

                    ancho = Math.round(ancho * tamañoMaximo / alto);
                    alto = tamañoMaximo;

                }

                canvas.width = ancho;
                canvas.height = alto;

                contexto.fillStyle = "#ffffff";
                contexto.fillRect(0, 0, ancho, alto);

                contexto.drawImage(imagen, 0, 0, ancho, alto);

                const imagenReducida = canvas.toDataURL(
                    "image/jpeg",
                    0.65
                );

                if (imagenReducida.length > 180000) {
                    reject(new Error("La imagen procesada sigue siendo demasiado grande."));
                    return;
                }

                resolve(imagenReducida);

            };

            imagen.onerror = function () {
                reject(new Error("No se pudo abrir la imagen."));
            };

            imagen.src = lector.result;

        };

        lector.onerror = function () {
            reject(new Error("No se pudo leer el archivo."));
        };

        lector.readAsDataURL(archivo);

    });

}


// CARGAR LOS DATOS DEL PRODUCTO
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

    // CARGAR LA IMAGEN GUARDADA
    imagenActual = producto.imagen || "";

    campoImagenEditar.value = "";
    mostrarImagen(imagenActual);

}


// LEER LOS DATOS DEL FORMULARIO
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

        proveedor: document.getElementById("proveedor").value,

        // CONSERVAR LA IMAGEN QUE YA TENIA EL PRODUCTO
        imagen: imagenActual

    };

    return {
        producto: producto,
        precioTexto: precioTexto,
        cantidadTexto: cantidadTexto
    };

}


// MOSTRAR UNA VISTA PREVIA DE LA NUEVA IMAGEN
async function cambiarVistaPrevia() {

    const archivo = campoImagenEditar.files[0];

    errorImagenEditar.textContent = "";

    if (!archivo) {

        mostrarImagen(imagenActual);
        return;

    }

    try {

        const imagenNueva = await procesarImagenEdicion(archivo);

        if (campoImagenEditar.files[0] !== archivo) {
            return;
        }

        mostrarImagen(imagenNueva);

    } catch (error) {

        if (campoImagenEditar.files[0] !== archivo) {
            return;
        }

        campoImagenEditar.value = "";

        errorImagenEditar.textContent = error.message;

        mostrarImagen(imagenActual);

    }

}


// VALIDAR Y GUARDAR LOS CAMBIOS
async function guardarEdicion(evento) {

    evento.preventDefault();

    mostrarMensaje("");
    errorImagenEditar.textContent = "";

    // COMPROBAR QUE EL PRODUCTO EXISTA
    if (codigoOriginal === null ||
        buscarProductoPorCodigo(codigoOriginal) === null) {

        mostrarMensaje("No se puede actualizar este producto.");
        return;

    }

    const datos = leerFormularioEdicion();

    const producto = datos.producto;

    // VALIDAR LOS CAMPOS
    const errores = validarDatosProducto(
        producto,
        datos.precioTexto,
        datos.cantidadTexto
    );

    // COMPROBAR CODIGO DUPLICADO
    if (producto.codigo !== "" &&
        codigoProductoDuplicado(producto.codigo, codigoOriginal)) {

        errores.codigo = "Ya existe un producto con ese código.";

    }

    // MOSTRAR ERRORES
    const hayErrores = mostrarErroresProducto(errores);

    if (hayErrores === true) {
        return;
    }

    // CAMBIAR LA IMAGEN SOLO SI SELECCIONARON OTRA
    const archivo = campoImagenEditar.files[0];

    if (archivo) {

        try {

            producto.imagen = await procesarImagenEdicion(archivo);

        } catch (error) {

            errorImagenEditar.textContent = error.message;
            return;

        }

    }

    // COMPROBAR NUEVAMENTE QUE EL CODIGO NO ESTE DUPLICADO
    if (codigoProductoDuplicado(producto.codigo, codigoOriginal)) {

        document.getElementById("error-codigo").textContent =
            "Ya existe un producto con ese código.";

        return;

    }

    // ACTUALIZAR EL PRODUCTO
    let actualizado = false;

    try {

        actualizado = actualizarProducto(codigoOriginal, producto);

    } catch (error) {

        mostrarMensaje(
            "No se pudo guardar. Puede que el almacenamiento esté lleno."
        );

        return;

    }

    if (actualizado === true) {

        // RECORDAR EL NUEVO CODIGO
        codigoOriginal = producto.codigo;

        // CONSERVAR LA IMAGEN ACTUALIZADA
        imagenActual = producto.imagen;

        campoImagenEditar.value = "";
        mostrarImagen(imagenActual);

        // ACTUALIZAR LA DIRECCION SIN RECARGAR
        const nuevaDireccion = "editar.html?codigo=" +
            encodeURIComponent(producto.codigo);

        window.history.replaceState(null, "", nuevaDireccion);

        mostrarMensaje("Producto actualizado correctamente.");

    } else {

        mostrarMensaje("No se pudo actualizar el producto.");

    }

}


// DETECTAR CAMBIO DE FOTOGRAFIA
campoImagenEditar.addEventListener("change", cambiarVistaPrevia);


// DETECTAR EL ENVIO DEL FORMULARIO
formularioEditar.addEventListener("submit", guardarEdicion);


// CARGAR EL PRODUCTO SELECCIONADO
cargarProducto();
