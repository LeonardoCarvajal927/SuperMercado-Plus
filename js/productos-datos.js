

function registrarProducto(nuevoProducto) {

    const productos = obtenerProductos();

    productos.push(nuevoProducto);

    guardarProductos(productos);

}


/* BUSCAR UN PRODUCTO POR SU CODIGO */

function buscarProductoPorCodigo(codigo) {

    const productos = obtenerProductos();

    for (let i = 0; i < productos.length; i++) {

        if (productos[i].codigo === codigo) {

            return productos[i];

        }

    }

    return null;

}


/* ACTUALIZAR UN PRODUCTO */

function actualizarProducto(codigoOriginal, productoActualizado) {

    const productos = obtenerProductos();

    for (let i = 0; i < productos.length; i++) {

        if (productos[i].codigo === codigoOriginal) {

            productos[i] = productoActualizado;

            guardarProductos(productos);

            return true;

        }

    }

    return false;

}


/* ELIMINAR UN PRODUCTO */

function eliminarProducto(codigo) {

    const productos = obtenerProductos();

    for (let i = 0; i < productos.length; i++) {

        if (productos[i].codigo === codigo) {

            productos.splice(i, 1);

            guardarProductos(productos);

            return true;

        }

    }

    return false;

}
