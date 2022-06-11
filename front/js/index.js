const url = "http://localhost:8000/productos";

//FETCH GET
fetch(url)
  .then((response) => response.json())
  .then((data) => manipularData(data));

const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
let contenido = "";

//AGREGAR LAS TARJETAS
const manipularData = (data) => {
  data.forEach((objeto) => {
    contenido += ` <div class="col-12 col-sm-10 col-xl-6 mb-5">    
                     <div class="card d-sm-flex flex-md-row align-items-center h-100">
                     <span class="efecto-cards"></span>
                     <button type="button" class="btn btn-warning btn-sm px-3 btn-editar text-capitalize" data-id=${
                       objeto.id
                     }>
                             editar <i class="fas fa-pen-square"></i>
                            </button>
                        <img src="${objeto.imagen}" alt="" srcset="" />
                        <div class="card-body py-4 h-100">
                          <div class=" d-flex justify-content-between">
                            ${buscarDisponibilidad(objeto)}
                            <p class="precio strong">$${objeto.precio}</p>
                          </div>
                          <h5 class="card-title text-capitalize strong">
                            ${objeto.nombre}
                          </h5>
                          <h6 class="card-subtitle mb-3 text-capitalize">
                            vendido por ${objeto.vendedor}
                          </h6>
                          <p class="card-text">
                            ${objeto.descripcion}
                          </p>
                          <p class="text-capitalize mt-3 mb-1 strong">cuotas:</p>
                          <div class="cuotas d-flex justify-content-end">
                            <span class="cuota">${
                              objeto.cuotas[1]
                            } cuotas</span>
                          </div>
                          <p class="text-capitalize mt-3 mb-1 strong">color:</p>
                          <div class="colores d-flex justify-content-end">
                          <span class="color" style="background:${
                            objeto.colores[0]
                          }"></span>
                          </div>
                          <div class="botones mt-4 d-flex justify-content-end">
                            <button type="button" class="btn btn-outline-danger btn-sm px-3 btn-borrar text-capitalize" data-id=${
                              objeto.id
                            }>
                            eliminar <i class="fas fa-minus-circle"></i>
                            </button>
                          </div>                          
                        </div>                        
                     </div>
                   </div>`;
  });
  contenedorTarjetas.innerHTML = contenido;

  //TENGO QUE PONER LOS LISTENERS DE LOS BOTONES DENTRO DE LA FUNCION QUE LOS CREA SINO NO FUNCIONAN

  //LISTENER ELIMINAR PRODUCTO
  let botonesEliminar = document.querySelectorAll(".btn-borrar");

  botonesEliminar.forEach((boton) => {
    //OBTENER EL ID DEL PRODUCTO DEL BOTON
    let productoId = boton.dataset.id;

    //FUNCION ANONIMA PRIMERO PARA PODER PASAR PARAMETROS
    boton.addEventListener("click", () => {
      eliminarProducto(productoId);
    });
  });

  //LISTENER EDITAR PRODUCTO
  let botonesEditar = document.querySelectorAll(".btn-editar");

  botonesEditar.forEach((boton) => {
    let productoId = boton.dataset.id;

    boton.addEventListener("click", () => {
      editarProducto(productoId);
    });
  });
};

/*****FUNCIONES DE LOS LISTENERS*****/

//FETCH DELETE SE EJECUTA AL CLICKEAR EL BOTON ELIMINAR
const eliminarProducto = (id) => {
  let urlDelete = `http://localhost:8000/productos/${id}`;
  fetch(urlDelete, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => mostrarMensaje(data, "alert-danger"));
};

//CONTENEDOR PARA EVITAR CLICKEAR HASTA QUE TERMINE LA ALERTA
let contenedorAlertas = document.querySelector(".contenedor-alerta");
let miAlerta = document.querySelector(".mi-alerta");

//FUNCION QUE MUESTRA EL CONTENEDOR CON SU ALERTA
const mostrarMensaje = (data, classAlerta) => {
  let contenedorMensaje = document.querySelector(".mensaje-alerta");

  contenedorAlertas.classList.add("d-flex");
  miAlerta.classList.add(classAlerta);
  contenedorAlertas.style.opacity = "1";

  setTimeout(() => {
    contenedorAlertas.classList.remove("d-flex");
    contenedorAlertas.style.opacity = "0";
    miAlerta.classList.remove(classAlerta);
  }, 2000);

  contenedorMensaje.innerHTML = data.message;
};

//FETCH POST SE EJECUTA AL CLICKEAR EL BOTON AGREGAR
const añadirProducto = () => {
  fetch(url, { method: "POST" })
    .then((response) => response.json())
    .then((data) => mostrarMensaje(data, "alert-success"));
};

//LISTENER AÑADIR PRODUCTO
let botonAñadir = document.querySelector(".btn-añadir");

botonAñadir.addEventListener("click", añadirProducto);

//FETCH GET:ID
const editarProducto = (id) => {
  let urlGetId = `http://localhost:8000/productos/${id}`;
  fetch(urlGetId, { method: "GET" })
    .then((response) => response.json())
    .then((data) => mostrarEditar(data));
};

//FUNCION QUE CREA LA CARD PARA EDITAR EL PRODUCTO AL QUE SE LE PRESIONO EL BOTON EDITAR
const mostrarEditar = (data) => {
  let contenedorEditar = document.querySelector(".contenedor-editar");
  let contenido = `<div class="col-12 col-sm-9 col-md-7 col-xl-5 mb-5">
  <div
    class="
      card
      d-sm-flex
      flex-md-row
      align-items-center
      position-relative
      h-100
    "
  >
  <span class="efecto-cards"></span>
    <div class="card-body py-4 h-100">
      <h5 class="card-title text-capitalize">${data.nombre}</h5>
      <p class="card-text">${data.descripcion}</p>
      <p class="text-capitalize mt-3 mb-1 strong">seleccionar cuotas:</p>
      <div class="cuotas d-flex justify-content-end">
        ${buscarcuotas(data)}
      </div>
      <p class="text-capitalize mt-3 mb-1 strong">seleccionar color:</p>
      <div class="colores d-flex justify-content-end">
        ${buscarColores(data)}
      </div>
      <div class="botones mt-4 d-flex justify-content-end">
        <button
          type="button"
          class="btn btn-outline-success btn-sm px-3 btn-guardar text-capitalize"
        >
          guardar <i class="fas fa-check-circle"></i>
        </button>
      </div>
    </div>
  </div>
</div>`;
  contenedorEditar.innerHTML = contenido;
  contenedorEditar.classList.add("d-flex");

  //LISTENER DEL BOTON GUARDAR DE LA CARD EDITAR
  //IGUAL QUE LOS PRIMEROS LISTENERS, TENGO QUE PONERLOS DENTRO DE LA FUNCION QUE CREA SU CONTENEDOR
  let botonGuardar = document.querySelector(".btn-guardar");

  botonGuardar.addEventListener("click", () => {
    editarProductoDos(data.id, contenedorEditar);
  });
};

//FETCH PUT
const editarProductoDos = (id, contenedor) => {
  contenedor.classList.remove("d-flex");
  let urlGetId = `http://localhost:8000/productos/${id}`;
  fetch(urlGetId, { method: "PUT" })
    .then((response) => response.json())
    .then((data) => mostrarMensaje(data, "alert-success"));
};

//FUNCION PARA DEVOLVER SI EL PRODUCTO ESTA DISPONIBLE O NO
const buscarDisponibilidad = (objeto) => {
  if (objeto.disponible) {
    return `<p class=" text-success text-capitalize strong">
    disponible
  </p>`;
  } else {
    return `<p class=" text-danger text-capitalize strong">
    no disponible
  </p>`;
  }
};

//FUNCION PARA CREAR TANTOS SPAN COMO COLORES TENGA EL PRODUCTO
const buscarColores = (objeto) => {
  let contenidoColores = "";
  objeto.colores.forEach((color) => {
    contenidoColores += `<span class="color" style="background:${color}"></span>`;
  });
  return contenidoColores;
};

//FUNCION PARA CREAR TANTOS SPAN COMO CUOTAS TENGA EL PRODUCTO
const buscarcuotas = (objeto) => {
  let contenidoCuotas = "";
  objeto.cuotas.forEach((cuota) => {
    contenidoCuotas += `<span class="cuota">${cuota} cuotas</span>`;
  });
  return contenidoCuotas;
};
