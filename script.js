// Función para parsear el XML y crear los elementos HTML
function crearCarta(xml) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    const grupos = doc.getElementsByTagName("GRUP");

    const cartaContainer = document.querySelector('.carta');

    // Recorremos cada grupo
    for (let i = 0; i < grupos.length; i++) {
        const grupo = grupos[i];
        const nombreGrupo = grupo.querySelector("NOM").textContent;

        // Creamos un nuevo elemento div para el grupo
        const nuevoGrupo = document.createElement('div');
        nuevoGrupo.classList.add('grupo');
        nuevoGrupo.innerHTML = `<h2>${nombreGrupo}</h2>`;

        // Recorremos cada plato del grupo
        const platos = grupo.getElementsByTagName("PLAT");
        for (let j = 0; j < platos.length; j++) {
            const plato = platos[j];
            const nombrePlato = plato.querySelector("NOM").textContent;
            const descripcion = plato.querySelector("DESCRIPCIO").textContent;
            const precio = plato.querySelector("PREU").textContent;

            // Creamos un nuevo elemento div para el plato
            const nuevoPlato = document.createElement('div');
            nuevoPlato.classList.add('plato');
            nuevoPlato.innerHTML = `
                <span class="nombre">${nombrePlato}</span>
                <p class="descripcion">${descripcion}</p>
                <span class="precio">${precio}</span>
            `;

            nuevoGrupo.appendChild(nuevoPlato);
        }

        cartaContainer.appendChild(nuevoGrupo);
    }
}

// Fetch del XML y llamada a la función para crear la carta
fetch('https://raw.githubusercontent.com/IvanMonlau/Practica-5---M7/main/data.xml')
    .then(response => response.text())
    .then(xml => crearCarta(xml))
    .catch(error => console.error('Error al cargar el XML:', error));