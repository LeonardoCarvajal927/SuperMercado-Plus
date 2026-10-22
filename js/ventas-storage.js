
/* ALMACENAMIENTO DE VENTAS */

const CLAVE_VENTAS = "supermercado_ventas";


/* OBTENER VENTAS GUARDADAS */

function obtenerVentas() {

    const datos = localStorage.getItem(CLAVE_VENTAS);

    if (datos === null) {
        return [];
    }

    return JSON.parse(datos);

}


/* GUARDAR VENTAS */

function guardarVentas(ventas) {

    const datos = JSON.stringify(ventas);

    localStorage.setItem(CLAVE_VENTAS, datos);

}
