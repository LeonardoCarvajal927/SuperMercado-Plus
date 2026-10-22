

const CLAVE_PRODUCTOS = "supermercado_productos";


/* OBTENER LOS PRODUCTOS GUARDADOS */

function obtenerProductos() {

    const datos = localStorage.getItem(CLAVE_PRODUCTOS);

    if (datos === null) {
        return [];
    }

    return JSON.parse(datos);
}


/* GUARDAR LOS PRODUCTOS */

function guardarProductos(productos) {

    const datos = JSON.stringify(productos);

    localStorage.setItem(CLAVE_PRODUCTOS, datos);

}
