// ===== REFERENCIAS AL DOM =====
const btnGenerar = document.getElementById('btn-generar');
const selectTamano = document.getElementById('tamano-paleta');
const contenedorPaleta = document.getElementById('contenedor-paleta');

// ===== GENERAR COLOR HSL ALEATORIO =====
function generarColorHSL() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 50) + 50;
    const l = Math.floor(Math.random() * 30) + 35;
    return { h, s, l };
}

// ===== CONVERTIR HSL A HEX =====
function hslAHex(h, s, l) {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

// ===== MOSTRAR TOAST =====
function mostrarToast(mensaje) {
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.classList.add('visible');
    setTimeout(function() {
        toast.classList.remove('visible');
    }, 2000);
}

// ===== RENDERIZAR PALETA =====
function renderizarPaleta(cantidad) {
    contenedorPaleta.innerHTML = '';
    for (let i = 0; i < cantidad; i++) {
        const { h, s, l } = generarColorHSL();
        const hex = hslAHex(h, s, l);
        const hslTexto = `hsl(${h}, ${s}%, ${l}%)`;

        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-color');
        tarjeta.style.backgroundColor = hslTexto;

        const codigoHex = document.createElement('p');
        codigoHex.textContent = hex;
        codigoHex.classList.add('codigo-hex');

        const codigoHsl = document.createElement('p');
        codigoHsl.textContent = hslTexto;
        codigoHsl.classList.add('codigo-hsl');

        tarjeta.appendChild(codigoHex);
        tarjeta.appendChild(codigoHsl);

        tarjeta.addEventListener('click', function() {
            navigator.clipboard.writeText(hex);
            mostrarToast('¡Copiado: ' + hex + '!');
        });

        contenedorPaleta.appendChild(tarjeta);
    }
}

// ===== EVENTO PRINCIPAL =====
btnGenerar.addEventListener('click', function() {
    const cantidad = parseInt(selectTamano.value);
    renderizarPaleta(cantidad);
    mostrarToast('¡Paleta generada!');
});

// ===== GUARDAR PALETA =====
const btnGuardar = document.getElementById('btn-guardar');

btnGuardar.addEventListener('click', function() {
    const tarjetas = document.querySelectorAll('.tarjeta-color');
    
    if (tarjetas.length === 0) {
        mostrarToast('¡Generá una paleta primero!');
        return;
    }

    const colores = [];
    tarjetas.forEach(function(tarjeta) {
        colores.push(tarjeta.querySelector('p').textContent);
    });

    const paletas = JSON.parse(localStorage.getItem('paletas') || '[]');
    paletas.push(colores);
    localStorage.setItem('paletas', JSON.stringify(paletas));

    mostrarToast('¡Paleta guardada!');
});