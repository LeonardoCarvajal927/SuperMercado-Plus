

function crearCelda(fila, contenido) {

    const celda = document.createElement("td");

    celda.textContent = contenido;

    fila.appendChild(celda);

}


/* MOSTRAR LOS PRODUCTOS EN LA TABLA */

function mostrarProductos(productos) {

    const tabla = document.querySelector("#tabla-productos tbody");

    if (tabla === null) {
        return;
    }

    /* LIMPIAR LAS FILAS ANTERIORES */

    tabla.innerHTML = "";

    /* RECORRER LOS PRODUCTOS */

    for (let i = 0; i < productos.length; i++) {

        const producto = productos[i];

        const fila = document.createElement("tr");

        crearCelda(fila, producto.codigo);
        crearCelda(fila, producto.nombre);
        crearCelda(fila, producto.categoria);
        crearCelda(fila, "$ " + Number(producto.precio).toLocaleString("es-CO"));
        crearCelda(fila, producto.cantidad);

        /* CREAR CELDA DE ACCIONES */

        const celdaAcciones = document.createElement("td");

        /* BOTON EDITAR */

        const botonEditar = document.createElement("a");

        botonEditar.textContent = "Editar";
        botonEditar.href = "editar.html?codigo=" + encodeURIComponent(producto.codigo);
        botonEditar.target = "editar";
        botonEditar.className = "boton-editar";

        /* BOTON ELIMINAR */

        const botonEliminar = document.createElement("button");

        botonEliminar.textContent = "Eliminar";
        botonEliminar.type = "button";
        botonEliminar.className = "boton-eliminar";
        botonEliminar.dataset.codigo = producto.codigo;

        /* AGREGAR BOTONES */

        celdaAcciones.appendChild(botonEditar);
        celdaAcciones.appendChild(botonEliminar);

        fila.appendChild(celdaAcciones);

        /* AGREGAR FILA A LA TABLA */

        tabla.appendChild(fila);

    }

}
