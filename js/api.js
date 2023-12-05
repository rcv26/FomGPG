if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log('Service Worker registrado con éxito.',reg))
    .catch((err) => console.log('Error al registrar el Service Worker:',err));
}
