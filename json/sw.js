const cacheName = 'site-static-v441'; // Cambiar el número de versión cuando actualices los activos

const assets = [
    '/',
    '/index.html',
    '/main.js',
    '/registrar.html',
    '/formulario.html',
    '/css/formulario.css',
    '/css/login.css',
    '/css/wait.css',
    '/css/modal.css',
    '/css/all.css',
    '/css/normalize.css',
    '/js/formulario.js',
    '/js/login.js',
    '/js/logout.js',
    '/js/registro.js',
    '/js/wait.js',
    '/json/afirmacion1.json',
    '/json/afirmacion2.json',
    '/json/CANTONES.json',
    '/json/discapacidad.json',
    '/json/discapacidad2.json',
    '/json/enfermedad_adultos.json',
    '/json/enfermedad_adultos2.json',
    '/json/enfermedad_menores.json',
    '/json/material_vivienda.json',
    '/json/nivel_educativo.json',
    '/json/PARROQUIAS.json',
    '/json/PROVINCIAS.json',
    '/json/situacion_laboral.json',
    '/json/tipo_vivienda.json',
    '/json/tipo_evento.json',
    '/json/tiempo_emprendimiento.json',
    '/img/logo_prefectura.png',
    '/img/iconoPrefectura.png',
    '/js/jquery-3.6.0.min.js',
    '/webfonts/fa-solid-900.woff2',
    '/webfonts/fa-solid-900.woff',
    '/webfonts/fa-solid-900.ttf',
    '/webfonts/Roboto-Regular.ttf',
    '/webfonts/Roboto-Bold.ttf',
    '/webservice.js'
];

self.addEventListener('install', event => {
    try {
        // Llamar a openLoadingModal al iniciar la carga de recursos
        console.log("Inicia la carga....")

        event.waitUntil(
            caches.open(cacheName)
                .then(cache => cache.addAll(assets))
                .then(() => {
                    // Llamar a closeLoadingModal al finalizar la carga de recursos
                    console.log("Temrinó la carga.")
                })
        );
    } catch (error) {
        console.error('Error al instalar los recursos: ' + error);
        // Si ocurre un error, asegúrate de cerrar la modal de espera
        closeLoadingModal();
    }
});
/*
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
*/
/*
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== cacheName) {
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});
*/

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(async fetchRes => {
                try {
                    const cache = await caches.open(cacheName);
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                } catch (error) {
                    console.error('Error al almacenar en caché el recurso:', error);
                }
            }).catch(error => {
                console.error('Error al buscar el recurso en caché:', error);
            });
        }).catch(() => {
            if (evt.request.url.includes('.html')) {
                return caches.match('/offline.html'); // Página personalizada para recursos no encontrados en caché
            }
        })
    );
});