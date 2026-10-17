

var boton = document.getElementById("boton-reportes");

var tablas = document.querySelector(".tablas-reportes");



boton.addEventListener("click", function() {

    if (tablas.style.display == "none") {

        tablas.style.display = "grid";

        boton.textContent = "Ocultar tablas";

    } else {

        tablas.style.display = "none";

        boton.textContent = "Mostrar tablas";

    }

});
