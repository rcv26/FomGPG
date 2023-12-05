// Registra el Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(registration => {
            console.log('Service Worker registrado con éxito:', registration);
        })
        .catch(error => {
            console.error('Error al registrar el Service Worker:', error);
        });
}