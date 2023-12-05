// Agrega un evento al botón de "Cerrar Sesión" en la página main.html
const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', () => {
    // Elimina la información de la sesión en IndexedDB
    const request = indexedDB.open('userDatabase', 1);
    
    request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['usuarios'], 'readwrite');
        const userStore = transaction.objectStore('usuarios');
        
        const deleteRequest = userStore.delete('current_user');
        
        deleteRequest.onsuccess = () => {
             window.location.href = 'index.html'; 
        };
    };
});
