

const buscadorFactura = document.getElementById("buscar");

const botonBuscar = document.getElementById("boton-buscar");

const tablaFacturas = document.getElementById("tabla-facturas");

const detalleFactura = document.getElementById("detalle-factura");

const productosFactura = document.getElementById("productos-factura");

const botonCerrar = document.getElementById("cerrar-detalle");


/* DAR FORMATO A LOS PRECIOS */

function formatoPrecio(valor) {

    return "$ " + Number(valor).toLocaleString("es-CO");

}


/* CREAR UNA CELDA DE TABLA */

function crearCeldaFactura(fila, texto) {

    const celda = document.createElement("td");

    celda.textContent = texto;

    fila.appendChild(celda);

}


/* MOSTRAR LAS VENTAS GUARDADAS */

function mostrarFacturas(ventas) {

    tablaFacturas.innerHTML = "";

    for (let i = 0; i < ventas.length; i++) {

        const venta = ventas[i];

        const fila = document.createElement("tr");

        crearCeldaFactura(fila, venta.numero);

        crearCeldaFactura(fila, venta.fecha);

        crearCeldaFactura(fila, venta.cliente);

        crearCeldaFactura(fila, formatoPrecio(venta.total));

        /* CREAR BOTON VER DETALLE */

        const celdaAcciones = document.createElement("td");

        const botonDetalle = document.createElement("button");

        botonDetalle.type = "button";

        botonDetalle.textContent = "Ver detalle";

        botonDetalle.className = "boton-detalle";

        botonDetalle.dataset.numero = venta.numero;

        celdaAcciones.appendChild(botonDetalle);

        fila.appendChild(celdaAcciones);

        tablaFacturas.appendChild(fila);

    }

}


/* BUSCAR VENTAS */

function buscarFacturas() {

    const texto = buscadorFactura.value.toLowerCase().trim();

    const ventas = obtenerVentas();

    const resultados = [];

    for (let i = 0; i < ventas.length; i++) {

        const numero = ventas[i].numero.toLowerCase();

        const cliente = ventas[i].cliente.toLowerCase();

        if (numero.includes(texto) || cliente.includes(texto)) {

            resultados.push(ventas[i]);

        }

    }

    mostrarFacturas(resultados);

    /* OCULTAR EL DETALLE ANTERIOR */

    detalleFactura.style.display = "none";

}


/* BUSCAR UNA VENTA POR SU NUMERO */

function buscarVentaPorNumero(numero) {

    const ventas = obtenerVentas();

    for (let i = 0; i < ventas.length; i++) {

        if (ventas[i].numero === numero) {

            return ventas[i];

        }

    }

    return null;

}


/* MOSTRAR LOS PRODUCTOS DE UNA VENTA */

function mostrarProductosFactura(productos) {

    productosFactura.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {

        const producto = productos[i];

        const fila = document.createElement("tr");

        crearCeldaFactura(fila, producto.nombre);

        crearCeldaFactura(fila, producto.cantidad);

        crearCeldaFactura(fila, formatoPrecio(producto.precio));

        const subtotal = producto.precio * producto.cantidad;

        crearCeldaFactura(fila, formatoPrecio(subtotal));

        productosFactura.appendChild(fila);

    }

}


/* ABRIR DETALLE DE UNA VENTA */

function abrirDetalleFactura(numero) {

    const venta = buscarVentaPorNumero(numero);

    if (venta === null) {
        return;
    }

    document.getElementById("numero-factura").textContent =
        "Factura: " + venta.numero;

    document.getElementById("cliente-factura").textContent =
        "Cliente: " + venta.cliente;

    document.getElementById("fecha-factura").textContent =
        "Fecha: " + venta.fecha;

    document.getElementById("total-factura").textContent =
        "Total: " + formatoPrecio(venta.total);

    mostrarProductosFactura(venta.productos);

    detalleFactura.style.display = "block";

}


/* CERRAR DETALLE */

function cerrarDetalleFactura() {

    detalleFactura.style.display = "none";

}


/* DETECTAR LA ESCRITURA EN EL BUSCADOR */

buscadorFactura.addEventListener("input", buscarFacturas);


/* DETECTAR EL BOTON BUSCAR */

botonBuscar.addEventListener("click", buscarFacturas);


/* DETECTAR EL BOTON VER DETALLE */

tablaFacturas.addEventListener("click", function(evento) {

    if (evento.target.classList.contains("boton-detalle")) {

        const numero = evento.target.dataset.numero;

        abrirDetalleFactura(numero);

    }

});


/* DETECTAR EL BOTON CERRAR */

botonCerrar.addEventListener("click", cerrarDetalleFactura);


/* CARGAR LAS VENTAS AL ABRIR FACTURACION */

mostrarFacturas(obtenerVentas());
