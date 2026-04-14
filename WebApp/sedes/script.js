const API_URL = "http://localhost:3000/api/sedes";

$(document).ready(function () {
  obtenerSedes();

  $("#form_sede").on("submit", function (e) {
    e.preventDefault();

    const metodo = $("#metodo_actual").val();
    const id = $("#_id").val();

    const datos = {
      _id: id,
      nombre: $("#nombre").val(),
      direccion: $("#direccion").val(),
      ciudad: $("#ciudad").val(),
      telefono: $("#telefono").val(),
      categoria: $("#categoria").val(),
    };

    const urlFinal = metodo === "PUT" ? `${API_URL}/${id}` : API_URL;

    $.ajax({
      url: urlFinal,
      type: metodo,
      data: JSON.stringify(datos),
      contentType: "application/json",
      success: function () {
        alert("Operación exitosa");
        cancelarEdicion();
        obtenerSedes();
      },
      error: function (err) {
        const detalleError =
          err.responseJSON && err.responseJSON.error
            ? err.responseJSON.error
            : err.statusText;
        console.error("Detalle del error:", err.responseJSON);
        alert("Error al procesar: " + detalleError);
      },
    });
  });

  $("#btn_cancelar").on("click", function () {
    cancelarEdicion();
  });
});

function obtenerSedes() {
  $.ajax({
    url: API_URL,
    type: "GET",
    dataType: "json",
    success: function (res) {
      const tabla = $("#tabla_sedes");
      tabla.empty();
      res.forEach((s) => {
        tabla.append(`
          <tr>
            <td>${s._id}</td>
            <td>${s.nombre}</td>
            <td>${s.ciudad}</td>
            <td>
              <button class="btn btn-sm btn-warning" onclick="cargarParaEditar('${s._id}', '${s.nombre}', '${s.direccion}', '${s.ciudad}', '${s.telefono}', '${s.categoria}')">Editar</button>
              <button class="btn btn-sm btn-danger" onclick="eliminarSede('${s._id}')">Eliminar</button>
            </td>
          </tr>`);
      });
    },
  });
}

function cargarParaEditar(id, nombre, direccion, ciudad, telefono, categoria) {
  $("#_id").val(id).prop("readonly", true);
  $("#nombre").val(nombre);
  $("#direccion").val(direccion);
  $("#ciudad").val(ciudad);
  $("#telefono").val(telefono);
  $("#categoria").val(categoria);

  $("#metodo_actual").val("PUT");
  $("#titulo_formulario").text("Editando Sede");
  $("#btn_guardar")
    .text("Actualizar Cambios")
    .removeClass("btn-success")
    .addClass("btn-warning");
  $("#btn_cancelar").removeClass("d-none");
}

function cancelarEdicion() {
  $("#form_sede")[0].reset();
  $("#_id").prop("readonly", false);
  $("#metodo_actual").val("POST");
  $("#titulo_formulario").text("Registro de Sede");
  $("#btn_guardar")
    .text("Guardar Registro")
    .removeClass("btn-warning")
    .addClass("btn-success");
  $("#btn_cancelar").addClass("d-none");
}

function eliminarSede(id) {
  if (confirm("¿Desea eliminar el registro?")) {
    $.ajax({
      url: `${API_URL}/${id}`,
      type: "DELETE",
      success: function () {
        obtenerSedes();
      },
    });
  }
}