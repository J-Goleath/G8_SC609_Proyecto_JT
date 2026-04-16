const API_URL = "http://localhost:3000/api/reservas";

$(document).ready(function () {
  obtenerReservas();

  $("#form_reserva").on("submit", function (e) {
    e.preventDefault();

    const metodo = $("#metodo_actual").val();
    const id = $("#_id").val();

    const datos = {
      _id: id,
      huesped_id: $("#huesped_id").val(),
      habitacion_id: $("#habitacion_id").val(),
      fecha_ingreso: $("#fecha_ingreso").val(),
      fecha_salida: $("#fecha_salida").val(),
      estado: $("#estado").val(),
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
        obtenerReservas();
      },
      error: function (err) {
        const detalleError =
          err.responseJSON && err.responseJSON.error
            ? err.responseJSON.error
            : err.statusText;
        alert("Error al procesar: " + detalleError);
      },
    });
  });

  $("#btn_cancelar").on("click", function () {
    cancelarEdicion();
  });
});

function obtenerReservas() {
  $.ajax({
    url: API_URL,
    type: "GET",
    dataType: "json",
    success: function (res) {
      const tabla = $("#tabla_reserva");
      tabla.empty();
      res.forEach((h) => {
        tabla.append(`
                    <tr>
                        <td>${h._id}</td>
                        <td>${h.huesped_id}</td>
                        <td>${h.habitacion_id}</td>
                        <td>${h.fecha_ingreso}</td>
                        <td>${h.fecha_salida}</td>
                        <td><span class="badge ${h.estado === "cancelada" ? "bg-danger" : "bg-success"}">${h.estado}</span></td>
                        <td class="text-center">
                            <button class="btn btn-sm btn-warning me-1" onclick="cargarParaEditar('${h._id}', '${h.huesped_id}', '${h.habitacion_id}', '${h.fecha_ingreso}', '${h.fecha_salida}', '${h.estado}')">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="eliminarReserva('${h._id}')">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>`);
      });
    },
  });
}

function cargarParaEditar(id, huesped, habitacion, ingreso, salida, estado) {
  $("#_id").val(id).prop("readonly", true);
  $("#huesped_id").val(huesped);
  $("#habitacion_id").val(habitacion);
  $("#fecha_ingreso").val(ingreso);
  $("#fecha_salida").val(salida);
  $("#estado").val(estado);

  $("#metodo_actual").val("PUT");
  $("#titulo_formulario").text("Editando Reserva");
  $("#btn_guardar")
    .html('<i class="bi bi-arrow-clockwise me-2"></i>Actualizar Cambios')
    .removeClass("btn-success")
    .addClass("btn-warning");
  $("#btn_cancelar").removeClass("d-none");
}

function cancelarEdicion() {
  $("#form_reserva")[0].reset();
  $("#_id").prop("readonly", false);
  $("#metodo_actual").val("POST");
  $("#titulo_formulario").text("Registro de Reserva");
  $("#btn_guardar")
    .html('<i class="bi bi-save me-2"></i>Guardar Registro')
    .removeClass("btn-warning")
    .addClass("btn-success");
  $("#btn_cancelar").addClass("d-none");
}

function eliminarReserva(id) {
  if (confirm("¿Desea eliminar esta reserva?")) {
    $.ajax({
      url: `${API_URL}/${id}`,
      type: "DELETE",
      success: function () {
        obtenerReservas();
      },
      error: function (err) {
        alert("Error al eliminar: " + err.statusText);
      },
    });
  }
}
