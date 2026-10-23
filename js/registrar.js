
const formularioRegistro = document.getElementById("formulario-producto");
const campoImagen = document.getElementById("imagen");
const vistaPrevia = document.getElementById("vista-previa");
const mensajeExito = document.getElementById("mensaje-exito");

// GUARDAR TEMPORALMENTE LA IMAGEN PROCESADA
let imagenProducto = "";


// REDUCIR EL TAMAÑO DE LA IMAGEN
function procesarImagen(archivo) {

    return new Promise(function (resolve, reject) {

        // COMPROBAR EL TIPO DE ARCHIVO
        const tiposPermitidos = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!tiposPermitidos.includes(archivo.type)) {
            reject(new Error("Selecciona una imagen JPG, PNG o WebP."));
            return;
        }

        // LIMITE DEL ARCHIVO ORIGINAL: 5 MB
        if (archivo.size > 5 * 1024 * 1024) {
            reject(new Error("La imagen no puede superar 5 MB."));
            return;
        }

        const lector = new FileReader();

        lector.onload = function () {

            const imagen = new Image();

            imagen.onload = function () {

                // CREAR UN CANVAS PARA REDUCIR LA IMAGEN
                const canvas = document.createElement("canvas");
                const contexto = canvas.getContext("2d");

                if (contexto === null) {
                    reject(new Error("No se pudo procesar la imagen."));
                    return;
                }

                // TAMAÑO MAXIMO: 400 PIXELES
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

                // FONDO BLANCO PARA IMAGENES TRANSPARENTES
                contexto.fillStyle = "#ffffff";
                contexto.fillRect(0, 0, ancho, alto);

                contexto.drawImage(imagen, 0, 0, ancho, alto);

                // CONVERTIR LA IMAGEN A TEXTO BASE64
                const imagenReducida = canvas.toDataURL(
                    "image/jpeg",
                    0.65
                );

                // EVITAR IMAGENES DEMASIADO GRANDES
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


// MOSTRAR UNA VISTA PREVIA
async function mostrarVistaPrevia() {

    const archivo = campoImagen.files[0];

    document.getElementById("error-imagen").textContent = "";

    imagenProducto = "";
    vistaPrevia.style.display = "none";
    vistaPrevia.removeAttribute("src");

    if (!archivo) {
        return;
    }

    try {

        const imagenReducida = await procesarImagen(archivo);

        // SI EL USUARIO CAMBIO EL ARCHIVO MIENTRAS SE LEIA
        if (campoImagen.files[0] !== archivo) {
            return;
        }

        imagenProducto = imagenReducida;

        vistaPrevia.src = imagenProducto;
        vistaPrevia.style.display = "block";

    } catch (error) {

        if (campoImagen.files[0] !== archivo) {
            return;
        }

        campoImagen.value = "";

        document.getElementById("error-imagen").textContent =
            error.message;

    }

}


// OBTENER LOS DATOS DEL FORMULARIO
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

        proveedor: document.getElementById("proveedor").value,

        // NUEVA PROPIEDAD DEL PRODUCTO
        imagen: imagenProducto

    };

    return {
        producto: producto,
        precioTexto: precioTexto,
        cantidadTexto: cantidadTexto
    };

}


// VALIDAR Y REGISTRAR EL PRODUCTO
async function guardarFormularioRegistro(evento) {

    evento.preventDefault();

    mensajeExito.textContent = "";

    const datos = leerFormularioRegistro();

    const producto = datos.producto;

    // VALIDACIONES GENERALES
    const errores = validarDatosProducto(
        producto,
        datos.precioTexto,
        datos.cantidadTexto
    );

    // COMPROBAR CODIGO DUPLICADO
    if (producto.codigo !== "" &&
        codigoProductoDuplicado(producto.codigo, null)) {

        errores.codigo = "Ya existe un producto con este código.";

    }

    // MOSTRAR LOS ERRORES
    const hayErrores = mostrarErroresProducto(errores);

    if (hayErrores === true) {
        return;
    }

    // PROCESAR LA IMAGEN SI FUE SELECCIONADA
    const archivo = campoImagen.files[0];

    if (archivo) {

        try {

            producto.imagen = await procesarImagen(archivo);

        } catch (error) {

            document.getElementById("error-imagen").textContent =
                error.message;

            return;

        }

    }

    // REVISAR NUEVAMENTE EL CODIGO ANTES DE GUARDAR
    if (codigoProductoDuplicado(producto.codigo, null)) {

        document.getElementById("error-codigo").textContent =
            "Ya existe un producto con este código.";

        return;

    }

    // GUARDAR EN LOCALSTORAGE
    try {

        registrarProducto(producto);

    } catch (error) {

        mensajeExito.textContent =
            "No se pudo guardar. Puede que el almacenamiento esté lleno.";

        return;

    }

    // MENSAJE DE EXITO
    mensajeExito.textContent =
        "Producto registrado y guardado correctamente.";

    // LIMPIAR FORMULARIO
    formularioRegistro.reset();

    imagenProducto = "";
    vistaPrevia.style.display = "none";
    vistaPrevia.removeAttribute("src");

    document.getElementById("error-imagen").textContent = "";

}


// DETECTAR EL CAMBIO DE IMAGEN
campoImagen.addEventListener("change", mostrarVistaPrevia);


// DETECTAR EL ENVIO DEL FORMULARIO
formularioRegistro.addEventListener("submit", guardarFormularioRegistro);
