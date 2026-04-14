const API_URL = "http://localhost:3000/api/transportes";

$(document).ready(function () {
  obtenerTransportes();

  $("#form_transporte").on("submit", function (e) {
    e.preventDefault();

    const metodo = $("#metodo_actual").val();
    const id = $("#_id").val();

    const datos = {
      _id: id,
      tipo: $("#tipo").val(),
      capacidad: $("#capacidad").val(),
      disponible: $("#disponible").val() === "true",
      conductor: $("#conductor").val(),
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
        obtenerTransportes();
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

function obtenerTransportes() {
  $.ajax({
    url: API_URL,
    type: "GET",
    dataType: "json",
    success: function (res) {
      const tabla = $("#tabla_transportes");
      tabla.empty();
      res.forEach((t) => {
        tabla.append(`
          <tr>
            <td>${t._id}</td>
            <td>${t.tipo}</td>
            <td>${t.capacidad}</td>
            <td>${t.disponible}</td>
            <td>
              <button class="btn btn-sm btn-warning" onclick="cargarParaEditar('${t._id}', '${t.tipo}', '${t.capacidad}', '${t.disponible}', '${t.conductor}')">Editar</button>
              <button class="btn btn-sm btn-danger" onclick="eliminarTransporte('${t._id}')">Eliminar</button>
            </td>
          </tr>`);
      });
    },
  });
}

function cargarParaEditar(id, tipo, capacidad, disponible, conductor) {
  $("#_id").val(id).prop("readonly", true);
  $("#tipo").val(tipo);
  $("#capacidad").val(capacidad);
  $("#disponible").val(disponible.toString());
  $("#conductor").val(conductor);

  $("#metodo_actual").val("PUT");
  $("#titulo_formulario").text("Editando Transporte");
  $("#btn_guardar")
    .text("Actualizar Cambios")
    .removeClass("btn-success")
    .addClass("btn-warning");
  $("#btn_cancelar").removeClass("d-none");
}

function cancelarEdicion() {
  $("#form_transporte")[0].reset();
  $("#_id").prop("readonly", false);
  $("#metodo_actual").val("POST");
  $("#titulo_formulario").text("Registro de Transporte");
  $("#btn_guardar")
    .text("Guardar Registro")
    .removeClass("btn-warning")
    .addClass("btn-success");
  $("#btn_cancelar").addClass("d-none");
}

function eliminarTransporte(id) {
  if (confirm("¿Desea eliminar el registro?")) {
    $.ajax({
      url: `${API_URL}/${id}`,
      type: "DELETE",
      success: function () {
        obtenerTransportes();
      },
    });
  }
}