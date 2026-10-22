

const ventasDia = document.getElementById("ventas-dia");
const cantidadFacturas = document.getElementById("cantidad-facturas");
const productosVendidos = document.getElementById("productos-vendidos");

const graficoVentas = document.getElementById("grafico-ventas");

const tablaMasVendidos = document.getElementById("tabla-mas-vendidos");
const tablaPocoStock = document.getElementById("tabla-poco-stock");

const botonReportes = document.getElementById("boton-reportes");
const tablasReportes = document.querySelector(".tablas-reportes");


/* FORMATO DE PRECIOS */

function formatearDinero(valor) {

    return "$ " + Number(valor).toLocaleString("es-CO");

}


/* CALCULAR LAS TARJETAS */

function calcularTarjetas(ventas) {

    const hoy = new Date();

    let totalDia = 0;
    let unidadesVendidas = 0;

    for (let i = 0; i < ventas.length; i++) {

        const venta = ventas[i];

        const fechaVenta = convertirFechaVenta(venta.fecha);

        if (fechaVenta !== null &&
            fechasIguales(fechaVenta, hoy)) {

            totalDia = totalDia + Number(venta.total);

        }

        for (let j = 0; j < venta.productos.length; j++) {

            unidadesVendidas = unidadesVendidas +
                Number(venta.productos[j].cantidad);

        }

    }

    ventasDia.textContent = formatearDinero(totalDia);
    cantidadFacturas.textContent = ventas.length;
    productosVendidos.textContent = unidadesVendidas;

}


/* MOSTRAR EL GRAFICO SEMANAL */

function mostrarGrafico(ventas) {

    const totales = obtenerVentasSemana(ventas);

    const dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    graficoVentas.innerHTML = "";

    let mayorVenta = 0;

    for (let i = 0; i < totales.length; i++) {

        if (totales[i] > mayorVenta) {

            mayorVenta = totales[i];

        }

    }

    for (let i = 0; i < dias.length; i++) {

        const columna = document.createElement("div");
        columna.className = "dia";

        const barra = document.createElement("div");
        barra.className = "barra";

        let altura = 0;

        if (mayorVenta > 0) {

            altura = (totales[i] / mayorVenta) * 140;

        }

        barra.style.height = altura + "px";

        barra.title = dias[i] + ": " +
            formatearDinero(totales[i]);

        const nombreDia = document.createElement("p");
        nombreDia.textContent = dias[i];

        columna.appendChild(barra);
        columna.appendChild(nombreDia);

        graficoVentas.appendChild(columna);

    }

}


/* CREAR UNA CELDA DE TABLA */

function crearCeldaReporte(fila, texto) {

    const celda = document.createElement("td");

    celda.textContent = texto;

    fila.appendChild(celda);

}


/* MOSTRAR MENSAJE SI LA TABLA ESTA VACIA */

function mostrarTablaVacia(tabla, mensaje) {

    const fila = document.createElement("tr");

    const celda = document.createElement("td");

    celda.colSpan = 2;
    celda.textContent = mensaje;

    fila.appendChild(celda);

    tabla.appendChild(fila);

}


/* CALCULAR PRODUCTOS MAS VENDIDOS */

function calcularMasVendidos(ventas) {

    const productos = [];

    for (let i = 0; i < ventas.length; i++) {

        for (let j = 0; j < ventas[i].productos.length; j++) {

            const producto = ventas[i].productos[j];

            let encontrado = false;

            for (let k = 0; k < productos.length; k++) {

                if (productos[k].codigo === producto.codigo) {

                    productos[k].cantidad =
                        productos[k].cantidad + Number(producto.cantidad);

                    encontrado = true;

                    break;

                }

            }

            if (encontrado === false) {

                productos.push({
                    codigo: producto.codigo,
                    nombre: producto.nombre,
                    cantidad: Number(producto.cantidad)
                });

            }

        }

    }

    productos.sort(function(a, b) {

        return b.cantidad - a.cantidad;

    });

    return productos;

}


/* MOSTRAR PRODUCTOS MAS VENDIDOS */

function mostrarMasVendidos(ventas) {

    const productos = calcularMasVendidos(ventas);

    tablaMasVendidos.innerHTML = "";

    if (productos.length === 0) {

        mostrarTablaVacia(
            tablaMasVendidos,
            "Todavía no hay productos vendidos."
        );

        return;
    }

    for (let i = 0; i < productos.length; i++) {

        const fila = document.createElement("tr");

        crearCeldaReporte(fila, productos[i].nombre);
        crearCeldaReporte(fila, productos[i].cantidad);

        tablaMasVendidos.appendChild(fila);

    }

}


/* MOSTRAR PRODUCTOS CON POCO STOCK */

function mostrarPocoStock(productos) {

    tablaPocoStock.innerHTML = "";

    const resultados = [];

    for (let i = 0; i < productos.length; i++) {

        if (Number(productos[i].cantidad) <= 5) {

            resultados.push(productos[i]);

        }

    }

    resultados.sort(function(a, b) {

        return Number(a.cantidad) - Number(b.cantidad);

    });

    if (resultados.length === 0) {

        mostrarTablaVacia(
            tablaPocoStock,
            "No hay productos con poco stock."
        );

        return;
    }

    for (let i = 0; i < resultados.length; i++) {

        const fila = document.createElement("tr");

        crearCeldaReporte(fila, resultados[i].nombre);
        crearCeldaReporte(fila, resultados[i].cantidad);

        tablaPocoStock.appendChild(fila);

    }

}


/* MOSTRAR U OCULTAR TABLAS */

function cambiarVisibilidadTablas() {

    if (tablasReportes.style.display === "none") {

        tablasReportes.style.display = "";

        botonReportes.textContent = "Ocultar tablas";

    } else {

        tablasReportes.style.display = "none";

        botonReportes.textContent = "Mostrar tablas";

    }

}


/* CARGAR TODOS LOS REPORTES */

function cargarReportes() {

    const ventas = obtenerVentas();
    const productos = obtenerProductos();

    calcularTarjetas(ventas);
    mostrarGrafico(ventas);
    mostrarMasVendidos(ventas);
    mostrarPocoStock(productos);

}


/* EVENTO DEL BOTON */

botonReportes.addEventListener(
    "click",
    cambiarVisibilidadTablas
);


/* CARGAR INFORMACION AL ABRIR REPORTES */

cargarReportes();
