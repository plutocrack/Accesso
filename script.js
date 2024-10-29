  document.addEventListener("DOMContentLoaded", function () {
    const enlaces = document.querySelectorAll(".enlace-menu"); // Selecciona los enlaces del menú
    const contenidoCentral = document.getElementById("contenido-central");

    enlaces.forEach(enlace => {
        enlace.addEventListener("click", function (event) {
            event.preventDefault(); // Evita recargar la página

            const url = this.getAttribute("data-url"); // Obtén la URL del archivo de contenido

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Red error: " + response.statusText);
                    }
                    return response.text(); // Convierte la respuesta en texto
                })
                .then(data => {
                    // Inserta el nuevo contenido en el contenedor central
                    contenidoCentral.innerHTML = data;

                    // Enfoca el contenedor para que el lector de pantalla lo lea
                    contenidoCentral.setAttribute("tabindex", "-1"); // Asegura que se pueda enfocar
                    contenidoCentral.focus();

                    // Guarda el estado en el historial sin cambiar la URL visible
                    history.pushState({ page: url }, "", "index.html");
                })
                .catch(error => {
                    console.error("Error al cargar el contenido:", error);
                    alert("No se pudo cargar el contenido. Inténtalo de nuevo más tarde."); // Mensaje al usuario
                });
        });
    });
    
    // Manejo del retroceso y avance en el historial
    window.addEventListener("popstate", function (event) {
        if (event.state && event.state.page) {
            // Cargar el contenido del estado guardado en el historial
            fetch(event.state.page)
                .then(response => response.text())
                .then(data => {
                    contenidoCentral.innerHTML = data;
                    contenidoCentral.setAttribute("tabindex", "-1");
                    contenidoCentral.focus();
                })
                .catch(error => console.error("Error al cargar el contenido:", error));
        } else {
            // Si no hay un estado de historial válido, recarga el contenido inicial
            contenidoCentral.innerHTML = "<p>Bienvenido a la página principal. Selecciona una opción del menú.</p>";
        }
    });
});
