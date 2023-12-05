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

document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("miFormulario");
    const syncButton = document.getElementById("syncButton");
  
    syncButton.addEventListener("click", function() {

      sincronizarConServicioOracle();
    });


    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        handleFormSubmit();
    });

    function handleFormSubmit() {
        const datosFormulario = obtenerDatosDelFormulario();
        if (navigator.onLine) {
            enviarDatosAlServidor(datosFormulario);
        } else {
            almacenarEnIndexedDB(datosFormulario);
        }
    }


    function obtenerDatosDelFormulario() {
        
        const state = document.getElementById("state").value;
        const origin = document.getElementById("origin").value;
        const registrador = document.getElementById("registrador").value;
        const area = document.getElementById("area").value;
        const fechaactual = document.getElementById("fecha-actual").value;
        const TIPOIDENTIFICACION = document.getElementById("tipoidentificacion").value;
        const numero = document.getElementById("numero").value;
        const fechanacimiento = document.getElementById("fecha-nacimiento").value;
        const edad = document.getElementById("edad").value;
        const beneficiario = document.querySelector('input[name="beneficiario"]:checked').value;
        const sexo = document.querySelector('input[name="sexo"]:checked').value;
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const estadocivil = document.getElementById("estadocivil").value;
        const cantonSelect1 = document.getElementById("cantonSelect1").value;
        const parroquiaSelect1 = document.getElementById("parroquiaSelect1").value;
        const recinto = document.getElementById("recinto").value;
        const cantonSelect2 = document.getElementById("cantonSelect2").value;
        const parroquiaSelect2 = document.getElementById("parroquiaSelect2").value;
        const direccion = document.getElementById("direccion").value;
        const referencia = document.getElementById("referencia").value;
        const telefono = document.getElementById("telefono").value;
        const celular = document.getElementById("celular").value;
        const operadora = document.getElementById("operadora").value;
        const correoelectronico = document.getElementById("correoelectronico").value;
        const internet = document.getElementById("select1").value;
        const tipovivienda = document.getElementById("tipovivienda").value;
        const materialvivienda = document.getElementById("materialvivienda").value;
        const TIENESERVICIOAGUA = document.getElementById("select2").value;
        const TIENESERVICIOLUZ = document.getElementById("select3").value;
        const TIENESERVICIOALCANTAR = document.getElementById("select4").value;
        const tipopoblacion = document.querySelector('input[name="tipopoblacion"]:checked').value;
        const tiempocuidado = document.getElementById("tiempocuidado").value;
        const tienelavadora = document.querySelector('input[name="tienelavadora"]:checked').value;
        const jefefamilia = document.querySelector('input[name="jefefamilia"]:checked').value;
        const amacasa = document.querySelector('input[name="amacasa"]:checked').value;  
        const discapacidad = document.getElementById("discapacidad").value;
        const enfermedadcronica = document.getElementById("enfermedadcronica").value;
        const nivel_educativo = document.getElementById("nivel_educativo").value;
        const situacionlaboral = document.getElementById("situacionlaboral").value;
        const HAYMENORES18ANIOS = document.getElementById("select5").value;
        const NUMMENORES18ANIOS = document.getElementById("nummenores18anios").value;
        const HAYMENORES18ESTUDIANDO = document.getElementById("afirmacion").value;
        const MENORES18SEENFERMAN = document.getElementById("select6").value;
        const IDENFERMEDADMENORES = document.getElementById("enfermedadmenores").value;
        const NUMHOMBRESHOGAR = document.getElementById("ctahombres").value;
        const NUMMUJERESHOGAR = document.getElementById("ctamujeres").value;
        const HAYMUJERESEMBARAZADAS = document.getElementById("select7").value;
        const CTMUJERESEMBARAZADAS = document.getElementById("select8").value;
        const HAYEMBARAZADASMENOS18 = document.getElementById("select9").value;
        const HAYPERSONASDISCAPACIDAD = document.getElementById("select10").value;
        const PERSONASDISCAPACIDAD = document.getElementById("discapacidad2").value;
        const HAYMAYORES65ANIOS = document.getElementById("select11").value;
        const ADULTOSCONENFERMEDAD = document.getElementById("select12").value;
        const idenfermedadadultos = document.getElementById("enfermedadcronica2").value;
        const asociacion = document.getElementById("asociacion").value;
        const cargo = document.getElementById("cargo").value;
        const evento = document.getElementById("evento").value;
        const tipoevento = document.getElementById("tipoevento").value;
        const nomevento = document.getElementById("nomevento").value;
        const empresa = document.getElementById("empresa").value;
        const emprendimiento = document.getElementById("emprendimiento").value;
        const quemprendimiento = document.getElementById("quemprendimiento").value;
        const tiempoempre = document.getElementById("tiempoempre").value;
        const sectorturistico = document.getElementById("sectorturistico").value;
        const organización = document.getElementById("organización").value;
        const nomorganizacion = document.getElementById("nomorganizacion").value;
        const cargod = document.getElementById("cargod").value;
        const hectareas = document.getElementById("hectareas").value;
        const numbeneficiarios = document.getElementById("numbeneficiarios").value;
        const coordenadas = document.getElementById("coordenadas").value;



        const checkboxes = formulario.querySelectorAll('input[name="intereses"]:checked');
                const interesesSeleccionados = [];

                checkboxes.forEach(checkbox => {
                    interesesSeleccionados.push(checkbox.value);
                });

        const checkboxes2 = formulario.querySelectorAll('input[name="intereses2"]:checked');
              const interesesSeleccionados2 = [];

                checkboxes2.forEach(checkbox => {
                    interesesSeleccionados2.push(checkbox.value);
                });        

        return {
            state: state,
            origin: origin,
            registrador: registrador,
            area: area,
            fechaactual: fechaactual,
            tipoidentificacion: TIPOIDENTIFICACION,
            numero: numero,
            fechanacimiento: fechanacimiento,
            edad: edad,
            tipobeneficiario: beneficiario,
            sexo: sexo,
            nombre: nombre,
            apellido: apellido,
            estadocivil: estadocivil,
            cantonSelect1: cantonSelect1,
            parroquiaSelect1: parroquiaSelect1,
            recinto: recinto,
            cantonSelect2: cantonSelect2,
            parroquiaSelect2: parroquiaSelect2,
            direccion: direccion,
            referencia: referencia,
            telefono: telefono,
            celular: celular,
            operadora: operadora,
            correoelectronico: correoelectronico,
            internet: internet,
            tipovivienda: tipovivienda,
            materialvivienda: materialvivienda,
            tieneservicioagua: TIENESERVICIOAGUA,
            tieneservicioluz: TIENESERVICIOLUZ,
            tieneservicioalcantar: TIENESERVICIOALCANTAR,
            tipopoblacion: tipopoblacion,
            tiempocuidado: tiempocuidado,
            tienelavadora: tienelavadora,
            jefefamilia: jefefamilia,
            amacasa: amacasa,
            discapacidad: discapacidad,
            enfermedadcronica: enfermedadcronica,
            nivel_educativo: nivel_educativo,
            situacionlaboral: situacionlaboral,
            haymenores18anios: HAYMENORES18ANIOS,
            nummenores18anios: NUMMENORES18ANIOS,
            haymayores5estudiando: HAYMENORES18ESTUDIANDO,
            mayores5seenferman: MENORES18SEENFERMAN,
            idenfermedadmenores: IDENFERMEDADMENORES,
            numhombreshogar: NUMHOMBRESHOGAR,
            nummujereshogar: NUMMUJERESHOGAR,
            haymujeresembarazadas: HAYMUJERESEMBARAZADAS,
            ctmujeresembarazadas: CTMUJERESEMBARAZADAS,
            hayembarazadasmenos18: HAYEMBARAZADASMENOS18,
            haypersonasdiscapacidad: HAYPERSONASDISCAPACIDAD,
            personasdiscapacidad: PERSONASDISCAPACIDAD,
            haymayores65anios: HAYMAYORES65ANIOS,
            adultosconenfermedad: ADULTOSCONENFERMEDAD,
            idenfermedadadultos: idenfermedadadultos,
            servicios: interesesSeleccionados,
            registro: interesesSeleccionados2,
            asociacion: asociacion,
            cargo: cargo,
            evento: evento,
            tipoevento: tipoevento,
            nomevento: nomevento,
            empresa: empresa,
            emprendimiento: emprendimiento,
            quemprendimiento: quemprendimiento,
            tiempoempre: tiempoempre,
            sectorturistico: sectorturistico,
            organización: organización,
            cargod : cargod,
            nomorganizacion : nomorganizacion,
            hectareas : hectareas,
            numbeneficiarios : numbeneficiarios,
            coordenadas : coordenadas

        };
    }

    function eliminarCamposVacios(datos) {
        const datosLimpios = { ...datos };
    
        for (const campo in datosLimpios) {
            if (!datosLimpios[campo] || datosLimpios[campo].length === 0) {
                delete datosLimpios[campo];
            }
        }
    
        return datosLimpios;
    }

    function enviarDatosAlServidor(datosFormulario) {

        const datosParaEnviar = eliminarCamposVacios(datosFormulario);

        fetch('https://wsdev.guayas.gob.ec/public/deco/encuesta' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosParaEnviar)
        })
        .then(response => response.json())
        .then(data => {
            showModal("Formulario enviado exitosamente!");
            const fechaActualValue = datosFormulario.fechaactual;
            const registradorlValue = datosFormulario.registrador;
            const opcioneslValue = datosFormulario.area;
            const cantonSelect1lValue = datosFormulario.cantonSelect1;
            const parroquiaSelect1lValue = datosFormulario.parroquiaSelect1;
            const recintolValue = datosFormulario.recinto;

            formulario.reset();
            formulario.querySelector('[name="fecha-actual"]').value = fechaActualValue;
            formulario.querySelector('[name="registrador"]').value = registradorlValue;
            formulario.querySelector('[name="area"]').value = opcioneslValue;
            formulario.querySelector('[name="cantonSelect1"]').value = cantonSelect1lValue;
            formulario.querySelector('[name="parroquiaSelect1"]').value = parroquiaSelect1lValue;
            formulario.querySelector('[name="recinto"]').value = recintolValue;

        })
        .catch(error => {
            console.error('Error al enviar el formulario:', error);
            showModal('Error al enviar el formulario:' + error);
        });
    }

    setInterval(function () {
        if (navigator.onLine) {
            sincronizarConServicioOracle();
        }
    }, 3600000);

});

const formulario = document.getElementById("miFormulario");
let formularioParaIndexedDB = formulario;

function almacenarEnIndexedDB(datosFormulario) {
    const request = indexedDB.open('miForm', 1);

    request.onupgradeneeded = function (event) {
        const db = event.target.result;
        db.createObjectStore('formularios', { keyPath: 'id', autoIncrement: true });
    };

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction('formularios', 'readwrite');
        const store = transaction.objectStore('formularios');

        const datosParaAlmacenar = eliminarCamposVacios(datosFormulario);

        store.add(datosParaAlmacenar);

        transaction.oncomplete = function () {
            showModal('Datos guardados en Base.');

            const fechaActualValue = datosFormulario.fechaactual;
            const registradorlValue = datosFormulario.registrador;
            const opcioneslValue = datosFormulario.area;
            const cantonSelect1lValue = datosFormulario.cantonSelect1;
            const parroquiaSelect1lValue = datosFormulario.parroquiaSelect1;
            const recintolValue = datosFormulario.recinto;

            formularioParaIndexedDB.reset();
            formularioParaIndexedDB.querySelector('[name="fecha-actual"]').value = fechaActualValue;
            formularioParaIndexedDB.querySelector('[name="registrador"]').value = registradorlValue;
            formularioParaIndexedDB.querySelector('[name="area"]').value = opcioneslValue;
            formularioParaIndexedDB.querySelector('[name="cantonSelect1"]').value = cantonSelect1lValue;
            formularioParaIndexedDB.querySelector('[name="parroquiaSelect1"]').value = parroquiaSelect1lValue;
            formularioParaIndexedDB.querySelector('[name="recinto"]').value = recintolValue;
        };
    };
}

function eliminarCamposVacios(datos) {
    const datosLimpios = { ...datos };

    for (const campo in datosLimpios) {
        if (!datosLimpios[campo] || datosLimpios[campo].length === 0) {
            delete datosLimpios[campo];
        }
    }

    return datosLimpios;
}

function eliminarRegistroIndexedDB(registroId) {
    const request = indexedDB.open('miForm', 1);

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction('formularios', 'readwrite');
        const store = transaction.objectStore('formularios');
        
        const deleteRequest = store.delete(registroId);

        deleteRequest.onsuccess = function () {
            console.log('Registro eliminado de IndexedDB con éxito');
            showModal('Registro eliminado de IndexedDB con éxito');
        };

        deleteRequest.onerror = function (error) {
            console.error('Error al eliminar el registro de IndexedDB:', error);
            showModal('Error al eliminar el registro de IndexedDB:' + error);
        };
    };
}


async function sincronizarConServicioOracle() {
    try {
        const request = indexedDB.open('miForm', 1);

        request.onerror = function (event) {
            console.error('Error al abrir la base de datos de IndexedDB:', event.target.error);
            showModal('Error al abrir la base de datos de IndexedDB:' + event.target.error);
        };

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction('formularios', 'readwrite');
            const store = transaction.objectStore('formularios');
            const cursorRequest = store.openCursor();

            cursorRequest.onerror = function (event) {
                console.error('Error al abrir el cursor: ', event.target.error);
                showModal('Error al abrir el cursor: ' + event.target.error);
            };

            cursorRequest.onsuccess = function (event) {
                const cursor = event.target.result;

                if (cursor) {
                    const datosFormulario = cursor.value;

                    const datosSinId = { ...datosFormulario };
                    delete datosSinId.id;

                    enviarDatosSYNC(datosSinId)
                        .then(() => {
                            transaction.oncomplete = function () {
                                cursor.delete();
                                eliminarRegistroIndexedDB(datosFormulario.id);
                                showModal('Formulario enviado exitosamente.');
                                cursor.continue();
                            }
                        })
                        .catch(error => {
                            console.error('Error al sincronizar datos: ', error);
                            showModal('Error al sincronizar datos: ' + error)
                        });
                }
            };
        };
    } catch (error) {
        console.error('Error al sincronizar con el servicio Oracle:', error);
        showModal('Error al sincronizar con el servicio Oracle:' + error);
    }
}

async function enviarDatosSYNC(datosFormulario) {
    try {
        const url = 'https://wsdev.guayas.gob.ec/public/deco/encuesta';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosFormulario),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error en la solicitud al servidor:', errorData);
            showModal('Error en la solicitud al servidor:' + errorData);
            throw new Error('Error en la solicitud al servidor');
        }

        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
        showModal("Sincronizado exitosamente!");
        
    } catch (error) {
        console.error('Error al enviar datos al servidor:', error);
        showModal('Error al enviar datos al servidor:' + error);
        throw error; 
    }
}