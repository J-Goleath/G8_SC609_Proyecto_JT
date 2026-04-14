const API_URL = "http://localhost:3000/api/servicios";

$(document).ready(function () {
  obtenerServicios();

  $("#form_servicio").on("submit", function (e) {
    e.preventDefault();

    const metodo = $("#metodo_actual").val();
    const id = $("#_id").val();

    const datos = {
      _id: id,
      nombre: $("#nombre").val(),
      costo: $("#costo").val(),
      descripcion: $("#descripcion").val(),
      disponibilidad: $("#disponibilidad").val(),
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
        obtenerServicios();
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

function obtenerServicios() {
  $.ajax({
    url: API_URL,
    type: "GET",
    dataType: "json",
    success: function (res) {
      const tabla = $("#tabla_servicios");
      tabla.empty();
      res.forEach((s) => {
        tabla.append(`
          <tr>
            <td>${s._id}</td>
            <td>${s.nombre}</td>
            <td>${s.costo}</td>
            <td>
              <button class="btn btn-sm btn-warning" onclick="cargarParaEditar('${s._id}', '${s.nombre}', '${s.costo}', '${s.descripcion}', '${s.disponibilidad}')">Editar</button>
              <button class="btn btn-sm btn-danger" onclick="eliminarServicio('${s._id}')">Eliminar</button>
            </td>
          </tr>`);
      });
    },
  });
}

function cargarParaEditar(id, nombre, costo, descripcion, disponibilidad) {
  $("#_id").val(id).prop("readonly", true);
  $("#nombre").val(nombre);
  $("#costo").val(costo);
  $("#descripcion").val(descripcion);
  $("#disponibilidad").val(disponibilidad);

  $("#metodo_actual").val("PUT");
  $("#titulo_formulario").text("Editando Servicio");
  $("#btn_guardar")
    .text("Actualizar Cambios")
    .removeClass("btn-success")
    .addClass("btn-warning");
  $("#btn_cancelar").removeClass("d-none");
}

function cancelarEdicion() {
  $("#form_servicio")[0].reset();
  $("#_id").prop("readonly", false);
  $("#metodo_actual").val("POST");
  $("#titulo_formulario").text("Registro de Servicio");
  $("#btn_guardar")
    .text("Guardar Registro")
    .removeClass("btn-warning")
    .addClass("btn-success");
  $("#btn_cancelar").addClass("d-none");
}

function eliminarServicio(id) {
  if (confirm("¿Desea eliminar el registro?")) {
    $.ajax({
      url: `${API_URL}/${id}`,
      type: "DELETE",
      success: function () {
        obtenerServicios();
      },
    });
  }
}