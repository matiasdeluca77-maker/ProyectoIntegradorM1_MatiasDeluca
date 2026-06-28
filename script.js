// ===== REFERENCIAS AL DOM =====
const btnGenerar = document.getElementById('btn-generar');
const selectTamano = document.getElementById('tamano-paleta');
const contenedorPaleta = document.getElementById('contenedor-paleta');

// ===== GENERAR COLOR HEX ALEATORIO =====
function generarColorHex() {
    const letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}

// ===== MOSTRAR TOAST =====
function mostrarToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('visible');
    setTimeout(function() {
        toast.classList.remove('visible');
    }, 2000);
}

// ===== RENDERIZAR PALETA =====
function renderizarPaleta(cantidad) {
    contenedorPaleta.innerHTML = '';
    for (let i = 0; i < cantidad; i++) {
        const color = generarColorHex();
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-color');
        tarjeta.style.backgroundColor = color;
        const codigo = document.createElement('p');
        codigo.textContent = color;
        tarjeta.appendChild(codigo);
        contenedorPaleta.appendChild(tarjeta);
    }
}

// ===== EVENTO PRINCIPAL =====
btnGenerar.addEventListener('click', function() {
    const cantidad = parseInt(selectTamano.value);
    renderizarPaleta(cantidad);
    mostrarToast();
});
