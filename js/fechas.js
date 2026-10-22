
/* FUNCIONES COMPARTIDAS DE FECHAS */

/* CONVERTIR FECHA GUARDADA EN FORMATO COLOMBIANO */

function convertirFechaVenta(textoFecha) {

    const partes = String(textoFecha).match(
        /^(\d{1,2})\/(\d{1,2})\/(\d{4})/
    );

    if (partes === null) {
        return null;
    }

    const dia = Number(partes[1]);
    const mes = Number(partes[2]);
    const anio = Number(partes[3]);

    const fecha = new Date(anio, mes - 1, dia);

    if (fecha.getFullYear() !== anio ||
        fecha.getMonth() !== mes - 1 ||
        fecha.getDate() !== dia) {

        return null;
    }

    return fecha;
}


/* COMPROBAR SI DOS FECHAS SON EL MISMO DIA */

function fechasIguales(fecha1, fecha2) {

    return fecha1.getFullYear() === fecha2.getFullYear() &&
        fecha1.getMonth() === fecha2.getMonth() &&
        fecha1.getDate() === fecha2.getDate();

}


/* CALCULAR TOTALES DE LA SEMANA ACTUAL */

function obtenerVentasSemana(ventas) {

    const totales = [0, 0, 0, 0, 0, 0, 0];

    const hoy = new Date();

    const lunes = new Date(
        hoy.getFullYear(),
        hoy.getMonth(),
        hoy.getDate()
    );

    const diasDesdeLunes = (lunes.getDay() + 6) % 7;

    lunes.setDate(lunes.getDate() - diasDesdeLunes);

    const siguienteLunes = new Date(lunes);

    siguienteLunes.setDate(siguienteLunes.getDate() + 7);

    for (let i = 0; i < ventas.length; i++) {

        const fecha = convertirFechaVenta(ventas[i].fecha);

        if (fecha !== null &&
            fecha >= lunes &&
            fecha < siguienteLunes) {

            const posicion = (fecha.getDay() + 6) % 7;

            totales[posicion] = totales[posicion] +
                Number(ventas[i].total);
        }
    }

    return totales;
}
