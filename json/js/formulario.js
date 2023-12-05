var fechaActualInput = document.getElementById("fecha-actual");
var fecha = new Date();
var anio = fecha.getFullYear();
var mes = String(fecha.getMonth() + 1).padStart(2, '0');
var dia = String(fecha.getDate()).padStart(2, '0');
var fechaFormateada = anio + '-' + mes + '-' + dia;

fechaActualInput.value = fechaFormateada;

function calcularEdad() {
  // Obtener la fecha de nacimiento del campo
  const fechaNacimiento = new Date(document.getElementById("fecha-nacimiento").value);

  // Verificar si la fecha de nacimiento es válida y no es negativa
  if (isNaN(fechaNacimiento) || fechaNacimiento.getFullYear() < 0) {
    showModal("Por favor, ingresa una fecha de nacimiento válida.");
    return;
  }

  // Verificar si el año tiene más de cuatro dígitos
  if (fechaNacimiento.getFullYear() > 9999) {
    showModal("Por favor, ingresa un año válido.");
    return;
  }

  // Obtener la fecha actual
  const fechaHoy = new Date();
  let edad = fechaHoy.getFullYear() - fechaNacimiento.getFullYear();

  if (
    fechaHoy.getMonth() < fechaNacimiento.getMonth() ||
    (fechaHoy.getMonth() === fechaNacimiento.getMonth() && fechaHoy.getDate() < fechaNacimiento.getDate())
  ) {
    edad--;
  }

  // Verificar si la edad es mayor de 120
  if (edad > 120) {
    showModal("La edad máxima permitida es de 120 años.");

    // Deshabilitar campos
    document.getElementById("nombre").disabled = true;
    document.getElementById("apellido").disabled = true;
    document.getElementById("Principal").disabled = true;
    document.getElementById("Dependiente").disabled = true;
    document.getElementById("Masculino").disabled = true;
    document.getElementById("Femenino").disabled = true;
    document.getElementById("estadocivil").disabled = true;

    return;
  }

  // Si la edad es 120 o menos, habilitar campos
  habilitarCampos();

  // Actualizar el campo de edad si es menor o igual a 120
  const edadInput = document.getElementById("edad");
  edadInput.value = edad;
}

function habilitarCampos() {
  // Habilitar campos del formulario
  document.getElementById("nombre").disabled = false;
  document.getElementById("apellido").disabled = false;
  document.getElementById("Principal").disabled = false;
  document.getElementById("Dependiente").disabled = false;
  document.getElementById("Masculino").disabled = false;
  document.getElementById("Femenino").disabled = false;
  document.getElementById("estadocivil").disabled = false;
}

function showModal(message, elemento) {
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
    const element = document.getElementById(elemento.id);
    closeModal(element);
  });

  // Cierra el modal si se hace clic fuera de él
  window.onclick = function (event) {
    if (event.target === overlay) {
      closeModal(elemento);
    }
  };
}

function closeModal(elemento) {
  const overlay = document.getElementById('overlay');
  const modal = document.getElementById('myModal');
  overlay.style.display = 'none';
  modal.style.display = 'none';
  elemento.focus();
}

function cargarJSON(url) {
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      console.error('Error al cargar JSON:', error);
    });
}

var provinciaSeleccionada = 2;


cargarJSON('json/CANTONES.json').then(function (jsonCantones) {

  var cantonSelect1 = document.getElementById('cantonSelect1');
  var cantonSelect2 = document.getElementById('cantonSelect2');

  var optionDefault = document.createElement('option');
  optionDefault.value = 'NA';
  optionDefault.text = 'Seleccione un cantón';
  cantonSelect1.appendChild(optionDefault);

  var optionDefault2 = document.createElement('option');
  optionDefault2.value = 'NA';
  optionDefault2.text = 'Seleccione un cantón';
  cantonSelect2.appendChild(optionDefault2);

  var cantonesFiltrados = jsonCantones.CANTONES.filter(function (canton) {
    return canton.IDPROVINCIA === provinciaSeleccionada;
  });

  cantonesFiltrados.forEach(function (canton) {
    var option1 = document.createElement('option');
    option1.value = canton.IDCANTON;
    option1.text = canton.NOMBRE;
    cantonSelect1.appendChild(option1);

    var option2 = document.createElement('option');
    option2.value = canton.IDCANTON;
    option2.text = canton.NOMBRE;
    cantonSelect2.appendChild(option2);
  });
});

cargarJSON('json/PARROQUIAS.json').then(function (jsonParroquias) {

  var cantonSelect1 = document.getElementById('cantonSelect1');
  var cantonSelect2 = document.getElementById('cantonSelect2');
  var parroquiaSelect1 = document.getElementById('parroquiaSelect1');
  var parroquiaSelect2 = document.getElementById('parroquiaSelect2');

  [cantonSelect1, cantonSelect2].forEach(function (cantonSelect) {
    cantonSelect.addEventListener('change', function () {

      var selectedCanton = cantonSelect.value;


      var parroquiaSelect;
      if (cantonSelect === cantonSelect1) {
        parroquiaSelect = parroquiaSelect1;
      } else if (cantonSelect === cantonSelect2) {
        parroquiaSelect = parroquiaSelect2;
      }
      parroquiaSelect.innerHTML = '<option value="NA">Selecciona una parroquia</option>';


      var parroquias = jsonParroquias.PARROQUIAS.filter(function (parroquia) {
        return parroquia.IDCANTON === parseInt(selectedCanton);
      });


      parroquias.forEach(function (parroquia) {
        var option = document.createElement('option');
        option.value = parroquia.IDPARROQUIA;
        option.text = parroquia.NOMBRE;
        parroquiaSelect.appendChild(option);
      });
    });
  });
});

function llenarSelect0(idSelect, opciones) {
  var select = document.getElementById(idSelect);

  select.innerHTML = '';

  var optionDefault = document.createElement('option');
  optionDefault.value = 'NA';
  optionDefault.text = 'Selecciona una opción';
  select.appendChild(optionDefault);

  opciones.forEach(function (opcion) {
    var option = document.createElement('option');
    option.value = opcion.IDITEM;
    option.text = opcion.DESCRIPCION;
    select.appendChild(option);
  });
}

fetch('json/afirmacion1.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    llenarSelect0('emprendimiento', data);
  })
  .catch(function (error) {
    console.error('Error al cargar el archivo JSON:', error);
  });

function llenarSelect1(idSelect, opciones) {
  var select = document.getElementById(idSelect);


  select.innerHTML = '';

  var optionDefault = document.createElement('option');
  optionDefault.value = 'NA';
  optionDefault.text = 'Selecciona una opción';
  select.appendChild(optionDefault);


  opciones.forEach(function (opcion) {
    var option = document.createElement('option');
    option.value = opcion.IDITEM;
    option.text = opcion.DESCRIPCION;
    select.appendChild(option);
  });
}


fetch('json/afirmacion1.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    llenarSelect1('select1', data);
    llenarSelect1('select2', data);
    llenarSelect1('select3', data);
    llenarSelect1('select4', data);
    llenarSelect1('select5', data);
    llenarSelect1('select6', data);
    llenarSelect1('select7', data);
    llenarSelect1('select8', data);
    llenarSelect1('select9', data);
    llenarSelect1('select10', data);
    llenarSelect1('select11', data);
    llenarSelect1('select12', data);

  })
  .catch(function (error) {
    console.error('Error al cargar el archivo JSON:', error);
  });


function llenarSelect2(idSelect, opciones) {
  var select = document.getElementById(idSelect);

  select.innerHTML = '';

  var optionDefault = document.createElement('option');
  optionDefault.value = 'NA';
  optionDefault.text = 'Selecciona una opción';
  select.appendChild(optionDefault);

  opciones.forEach(function (opcion) {
    var option = document.createElement('option');
    option.value = opcion.IDITEM;
    option.text = opcion.DESCRIPCION;
    select.appendChild(option);
  });
}

fetch('json/afirmacion2.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    llenarSelect2('afirmacion', data);
  })
  .catch(function (error) {
    console.error('Error al cargar el archivo JSON:', error);
  });


function llenarSelect3(idSelect, opciones) {
  var select = document.getElementById(idSelect);

  select.innerHTML = '';

  var optionDefault = document.createElement('option');
  optionDefault.value = 'NA';
  optionDefault.text = 'Selecciona una opción'; //aqui cambiar a id *selecionar* 
  select.appendChild(optionDefault);

  opciones.forEach(function (opcion) {
    var option = document.createElement('option');
    option.value = opcion.IDITEM;
    option.text = opcion.DESCRIPCION;
    select.appendChild(option);
  });
}

fetch('json/tipo_vivienda.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    llenarSelect3('tipovivienda', data);
  })
  .catch(function (error) {
    console.error('Error al cargar el archivo JSON:', error);
  });


function llenarSelect4(idSelect, opciones) {
  var select = document.getElementById(idSelect);

  select.innerHTML = '';

  var optionDefault = document.createElement('option');
  optionDefault.value = 'NA';
  optionDefault.text = 'Selecciona una opción'; //aqui cambiar a id *selecionar* 
  select.appendChild(optionDefault);

  opciones.forEach(function (opcion) {
    var option = document.createElement('option');
    option.value = opcion.IDITEM;
    option.text = opcion.DESCRIPCION;
    select.appendChild(option);
  });
}

fetch('json/material_vivienda.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    llenarSelect4('materialvivienda', data);
  })
  .catch(function (error) {
    console.error('Error al cargar el archivo JSON:', error);
  });


  function llenarSelect5(idSelect, opciones) {
  var select = document.getElementById(idSelect);

  select.innerHTML = '';

  var optionDefault = document.createElement('option');
  optionDefault.value = '';
  optionDefault.text = 'Selecciona una opción'; //aqui cambiar a id *selecionar* 
  select.appendChild(optionDefault);

  opciones.forEach(function (opcion) {
    var option = document.createElement('option');
    option.value = opcion.IDITEM;
    option.text = opcion.DESCRIPCION;
    select.appendChild(option);
  });
}

fetch('/json/tipo_evento.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    llenarSelect5('tipoevento', data);
  })
  .catch(function (error) {
    console.error('Error al cargar el archivo JSON:', error);
  });


function llenarSelect6(idSelect, opciones) {
  var select = document.getElementById(idSelect);

  select.innerHTML = '';

  var optionDefault = document.createElement('option');
  optionDefault.value = 'NA';
  optionDefault.text = 'Selecciona una opción'; //aqui cambiar a id *selecionar* 
  select.appendChild(optionDefault);

  opciones.forEach(function (opcion) {
    var option = document.createElement('option');
    option.value = opcion.IDITEM;
    option.text = opcion.DESCRIPCION;
    select.appendChild(option);
  });
}

fetch('json/discapacidad.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    llenarSelect6('discapacidad', data);
  })
  .catch(function (error) {
    console.error('Error al cargar el archivo JSON:', error);
  });


function llenarSelect7(idSelect, opciones) {
  var select = document.getElementById(idSelect);

  select.innerHTML = '';

  var optionDefault = document.createElement('option');
  optionDefault.value = 'NA';
  optionDefault.text = 'Selecciona una opción'; //aqui cambiar a id *selecionar* 
  select.appendChild(optionDefault);

  opciones.forEach(function (opcion) {
    var option = document.createElement('option');
    option.value = opcion.IDITEM;
    option.text = opcion.DESCRIPCION;
    select.appendChild(option);
  });
}

fetch('json/discapacidad2.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    llenarSelect7('discapacidad2', data);
  })
  .catch(function (error) {
    console.error('Error al cargar el archivo JSON:', error);
  });



function llenarSelect8(idSelect, opciones) {
  var select = document.getElementById(idSelect);

  select.innerHTML = '';

  var optionDefault = document.createElement('option');
  optionDefault.value = 'NA';
  optionDefault.text = 'Selecciona una opción'; //aqui cambiar a id *selecionar* 
  select.appendChild(optionDefault);

  opciones.forEach(function (opcion) {
    var option = document.createElement('option');
    option.value = opcion.IDITEM;
    option.text = opcion.DESCRIPCION;
    select.appendChild(option);
  });
}

fetch('json/enfermedad_adultos.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    llenarSelect8('enfermedadcronica2', data);
  })
  .catch(function (error) {
    console.error('Error al cargar el archivo JSON:', error);
  });

function llenarSelect9(idSelect, opciones) {
  var select = document.getElementById(idSelect);

  select.innerHTML = '';

  var optionDefault = document.createElement('option');
  optionDefault.value = 'NA';
  optionDefault.text = 'Selecciona una opción'; //aqui cambiar a id *selecionar* 
  select.appendChild(optionDefault);

  opciones.forEach(function (opcion) {
    var option = document.createElement('option');
    option.value = opcion.IDITEM;
    option.text = opcion.DESCRIPCION;
    select.appendChild(option);
  });
}

fetch('json/enfermedad_adultos2.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    llenarSelect9('enfermedadcronica', data);
  })
  .catch(function (error) {
    console.error('Error al cargar el archivo JSON:', error);
  });

function llenarSelect10(idSelect, opciones) {
  var select = document.getElementById(idSelect);

  select.innerHTML = '';

  var optionDefault = document.createElement('option');
  optionDefault.value = 'NA';
  optionDefault.text = 'Selecciona una opción'; //aqui cambiar a id *selecionar* 
  select.appendChild(optionDefault);

  opciones.forEach(function (opcion) {
    var option = document.createElement('option');
    option.value = opcion.IDITEM;
    option.text = opcion.DESCRIPCION;
    select.appendChild(option);
  });
}

fetch('json/nivel_educativo.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    llenarSelect10('nivel_educativo', data);
  })
  .catch(function (error) {
    console.error('Error al cargar el archivo JSON:', error);
  });

function llenarSelect11(idSelect, opciones) {
  var select = document.getElementById(idSelect);

  select.innerHTML = '';

  var optionDefault = document.createElement('option');
  optionDefault.value = 'NA';
  optionDefault.text = 'Selecciona una opción'; //aqui cambiar a id *selecionar* 
  select.appendChild(optionDefault);

  opciones.forEach(function (opcion) {
    var option = document.createElement('option');
    option.value = opcion.IDITEM;
    option.text = opcion.DESCRIPCION;
    select.appendChild(option);
  });
}

fetch('json/situacion_laboral.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    llenarSelect11('situacionlaboral', data);
  })
  .catch(function (error) {
    console.error('Error al cargar el archivo JSON:', error);
  });

function llenarSelect12(idSelect, opciones) {
  var select = document.getElementById(idSelect);

  select.innerHTML = '';

  var optionDefault = document.createElement('option');
  optionDefault.value = 'NA';
  optionDefault.text = 'Selecciona una opción'; //aqui cambiar a id *selecionar* 
  select.appendChild(optionDefault);

  opciones.forEach(function (opcion) {
    var option = document.createElement('option');
    option.value = opcion.IDITEM;
    option.text = opcion.DESCRIPCION;
    select.appendChild(option);
  });
}

fetch('json/enfermedad_menores.json')
  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    llenarSelect12('enfermedadmenores', data);
  })
  .catch(function (error) {
    console.error('Error al cargar el archivo JSON:', error);
  });

  function llenarSelect13(idSelect, opciones) {
    var select = document.getElementById(idSelect);
  
    select.innerHTML = '';
  
    var optionDefault = document.createElement('option');
    optionDefault.value = 'NA';
    optionDefault.text = 'Selecciona una opción';
    select.appendChild(optionDefault);
  
    opciones.forEach(function (opcion) {
      var option = document.createElement('option');
      option.value = opcion.IDITEM;
      option.text = opcion.DESCRIPCION;
      select.appendChild(option);
    });
  }
  
  fetch('json/afirmacion1.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      llenarSelect13('sectorturistico', data);
    })
    .catch(function (error) {
      console.error('Error al cargar el archivo JSON:', error);
    });

    function llenarSelect14(idSelect, opciones) {
      var select = document.getElementById(idSelect);
    
      select.innerHTML = '';
    
      var optionDefault = document.createElement('option');
      optionDefault.value = 'NA';
      optionDefault.text = 'Selecciona una opción';
      select.appendChild(optionDefault);
    
      opciones.forEach(function (opcion) {
        var option = document.createElement('option');
        option.value = opcion.IDITEM;
        option.text = opcion.DESCRIPCION;
        select.appendChild(option);
      });
    }
    
    fetch('json/tiempo_emprendimiento.json')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        llenarSelect14('tiempoempre', data);
      })
      .catch(function (error) {
        console.error('Error al cargar el archivo JSON:', error);
      });
  

function openTab(tabName) {
  var i;
  var tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}





document.getElementById('area').addEventListener('change', function () {
  // Obtén el valor seleccionado
  var seleccion = this.value;

  // Accede a los botones de pestaña
  var datostecButton = document.getElementById('tab6Button');
  var datospButton = document.getElementById('tab5Button');
  var registroButton = document.getElementById('tab4Button');
  var serviciosButton = document.getElementById('tab3Button');

  // Verifica si los botones existen antes de acceder a ellos
  if (!registroButton || !serviciosButton) {
    showModal("Los botones de pestaña no se encontraron en el documento.");
    return;
  }

  if (seleccion === 'DEECO') {
    openTab('tab1');
    datostecButton.style.display = 'none';
    registroButton.style.display = 'none'; // Ocultar el botón "Registro"
    datospButton.style.display = 'none';
    serviciosButton.style.display = 'block'; // Mostrar el botón "Servicios"

  } else if (seleccion === 'MZCV' || seleccion === 'MZCV2') {
    openTab('tab1'); // Muestra la pestaña "Servicios"
    datostecButton.style.display = 'none';
    registroButton.style.display = 'block'; // Mostrar el botón "Registro"
    serviciosButton.style.display = 'none';
    datospButton.style.display = 'none';// Ocultar el botón "Servicios"
  }else if (seleccion === 'RURAL') {
    openTab('tab1');
    datostecButton.style.display = 'none';
    registroButton.style.display = 'none'; 
    datospButton.style.display = 'block';
    serviciosButton.style.display = 'none'; 
  }else if (seleccion === 'TURISMO') {
    openTab('tab1');
    registroButton.style.display = 'none'; 
    datospButton.style.display = 'none';
    datostecButton.style.display = 'block';
    serviciosButton.style.display = 'none'; 
  }
  markActiveTab('tab1')
});

function markActiveTab(tabId) {
  const tabButtons = document.getElementsByClassName('tab-button');
  for (const button of tabButtons) {
      const dataTarget = button.getAttribute('data-target');
      if (dataTarget === tabId) {
          button.classList.add('active'); // Agrega la clase "active" a la pestaña activa
      } else {
          button.classList.remove('active'); // Quita la clase "active" de otras pestañas
      }
  }
}

// let currentStep = 1;

// function showStep(step) {
//   const tabContents = document.getElementsByClassName("tab-content");
//   for (const content of tabContents) {
//       content.style.display = "none";
//   }

//   const currentStepContent = document.getElementById(`tab${step}`);
//   if (currentStepContent) {
//       currentStepContent.style.display = "block";
//       currentStep = step;

//       // Actualizar la visibilidad del botón
//       updateButtonVisibility();
//   }
// }

// function updateButtonVisibility() {
//   const btnEnviarContainer = document.getElementById('btnEnviarContainer');
//   if (currentStep === 3 || currentStep === 4 || currentStep === 5) {
//       // Mostrar el contenedor del botón en las pestañas 3, 4 y 5
//       btnEnviarContainer.style.display = 'block';
//   } else {
//       // Ocultar el contenedor del botón en otras pestañas
//       btnEnviarContainer.style.display = 'none';
//   }
// }

// function prevStep() {
//   if (currentStep > 1) {
//       showStep(currentStep - 1);
//   }
// }

// function nextStep() {
//   // Realiza validaciones o lógica específica según el paso actual antes de avanzar
//   if (currentStep < 3) {
//       showStep(currentStep + 1);
//   }
// }

// function updateSteps(seleccion) {
//   // Lógica para mostrar u ocultar pestañas según la selección
//   if (seleccion === 'DEECO') {
//       showStep(1);
//   } else if (seleccion === 'MZCV' || 'MZCV2') {
//       showStep(2);
//   } else if (seleccion === 'RIESGOS') {
//       showStep(3);
//   }
// }

// // Ejemplo de actualización de pasos según la selección
// document.getElementById('area').addEventListener('change', function () {
//   const seleccion = this.value;
//   updateSteps(seleccion);
// });



const select5 = document.getElementById("select5");
const nummenores18anios = document.getElementById("nummenores18anios");
const afirmacion = document.getElementById("afirmacion");
const select6 = document.getElementById("select6");
const enfermedadmenores = document.getElementById("enfermedadmenores");

select5.addEventListener("change", function () {

  if (select5.value === "SI") {
    nummenores18anios.disabled = false;
    afirmacion.disabled = false;
    select6.disabled = false;
    enfermedadmenores.disabled = false;
  } else {
    nummenores18anios.disabled = true;
    afirmacion.disabled = true;
    select6.disabled = true;
    enfermedadmenores.disabled = true;
    nummenores18anios.value = "0";
    afirmacion.value = "NA";
    select6.value = "NA";
    enfermedadmenores.value = "NA";
  }
});

select6.addEventListener("change", function () {

  if (select6.value === "SI") {
    enfermedadmenores.disabled = false;
  } else {
    enfermedadmenores.disabled = true;
    enfermedadmenores.value = "NA";
  }
});


const ctamujeres = document.getElementById("ctamujeres");
const select7 = document.getElementById("select7");
const select8 = document.getElementById("select8");
const select9 = document.getElementById("select9");

ctamujeres.addEventListener("change", function () {

  if (ctamujeres.value === "0") {
    select7.disabled = true;
    select8.disabled = true;
    select9.disabled = true;

  } else {
    select7.disabled = false;
    select8.disabled = false;
    select9.disabled = false;
    select7.value = "NA";
    select8.value = "NA";
    select9.value = "NA";
  }
});


select7.addEventListener("change", function () {

  if (select7.value === "SI") {
    select8.disabled = false;
    select9.disabled = false;
  } else {
    select8.disabled = true;
    select9.disabled = true;
    select8.value = "NA";
    select9.value = "NA";
  }
});

const select10 = document.getElementById("select10");
const discapacidad2 = document.getElementById("discapacidad2");


select10.addEventListener("change", function () {

  if (select10.value === "SI") {
    discapacidad2.disabled = false;
  } else {
    discapacidad2.disabled = true;
    discapacidad2.value = "NA";
  }
});

const select12 = document.getElementById("select12");
const enfermedadcronica2 = document.getElementById("enfermedadcronica2");


select12.addEventListener("change", function () {

  if (select12.value === "SI") {
    enfermedadcronica2.disabled = false;
  } else {
    enfermedadcronica2.disabled = true;
    enfermedadcronica2.value = "NA";
  }
});

function limitarInputLetrasConÑ(inputElement, maxLength) {
  inputElement.addEventListener("input", function () {
    var input = this.value.replace(/[^a-zA-ñÑZáéíóúÁÉÍÓÚüÜ\s]/g, ''); // Expresión regular para permitir solo letras y la letra "Ñ".
    if (input.length > maxLength) {
      input = input.slice(0, maxLength);
    }
    this.value = input;
  });
}

// Usar la función para limitar los campos de entrada a letras y la letra "Ñ".
limitarInputLetrasConÑ(document.getElementById("nombre"), 50);
limitarInputLetrasConÑ(document.getElementById("apellido"), 50);
limitarInputLetrasConÑ(document.getElementById("recinto"), 50);
limitarInputLetrasConÑ(document.getElementById("direccion"), 100);
limitarInputLetrasConÑ(document.getElementById("referencia"), 100);

//openLoadingModal();

function detectDeviceType() {
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  return screenWidth <= 768 ? 'phone' : 'desktop';
}

// Obtener información del tipo de dispositivo y actualizar el campo oculto
const deviceTypeField = document.getElementById("origin");
deviceTypeField.value = detectDeviceType();


document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  function openTab(tabId) {
    tabContents.forEach((tabContent) => {
      tabContent.style.display = "none";
    });

    tabButtons.forEach((tabButton) => {
      tabButton.classList.remove("active");
    });

    const selectedTabContent = document.getElementById(tabId);
    selectedTabContent.style.display = "block";

    const selectedTabButton = document.querySelector(`[data-target="${tabId}"]`);
    selectedTabButton.classList.add("active");

    // Aplicar el enfoque a la pestaña activa
    selectedTabButton.focus();
  }

  openTab("tab1");
});


const urlParams = new URLSearchParams(window.location.search);
const cedula = urlParams.get('cedula');
// Asigna la cédula al campo de entrada "registrador"
document.getElementById('registrador').value = cedula;

function ActivaTab(elemento) {
  const elementoConClaseActive = document.querySelector("[data-target].active");
  if (elementoConClaseActive) {
    elementoConClaseActive.classList.remove("active");

    const elementoBuscado = document.querySelector('.tab-content[style*="display: block"]');
    elementoBuscado.style.display = "none";
  }

  const tab = elemento.getAttribute("data-container");
  const elemento2 = document.querySelector("[data-target = " + tab + "].tab-button");

  //elementos.forEach(function (elemento) {
  elemento2.classList.add("active");
  //});

  const mytab = document.getElementById(tab);
  mytab.style.display = "block";

}


document.addEventListener("DOMContentLoaded", function () {
  const enviar = document.getElementById("btnenviar");
  enviar.addEventListener('click', function (e) {

    if (!validarFormulario(e)) {
      e.preventDefault();
      return false;
    }
    //console.log('Validacion Correcta!');
  });
});

function validarFormulario(e) {
  const campos = [
    'cantonSelect1',
    'parroquiaSelect1',
    'tipoidentificacion',
    'numero',
    'fecha-nacimiento',
    'edad',
    'Principal',
    'Dependiente',
    'Masculino',
    'Femenino',
    'nombre',
    'apellido',
    'estadocivil'
  ];
  let formularioValido = true;
  for (let i = 0; i < campos.length; i++) {
    const elemento = document.getElementById(campos[i]);
    if (elemento.disabled == false) {
      if (validarCampo(elemento) === false) {
        formularioValido = false;
        break;
      }
    }
  }

  if (!formularioValido)
    return false;

  const data = document.querySelectorAll("[data-container]")
  for (let i = 0; i < data.length; i++) {
    const elemento = document.getElementById(data[i].id);
    if (elemento.disabled == false) {
      let mensajeError = '';
      const tab = elemento.getAttribute("data-container");
      switch (tab) {
        case 'tab1':
          mensajeError = 'Por favor llena la pestaña de Datos de Localización, Comunicación, Conectividad y Vivienda';
          break;
        case 'tab2':
          mensajeError = 'Por favor llena la pestaña de Datos Sociales';
          break;
        default:
          mensajeError = 'Por favor completa todos los campos requeridos';
      }
      mensajeError += "<br><br>";

      if (validarCampo(elemento, mensajeError) === false) {
        formularioValido = false;
        ActivaTab(elemento);
        break;
      }
    }
  }
  if (formularioValido === false)
    return false;

  const elementos = document.querySelectorAll(".tab-content");
  const cedulaInput = document.getElementById("numero");
  const cedula = cedulaInput.value;
  const tipoidentificacion = document.getElementById("tipoidentificacion");

  if (tipoidentificacion.value === "CED") {
    if (!validarCedula(cedula)) {
      showModal('Cédula inválida. Por favor, ingresa una cédula válida.');
      cedulaInput.focus();
      return false;
    }
  }

  const telefonoInput = document.getElementById("telefono");
  const telefono = telefonoInput.value;
  if (!(telefono === "")) {
    const minLengthTelefono = 7;
    const maxLengthTelefono = 10;

    const validarTelefono = limitarInputNumerico(minLengthTelefono, maxLengthTelefono);
    const esTelefonoValido = validarTelefono(telefono);

    if (!esTelefonoValido) {
      ActivaTab(telefonoInput);
      showModal('El número de teléfono debe tener entre ' + minLengthTelefono + ' y ' + maxLengthTelefono + ' dígitos.');
      telefonoInput.focus();
      return false;
    }
  }

  const celularInput = document.getElementById("celular");
  const celular = celularInput.value;
  const minLengthCelular = 10; // Cambia el valor según tus requisitos
  const maxLengthCelular = 10; // Cambia el valor según tus requisitos

  const validarCelular = limitarInputNumerico(minLengthCelular, maxLengthCelular);
  const esCelularValido = validarCelular(celular);

  if (!esCelularValido) {
    ActivaTab(celularInput);
    showModal('El número de celular debe tener exactamente ' + minLengthCelular + ' dígitos.');
    celularInput.focus();
    return false;
  }

  elementos.forEach(function (elemento) {
    if (elemento.style.display === "block")
      elemento.style.display = "none";
  });

  const opcion = document.getElementById("area");

  if (opcion.value === "DEECO") {
    const checkboxes = document.querySelectorAll('input[name="intereses"]:checked');
    if (checkboxes.length === 0) {
      showModal('Debe grabar por lo menos un servicio.');

      // Encuentra la pestaña que contiene los checkboxes
      const tabConErrores = document.getElementById("tab3");
      const elementoConClaseActive = document.querySelector("[data-target].active");

      // Oculta todas las pestañas y muestra la que contiene los errores
      if (elementoConClaseActive) {
        elementoConClaseActive.classList.remove("active");
      }

      if (tabConErrores) {
        tabConErrores.style.display = "block";
      }

      const elemento2 = document.querySelector("[data-target = tab3].tab-button");

      //elementos.forEach(function (elemento) {
      elemento2.classList.add("active");

      return false;
    }

  } else if (opcion.value === "MZCV") {
    const checkboxes2 = document.querySelectorAll('input[name="intereses2"]:checked');
    if (checkboxes2.length === 0) {
      showModal('Debe grabar por lo menos un registro.');

      // Encuentra la pestaña que contiene los checkboxes
      const tabConErrores = document.getElementById("tab4");
      const elementoConClaseActive = document.querySelector("[data-target].active");

      // Oculta todas las pestañas y muestra la que contiene los errores
      if (elementoConClaseActive) {
        elementoConClaseActive.classList.remove("active");
      }

      if (tabConErrores) {
        tabConErrores.style.display = "block";
      }

      const elemento2 = document.querySelector("[data-target = tab4].tab-button");


      elemento2.classList.add("active");

      return false;
    }
  }

  const horas = document.getElementById("tiempocuidado");

  if (horas.value > 16 || horas.value < 0) {
    showModal("Valor máximo de horas es de 16.");
    horas.focus();

    return false;
  }

  return true;
}

// var ctahombres = document.getElementById('ctahombres');
// var ctamujeres2 = document.getElementById('ctamujeres');
// var nummenores18anios2 = document.getElementById('nummenores18anios');

// // Evento que se activa al cambiar cualquier select
// function validarSuma() {
//     // Obtener los valores seleccionados
//     var hombres = parseInt(ctahombres.value) || 0;
//     var mujeres = parseInt(ctamujeres2.value) || 0;
//     var menores = parseInt(nummenores18anios2.value) || 0;

//     // Calcular la suma
//     var suma = hombres + mujeres;

//     // Comparar la suma con el valor de menores y mostrar un mensaje si es necesario
//     if (suma > menores) {
//         alert('La suma de hombres (' + hombres + ') y mujeres (' + mujeres + ') no debe superar el número de menores de 18 años (' + menores + ').');
//     }
// }

// // Asignar el evento a cada select
// ctahombres.addEventListener('change', validarSuma);
// ctamujeres.addEventListener('change', validarSuma);
// nummenores18anios.addEventListener('change', validarSuma);

function validarCampo(elemento, msj = '') {
  const dataName = elemento.getAttribute("data-name");

  switch (elemento.type.toLowerCase()) {
    case 'text':
    case 'select-one':
      if (elemento.value.trim() === "" || elemento.value === "NA") {
        showModal(msj + `Por favor llene el campo ${dataName}.`, elemento);
        elemento.focus();
        return false;
      }
      break;
    case 'radio':
      const radioGroup = document.getElementsByName(elemento.name);
      const radioSeleccionado = Array.from(radioGroup).some(radio => radio.checked);
      if (!radioSeleccionado) {
        showModal(msj + `Selecciona una opción para el campo ${dataName}.`, elemento);
        //radioSeleccionado.focus();
        return false;
      }
      break;
    case 'tel':
      // Omitir la validación para el campo de teléfono
      break;
  }

  return true;
}

function limitarInputNumerico(minLength, maxLength) {
  return function (inputValue) {
    var input = inputValue.replace(/\D/g, ''); // Eliminar caracteres no numéricos

    if (input.length > maxLength) {
      input = input.slice(0, maxLength);
    }

    if (input.length < minLength) {
      // Si no cumple con el mínimo, puedes realizar alguna acción, como mostrar un mensaje de error
      //console.log("El número debe tener al menos " + minLength + " dígitos.");
      return false;
    }

    return true;
  };
}

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
        // console.log('la cedula:' + cedula + ' es incorrecta');
        return false;
      }

    } else {
      // imprimimos en consola si la region no pertenece
      //console.log('Esta cedula no pertenece a ninguna region');
      return false;
    }
  } else {
    //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
    //console.log('Esta cedula tiene menos de 10 Digitos');
    return false;
  }
  return true;
}


document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const campoInvisible = document.getElementById('campoInvisible');

  // Agregar un evento de cambio a cada checkbox
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      actualizarCampoInvisible();
    });
  });

  function actualizarCampoInvisible() {
    // Verificar si al menos un checkbox está seleccionado
    const alMenosUnCheckboxSeleccionado = Array.from(checkboxes).some(function (checkbox) {
      return checkbox.checked;
    });

    // Actualizar la visibilidad y el contenido del campo invisible
    if (alMenosUnCheckboxSeleccionado) {
      campoInvisible.style.display = 'none';
      campoInvisible.value = 'Contenido del campo';
    } else {
      campoInvisible.style.display = 'none';
      campoInvisible.value = '';
    }
  }
  //closeLoadingModal();
});

const tab5Elements = document.querySelectorAll('#tab5 input, #tab5 select');
const tab6Elements = document.querySelectorAll('#tab6 input, #tab6 select');

// Función para habilitar o deshabilitar los elementos según la visibilidad
function toggleElementsVisibility(tabElements, tabButtonId) {
    const displayStyle = window.getComputedStyle(document.getElementById(tabButtonId)).display;

    // Habilitar o deshabilitar cada elemento según la visibilidad de la pestaña
    tabElements.forEach(element => {
        element.disabled = displayStyle === 'none';
    });
}

// Llamar a la función al cargar la página
toggleElementsVisibility(tab5Elements, 'tab5Button');
toggleElementsVisibility(tab6Elements, 'tab6Button');

// Llamar a la función cuando cambia la visibilidad de la pestaña
document.getElementById('tab5Button').addEventListener('click', () => toggleElementsVisibility(tab5Elements, 'tab5Button'));
document.getElementById('tab6Button').addEventListener('click', () => toggleElementsVisibility(tab6Elements, 'tab6Button'));
