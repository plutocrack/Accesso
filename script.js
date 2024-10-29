document.addEventListener("DOMContentLoaded", function () {
    const enlaces = document.querySelectorAll(".enlace-menu"); // Selecciona los enlaces del menú
    const contenidoCentral = document.getElementById("contenido-central");

    enlaces.forEach(enlace => {
        enlace.addEventListener("click", function (event) {
            event.preventDefault(); // Evita recargar la página completa

            const url = this.getAttribute("data-url"); // Obtén la URL del archivo de contenido

            // Cargar el contenido sin cambiar la URL ni el historial
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error de red: " + response.statusText);
                    }
                    return response.text(); // Convierte la respuesta en texto
                })
                .then(data => {
                    contenidoCentral.innerHTML = data; // Inserta el nuevo contenido

                    // Enfoca el contenedor para que el lector de pantalla lo lea
                    contenidoCentral.setAttribute("tabindex", "-1"); // Asegura que se pueda enfocar
                    contenidoCentral.focus();
                })
                .catch(error => {
                    console.error("Error al cargar el contenido:", error);
                    alert("No se pudo cargar el contenido. Inténtalo de nuevo más tarde."); // Mensaje al usuario
                });
        });
    });
});
