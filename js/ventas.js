
const selectorProducto = document.getElementById("producto");
const campoCantidad = document.getElementById("cantidad");

const botonAgregar = document.getElementById("agregar-producto");
const botonCancelar = document.getElementById("cancelar-venta");
const botonRegistrar = document.getElementById("registrar-venta");

const tablaVenta = document.getElementById("tabla-venta");
const textoTotal = document.getElementById("total");

const mensajeError = document.getElementById("error-producto");
const mensajeVenta = document.getElementById("mensaje-venta");


/* PRODUCTOS QUE EL CLIENTE QUIERE COMPRAR */

let carrito = [];


/* DAR FORMATO A LOS PRECIOS */

function mostrarPrecio(valor) {

    return "$ " + Number(valor).toLocaleString("es-CO");

}


/* CARGAR PRODUCTOS DEL INVENTARIO */

function cargarProductosVenta() {

    const productos = obtenerProductos();

    selectorProducto.innerHTML = "";

    const opcionInicial = document.createElement("option");

    opcionInicial.value = "";
    opcionInicial.textContent = "Seleccionar producto";

    selectorProducto.appendChild(opcionInicial);

    for (let i = 0; i < productos.length; i++) {

        const producto = productos[i];

        if (producto.cantidad > 0) {

            const opcion = document.createElement("option");

            opcion.value = producto.codigo;

            opcion.textContent =
                producto.nombre + " - " +
                mostrarPrecio(producto.precio) +
                " (Stock: " + producto.cantidad + ")";

            selectorProducto.appendChild(opcion);

        }

    }

}


/* BUSCAR UN PRODUCTO EN EL CARRITO */

function buscarEnCarrito(codigo) {

    for (let i = 0; i < carrito.length; i++) {

        if (carrito[i].codigo === codigo) {

            return carrito[i];

        }

    }

    return null;

}


/* CALCULAR EL TOTAL DE LA VENTA */

function calcularTotalVenta() {

    let total = 0;

    for (let i = 0; i < carrito.length; i++) {

        total = total +
            carrito[i].precio * carrito[i].cantidad;

    }

    textoTotal.textContent = mostrarPrecio(total);

}


/* CREAR UNA CELDA EN LA TABLA */

function agregarCelda(fila, contenido) {

    const celda = document.createElement("td");

    celda.textContent = contenido;

    fila.appendChild(celda);

}


/* MOSTRAR PRODUCTOS DEL CARRITO */

function mostrarCarrito() {

    tablaVenta.innerHTML = "";

    for (let i = 0; i < carrito.length; i++) {

        const producto = carrito[i];

        const fila = document.createElement("tr");

        agregarCelda(fila, producto.nombre);
        agregarCelda(fila, mostrarPrecio(producto.precio));
        agregarCelda(fila, producto.cantidad);

        const subtotal = producto.precio * producto.cantidad;

        agregarCelda(fila, mostrarPrecio(subtotal));

        /* CREAR BOTON QUITAR */

        const celdaAcciones = document.createElement("td");

        const botonQuitar = document.createElement("button");

        botonQuitar.type = "button";
        botonQuitar.textContent = "Quitar";
        botonQuitar.className = "boton-quitar";
        botonQuitar.dataset.codigo = producto.codigo;

        celdaAcciones.appendChild(botonQuitar);

        fila.appendChild(celdaAcciones);

        tablaVenta.appendChild(fila);

    }

    calcularTotalVenta();

}


/* AGREGAR UN PRODUCTO A LA VENTA */

function agregarProductoVenta() {

    mensajeError.textContent = "";
    mensajeVenta.textContent = "";

    const codigo = selectorProducto.value;
    const cantidadTexto = campoCantidad.value;
    const cantidad = Number(cantidadTexto);

    /* VALIDAR PRODUCTO */

    if (codigo === "") {

        mensajeError.textContent = "Selecciona un producto.";
        return;

    }

    /* VALIDAR CANTIDAD */

    if (cantidadTexto === "" ||
        !Number.isInteger(cantidad) ||
        cantidad <= 0) {

        mensajeError.textContent =
            "La cantidad debe ser un número entero mayor que cero.";

        return;

    }

    /* BUSCAR PRODUCTO EN INVENTARIO */

    const producto = buscarProductoPorCodigo(codigo);

    if (producto === null) {

        mensajeError.textContent =
            "El producto no existe en Inventario.";

        return;

    }

    /* COMPROBAR SI YA ESTA EN EL CARRITO */

    const productoEnCarrito = buscarEnCarrito(codigo);

    let cantidadAcumulada = cantidad;

    if (productoEnCarrito !== null) {

        cantidadAcumulada =
            productoEnCarrito.cantidad + cantidad;

    }

    /* VALIDAR EXISTENCIAS */

    if (cantidadAcumulada > producto.cantidad) {

        mensajeError.textContent =
            "No hay suficientes unidades. Stock disponible: " +
            producto.cantidad;

        return;

    }

    /* VALIDAR CAMBIO DE PRECIO */

    if (productoEnCarrito !== null &&
        productoEnCarrito.precio !== producto.precio) {

        mensajeError.textContent =
            "El precio cambió. Quita el producto y vuelve a agregarlo.";

        return;

    }

    /* AGREGAR O AUMENTAR CANTIDAD */

    if (productoEnCarrito === null) {

        carrito.push({
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad
        });

    } else {

        productoEnCarrito.cantidad = cantidadAcumulada;

    }

    mostrarCarrito();

    selectorProducto.value = "";
    campoCantidad.value = 1;

}


/* QUITAR UN PRODUCTO DEL CARRITO */

function quitarProducto(codigo) {

    const nuevoCarrito = [];

    for (let i = 0; i < carrito.length; i++) {

        if (carrito[i].codigo !== codigo) {

            nuevoCarrito.push(carrito[i]);

        }

    }

    carrito = nuevoCarrito;

    mostrarCarrito();

    mensajeError.textContent = "";
    mensajeVenta.textContent = "";

}


/* CANCELAR LA VENTA */

function cancelarVenta() {

    carrito = [];

    mostrarCarrito();

    document.getElementById("cliente").value = "";
    document.getElementById("metodo-pago").value = "";

    selectorProducto.value = "";
    campoCantidad.value = 1;

    mensajeError.textContent = "";

    cargarProductosVenta();

    mensajeVenta.textContent =
        "Venta cancelada. No se modificó el inventario.";

}


/* COMPROBAR PRODUCTOS ANTES DE VENDER */

function validarExistencias() {

    for (let i = 0; i < carrito.length; i++) {

        const producto = buscarProductoPorCodigo(carrito[i].codigo);

        /* COMPROBAR QUE EXISTA */

        if (producto === null) {

            mensajeError.textContent =
                "Un producto fue eliminado del Inventario.";

            return false;

        }

        /* COMPROBAR STOCK */

        if (carrito[i].cantidad > producto.cantidad) {

            mensajeError.textContent =
                "Stock insuficiente para " + producto.nombre;

            return false;

        }

        /* COMPROBAR PRECIO ACTUAL */

        if (carrito[i].precio !== producto.precio) {

            mensajeError.textContent =
                "El precio de " + producto.nombre +
                " cambió. Cancela la venta y vuelve a agregarlo.";

            return false;

        }

    }

    return true;

}


/* GUARDAR VENTA CON PROTECCION BASICA */

function guardarVentaSegura(productos, ventas) {

    /* CONSERVAR LOS DATOS ANTERIORES */

    const productosAnteriores =
        localStorage.getItem(CLAVE_PRODUCTOS);

    const ventasAnteriores =
        localStorage.getItem(CLAVE_VENTAS);

    try {

        guardarProductos(productos);
        guardarVentas(ventas);

        return true;

    } catch (error) {

        /* INTENTAR RECUPERAR LOS DATOS ANTERIORES */

        try {

            if (productosAnteriores === null) {

                localStorage.removeItem(CLAVE_PRODUCTOS);

            } else {

                localStorage.setItem(
                    CLAVE_PRODUCTOS,
                    productosAnteriores
                );

            }

            if (ventasAnteriores === null) {

                localStorage.removeItem(CLAVE_VENTAS);

            } else {

                localStorage.setItem(
                    CLAVE_VENTAS,
                    ventasAnteriores
                );

            }

            mensajeError.textContent =
                "No se pudo guardar la venta. Inténtalo nuevamente.";

        } catch (errorRecuperacion) {

            mensajeError.textContent =
                "No se pudo recuperar completamente la información. " +
                "Revisa el Inventario y las ventas.";

        }

        return false;

    }

}


/* REGISTRAR LA VENTA */

function registrarVenta() {

    mensajeError.textContent = "";
    mensajeVenta.textContent = "";

    /* COMPROBAR EL CARRITO */

    if (carrito.length === 0) {

        mensajeError.textContent =
            "Debes agregar al menos un producto.";

        return;

    }

    /* VALIDAR METODO DE PAGO */

    const metodoPago =
        document.getElementById("metodo-pago").value;

    if (metodoPago === "") {

        mensajeError.textContent =
            "Selecciona un método de pago.";

        return;

    }

    /* COMPROBAR EXISTENCIAS Y PRECIOS */

    if (validarExistencias() === false) {

        return;

    }

    /* RECUPERAR PRODUCTOS Y VENTAS */

    const productos = obtenerProductos();
    const ventas = obtenerVentas();

    /* DESCONTAR EXISTENCIAS */

    for (let i = 0; i < carrito.length; i++) {

        for (let j = 0; j < productos.length; j++) {

            if (productos[j].codigo === carrito[i].codigo) {

                productos[j].cantidad =
                    productos[j].cantidad - carrito[i].cantidad;

            }

        }

    }

    /* CALCULAR EL TOTAL */

    let totalVenta = 0;

    for (let i = 0; i < carrito.length; i++) {

        totalVenta = totalVenta +
            carrito[i].precio * carrito[i].cantidad;

    }

    /* CREAR EL REGISTRO */

    const nuevaVenta = {

        numero: "V" + Date.now(),

        fecha: new Date().toLocaleString("es-CO"),

        cliente:
            document.getElementById("cliente").value.trim() ||
            "Consumidor final",

        metodoPago: metodoPago,

        productos: carrito.map(function(producto) {

            return {
                codigo: producto.codigo,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: producto.cantidad
            };

        }),

        total: totalVenta

    };

    ventas.push(nuevaVenta);

    /* INTENTAR GUARDAR INVENTARIO Y VENTA */

    const guardadoCorrecto = guardarVentaSegura(productos, ventas);

    if (guardadoCorrecto === false) {

        return;

    }

    /* LIMPIAR EL CARRITO DESPUES DE GUARDAR */

    carrito = [];

    mostrarCarrito();

    document.getElementById("cliente").value = "";
    document.getElementById("metodo-pago").value = "";

    selectorProducto.value = "";
    campoCantidad.value = 1;

    cargarProductosVenta();

    mensajeVenta.textContent =
        "Venta registrada correctamente. Inventario actualizado.";

}


/* EVENTO DEL BOTON AGREGAR */

botonAgregar.addEventListener("click", agregarProductoVenta);


/* EVENTO DE LOS BOTONES QUITAR */

tablaVenta.addEventListener("click", function(evento) {

    if (evento.target.classList.contains("boton-quitar")) {

        const codigo = evento.target.dataset.codigo;

        quitarProducto(codigo);

    }

});


/* EVENTO DEL BOTON CANCELAR */

botonCancelar.addEventListener("click", cancelarVenta);


/* EVENTO DEL BOTON REGISTRAR */

botonRegistrar.addEventListener("click", registrarVenta);


/* CARGAR PRODUCTOS AL ABRIR VENTAS */

cargarProductosVenta();


/* MOSTRAR EL CARRITO INICIAL */

mostrarCarrito();
