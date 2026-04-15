const API_URL = "http://localhost:3000/api/huespedes";

$(document).ready(function () {
  obtenerReservas();

  $("#form_reserva").on("submit", function (e) {
    e.preventDefault();

    const metodo = $("#metodo_actual").val();
    const id = $("#_id").val();

    const datos = {
      _id: id,
      nombre: $("#huesped_id").val(),
      documento: $("#habitacion_id").val(),
      correo: $("#fecha_ingreso").val(),
      telefono: $("#fecha_salida").val(),
      pais_origen: $("#estado").val(),
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
        obtenerHuespedes();
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
                        <td>${h.estado}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="cargarParaEditar('${h._id}', '${h.huesped_id}', '${h.habitacion_id}', '${h.fecha_ingreso}', '${h.fecha_salida}', '${h.estado}')">Editar</button>
                            <button class="btn btn-sm btn-danger" onclick="eliminarHuesped('${h._id}')">Eliminar</button>
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
    .text("Actualizar Cambios")
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
    .text("Guardar Registro")
    .removeClass("btn-warning")
    .addClass("btn-success");
  $("#btn_cancelar").addClass("d-none");
}

function eliminarReserva(id) {
  if (confirm("¿Desea eliminar el registro?")) {
    $.ajax({
      url: `${API_URL}/${id}`,
      type: "DELETE",
      success: function () {
        obtenerHuespedes();
      },
    });
  }
}
