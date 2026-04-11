const API_URL = "http://localhost:3000/api/habitaciones";

$(document).ready(function () {
  obtenerHabitaciones();

  $("#form_habitacion").on("submit", function (e) {
    e.preventDefault();
    const metodo = $("#metodo_actual").val();
    const id = $("#_id").val();

    const datos = {
      _id: id,
      numero: parseInt($("#numero").val()),
      tipo: $("#tipo").val(),
      precio_noche: parseFloat($("#precio_noche").val()),
      disponibilidad: $("#disponibilidad").is(":checked"),
      piso: parseInt($("#piso").val()),
    };

    const urlFinal = metodo === "PUT" ? `${API_URL}/${id}` : API_URL;

    $.ajax({
      url: urlFinal,
      type: metodo,
      data: JSON.stringify(datos),
      contentType: "application/json",
      success: function () {
        alert("Habitación guardada correctamente");
        cancelarEdicion();
        obtenerHabitaciones();
      },
      error: function (err) {
        alert("Error: " + err.responseJSON.error);
      },
    });
  });

  $("#btn_cancelar").on("click", cancelarEdicion);
});

function obtenerHabitaciones() {
  $.get(API_URL, function (res) {
    const tabla = $("#tabla_habitaciones");
    tabla.empty();
    res.forEach((h) => {
      const statusBadge = h.disponibilidad
        ? '<span class="badge bg-success">Disponible</span>'
        : '<span class="badge bg-danger">Ocupada</span>';
      tabla.append(`
                <tr>
                    <td>${h._id}</td>
                    <td>${h.numero}</td>
                    <td>${h.tipo}</td>
                    <td>$${h.precio_noche}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <button class="btn btn-sm btn-warning" onclick="cargarParaEditar('${h._id}', ${h.numero}, '${h.tipo}', ${h.precio_noche}, ${h.disponibilidad}, ${h.piso})">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarHabitacion('${h._id}')">Eliminar</button>
                    </td>
                </tr>`);
    });
  });
}

function cargarParaEditar(id, num, tipo, precio, disp, piso) {
  $("#_id").val(id).prop("readonly", true);
  $("#numero").val(num);
  $("#tipo").val(tipo);
  $("#precio_noche").val(precio);
  $("#disponibilidad").prop("checked", disp);
  $("#piso").val(piso);
  $("#metodo_actual").val("PUT");
  $("#btn_guardar")
    .text("Actualizar")
    .removeClass("btn-success")
    .addClass("btn-warning");
  $("#btn_cancelar").removeClass("d-none");
}

function cancelarEdicion() {
  $("#form_habitacion")[0].reset();
  $("#_id").prop("readonly", false);
  $("#metodo_actual").val("POST");
  $("#btn_guardar")
    .text("Guardar Habitación")
    .removeClass("btn-warning")
    .addClass("btn-success");
  $("#btn_cancelar").addClass("d-none");
}

function eliminarHabitacion(id) {
  if (confirm("¿Eliminar habitación?")) {
    $.ajax({
      url: `${API_URL}/${id}`,
      type: "DELETE",
      success: obtenerHabitaciones,
    });
  }
}
