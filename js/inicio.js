
const totalProductos = document.getElementById("total-productos");
const ventasHoy = document.getElementById("ventas-hoy");
const totalFacturas = document.getElementById("total-facturas");
const stockBajo = document.getElementById("stock-bajo");

const graficoInicio = document.getElementById("grafico-inicio");
const listaStock = document.getElementById("lista-stock");


/* FORMATO DE DINERO */

function formatoDineroInicio(valor) {

    return "$ " + Number(valor).toLocaleString("es-CO");

}


/* MOSTRAR LAS TARJETAS */

function mostrarTarjetasInicio(productos, ventas) {

    totalProductos.textContent = productos.length;
    totalFacturas.textContent = ventas.length;

    let dineroHoy = 0;
    let cantidadStockBajo = 0;

    /* CALCULAR VENTAS DEL DIA */

    for (let i = 0; i < ventas.length; i++) {

        const fechaVenta = convertirFechaVenta(ventas[i].fecha);

        if (fechaVenta !== null &&
            fechasIguales(fechaVenta, new Date())) {

            dineroHoy = dineroHoy + Number(ventas[i].total);

        }

    }

    /* CONTAR PRODUCTOS CON POCO STOCK */

    for (let i = 0; i < productos.length; i++) {

        if (Number(productos[i].cantidad) <= 5) {

            cantidadStockBajo++;

        }

    }

    ventasHoy.textContent = formatoDineroInicio(dineroHoy);
    stockBajo.textContent = cantidadStockBajo;

}


/* MOSTRAR GRAFICO SEMANAL */

function mostrarGraficoInicio(ventas) {

    const totales = obtenerVentasSemana(ventas);

    const dias = ["L", "M", "M", "J", "V", "S", "D"];

    graficoInicio.innerHTML = "";

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

            altura = (totales[i] / mayorVenta) * 135;

        }

        barra.style.height = altura + "px";

        barra.title = dias[i] + ": " +
            formatoDineroInicio(totales[i]);

        const nombreDia = document.createElement("p");
        nombreDia.textContent = dias[i];

        columna.appendChild(barra);
        columna.appendChild(nombreDia);

        graficoInicio.appendChild(columna);

    }

}


/* CREAR UNA FILA DE STOCK */

function crearFilaStock(producto) {

    const fila = document.createElement("div");
    fila.className = "fila-stock";

    const nombre = document.createElement("p");
    nombre.textContent = producto.nombre;

    const cantidad = document.createElement("p");
    cantidad.textContent = producto.cantidad + " unidades";

    fila.appendChild(nombre);
    fila.appendChild(cantidad);

    listaStock.appendChild(fila);

}


/* MOSTRAR PRODUCTOS CON POCO STOCK */

function mostrarStockInicio(productos) {

    listaStock.innerHTML = "";

    const productosBajos = [];

    for (let i = 0; i < productos.length; i++) {

        if (Number(productos[i].cantidad) <= 5) {

            productosBajos.push(productos[i]);

        }

    }

    /* ORDENAR DESDE EL STOCK MAS BAJO */

    productosBajos.sort(function(a, b) {

        return Number(a.cantidad) - Number(b.cantidad);

    });

    if (productosBajos.length === 0) {

        const mensaje = document.createElement("p");

        mensaje.textContent = "No hay productos con poco stock.";

        listaStock.appendChild(mensaje);

        return;

    }

    for (let i = 0; i < productosBajos.length; i++) {

        crearFilaStock(productosBajos[i]);

    }

}


/* CARGAR TODO EL PANEL */

function cargarInicio() {

    const productos = obtenerProductos();
    const ventas = obtenerVentas();

    mostrarTarjetasInicio(productos, ventas);
    mostrarGraficoInicio(ventas);
    mostrarStockInicio(productos);

}


/* MOSTRAR DATOS AL ABRIR INICIO */

cargarInicio();
