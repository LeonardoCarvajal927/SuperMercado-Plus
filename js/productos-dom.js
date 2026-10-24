
function crearCelda(fila, contenido) {

    const celda = document.createElement("td");

    celda.textContent = contenido;

    fila.appendChild(celda);

}


// CREAR CELDA CON IMAGEN DEL PRODUCTO
function crearCeldaImagen(fila, producto) {

    const celda = document.createElement("td");

    if (producto.imagen) {

        const imagen = document.createElement("img");

        imagen.src = producto.imagen;
        imagen.alt = "Imagen de " + producto.nombre;

        // TAMAÑO DE LA MINIATURA
        imagen.style.width = "65px";
        imagen.style.height = "65px";
        imagen.style.objectFit = "contain";
        imagen.style.borderRadius = "6px";
        imagen.style.border = "1px solid #ddd";
        imagen.style.backgroundColor = "#fff";

        celda.appendChild(imagen);

    } else {

        // PRODUCTOS QUE NO TIENEN IMAGEN
        celda.textContent = "Sin imagen";

        celda.style.color = "#777";
        celda.style.fontSize = "13px";

    }

    fila.appendChild(celda);

}


// MOSTRAR LOS PRODUCTOS EN LA TABLA
function mostrarProductos(productos) {

    const tabla = document.querySelector("#tabla-productos tbody");

    if (tabla === null) {
        return;
    }

    // LIMPIAR LAS FILAS ANTERIORES
    tabla.innerHTML = "";

    // RECORRER LOS PRODUCTOS
    for (let i = 0; i < productos.length; i++) {

        const producto = productos[i];

        const fila = document.createElement("tr");

        // NUEVA COLUMNA DE IMAGEN
        crearCeldaImagen(fila, producto);

        // DATOS DEL PRODUCTO
        crearCelda(fila, producto.codigo);
        crearCelda(fila, producto.nombre);
        crearCelda(fila, producto.categoria);
        crearCelda(
            fila,
            "$ " + Number(producto.precio).toLocaleString("es-CO")
        );
        crearCelda(fila, producto.cantidad);

        // CREAR CELDA DE ACCIONES
        const celdaAcciones = document.createElement("td");

        // BOTON EDITAR
        const botonEditar = document.createElement("a");

        const botonDetalles = document.createElement("button")

        botonDetalles.textContent = "Detalles"
        botonDetalles.type = "button";

        botonDetalles.addEventListener("click", function(){

            alert(

                "Nombre: " + producto.nombre + "\n" +
                "Código: " + producto.codigo + "\n" +
                "Categoría: " + producto.categoria + "\n" +
                "Precio: $" + producto.precio + "\n" +
                "Cantidad: " + producto.cantidad + "\n" +
                "Proveedor: " + producto.proveedor

            )



        })

        botonEditar.textContent = "Editar";
        botonEditar.href = "editar.html?codigo=" +
            encodeURIComponent(producto.codigo);
        botonEditar.target = "editar";
        botonEditar.className = "boton-editar";

        // BOTON ELIMINAR
        const botonEliminar = document.createElement("button");

        botonEliminar.textContent = "Eliminar";
        botonEliminar.type = "button";
        botonEliminar.className = "boton-eliminar";
        botonEliminar.dataset.codigo = producto.codigo;

        // AGREGAR BOTONES
        celdaAcciones.appendChild(botonDetalles);
        celdaAcciones.appendChild(botonEditar);
        celdaAcciones.appendChild(botonEliminar);

        fila.appendChild(celdaAcciones);

        // AGREGAR FILA A LA TABLA
        tabla.appendChild(fila);

    }

}
