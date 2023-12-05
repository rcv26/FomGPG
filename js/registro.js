// Abre o crea la base de datos de usuarios
const request = indexedDB.open('userDatabase', 1);

let db;
request.onsuccess = (event) => {
    db = event.target.result;
};

request.onupgradeneeded = (event) => {
    db = event.target.result;

    // Crea un almacén de objetos para los usuarios
    const userStore = db.createObjectStore('usuarios', { keyPath: 'cedula' });
};


const registroForm = document.getElementById('registro');

registroForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cedulaInput = registroForm.querySelector('#cedula');
    const correoInput = registroForm.querySelector('#correo');

    const cedula = cedulaInput.value.trim(); // Trims para eliminar espacios en blanco al inicio y al final
    const correo = correoInput.value.trim();

    // Verifica si los campos no están vacíos
    if (cedula === '' || correo === '') {
        showModal('Por favor, completa todos los campos.');
    } else {
        // Realiza la validación de la cédula
        const esCedulaValida = await validarCedula(cedula);

        if (!esCedulaValida) {
            showModal('Cédula inválida. Por favor, ingresa una cédula válida.');
            return;
        }

        // Verifica si el usuario ya existe en la base de datos
        const transaction = db.transaction(['usuarios'], 'readwrite');
        const userStore = transaction.objectStore('usuarios');

        const request = userStore.get(cedula);

        request.onsuccess = (e) => {
            const user = e.target.result;

            if (user) {
                showModal('El usuario ya existe. Por favor, inicia sesión.');
                window.location.href = 'index.html'; // Redirige al inicio de sesión
            } else {
                // Almacena el nuevo usuario en la base de datos
                userStore.add({ cedula, correo });
                showModal('Registro exitoso. Ahora puedes iniciar sesión.');
                window.location.href = 'index.html'; // Redirige al inicio de sesión
            }
        };
    }
});


function validarCedula(cedula) {

    //if (tipoidentificacion === 'CED') {
    //Preguntamos si la cedula consta de 10 digitos
    if (cedula.length == 10) {
  
      //Obtenemos el digito de la region que sonlos dos primeros digitos
      var digito_region = cedula.substring(0, 2);
  
      //Pregunto si la region existe ecuador se divide en 24 regiones
      if (digito_region >= 1 && digito_region <= 24) {
  
        // Extraigo el ultimo digito
        var ultimo_digito = cedula.substring(9, 10);
  
        //Agrupo todos los pares y los sumo
        var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));
  
        //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        var numero1 = cedula.substring(0, 1);
        var numero1 = (numero1 * 2);
        if (numero1 > 9) {
          var numero1 = (numero1 - 9);
        }
  
        var numero3 = cedula.substring(2, 3);
        var numero3 = (numero3 * 2);
        if (numero3 > 9) {
          var numero3 = (numero3 - 9);
        }
  
        var numero5 = cedula.substring(4, 5);
        var numero5 = (numero5 * 2);
        if (numero5 > 9) {
          var numero5 = (numero5 - 9);
        }
  
        var numero7 = cedula.substring(6, 7);
        var numero7 = (numero7 * 2);
        if (numero7 > 9) {
          var numero7 = (numero7 - 9);
        }
  
        var numero9 = cedula.substring(8, 9);
        var numero9 = (numero9 * 2);
        if (numero9 > 9) {
          var numero9 = (numero9 - 9);
        }
  
        var impares = numero1 + numero3 + numero5 + numero7 + numero9;
  
        //Suma total
        var suma_total = (pares + impares);
  
        //extraemos el primero digito
        var primer_digito_suma = String(suma_total).substring(0, 1);
  
        //Obtenemos la decena inmediata
        var decena = (parseInt(primer_digito_suma) + 1) * 10;
  
        //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        var digito_validador = decena - suma_total;
  
        //Si el digito validador es = a 10 toma el valor de 0
        if (digito_validador == 10)
          var digito_validador = 0;
  
        //Validamos que el digito validador sea igual al de la cedula
        if (digito_validador == ultimo_digito) {
          //console.log('la cedula:' + cedula + ' es correcta');
  
        } else {
          //console.log('la cedula:' + cedula + ' es incorrecta');
          return false;
        }
  
      } else {
        // imprimimos en consola si la region no pertenece
       // console.log('Esta cedula no pertenece a ninguna region');
        return false;
      }
    } else {
      //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      //console.log('Esta cedula tiene menos de 10 Digitos');
      return false;
    }
    return true;
  }
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