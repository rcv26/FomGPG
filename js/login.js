const request = indexedDB.open('userDatabase', 1);

let db;

request.onsuccess = (event) => {
    db = event.target.result;
};

request.onupgradeneeded = (event) => {
    db = event.target.result;
    
    const userStore = db.createObjectStore('usuarios', { keyPath: 'cedula' });
    userStore.add({ cedula: '0922406038', correo: 'ricardo.cobo@guayas.gob.ec' });
    userStore.add({ cedula: 'registrador', correo: 'registrador' });
    userStore.add({ cedula: 'admin', correo: 'admin' });
};

// Agrega un evento al formulario de inicio de sesión
const loginForm = document.getElementById('login');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const cedula = loginForm.querySelector('#cedula').value;
    const correo = loginForm.querySelector('#correo').value;

    // Realiza la comprobación de credenciales en IndexedDB
    const transaction = db.transaction(['usuarios'], 'readonly');
    const userStore = transaction.objectStore('usuarios');

    const request = userStore.get(cedula);

    request.onsuccess = (e) => {
        const user = e.target.result;

        if (user && user.correo === correo) {

            window.location.href = 'formulario.html';
            window.location.href = 'formulario.html?cedula=' + cedula;
        } else {
            showModal('Credenciales incorrectas. Intenta de nuevo.');
        }
    };
});

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Previene que se muestre automáticamente el banner de instalación
    e.preventDefault();

    // Almacena el evento para mostrar el banner más tarde
    deferredPrompt = e;

    // Muestra el botón de instalación
    document.getElementById('installButton').style.display = 'block';
});

document.getElementById('installButton').addEventListener('click', () => {
    // Muestra el banner de instalación cuando se hace clic en el botón
    deferredPrompt.prompt();

    // Espera a que el usuario responda al banner
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('El usuario ha aceptado instalar la PWA');
        } else {
            console.log('El usuario ha rechazado instalar la PWA');
        }

        // Reinicia el evento para futuras solicitudes
        deferredPrompt = null;
    });
});

function showModal(message) {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('myModal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.innerHTML = message;

    overlay.style.display = 'block';
    modal.style.display = 'block';

    // Cierra el modal cuando se hace clic en la "x"
    const closeBtn = document.querySelector('.close');
    //closeBtn.onclick = "
    closeBtn.addEventListener("click", function () {
        closeModal();
    });

    // Cierra el modal si se hace clic fuera de él
    window.onclick = function (event) {
        if (event.target === overlay) {
            closeModal();
        }
    };
}

function closeModal() {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('myModal');
    overlay.style.display = 'none';
    modal.style.display = 'none';
}