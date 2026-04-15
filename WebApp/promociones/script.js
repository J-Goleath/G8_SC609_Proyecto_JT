const API_URL = "http://localhost:3000/api/promociones";

$(document).ready(function () {
  obtenerPromociones();

  $("#form_huesped").on("submit", function (e) {
    e.preventDefault();

    const metodo = $("#metodo_actual").val();
    const id = $("#_id").val();

    const datos = {
      _id: id,
      nombre: $("#nombre").val(),
      descripcion: $("#descripcion").val(),
      porcentaje_descuento: $("#porcentaje_descuento").val(),
      fecha_inicio: $("#fecha_inicio").val(),
      fecha_fin: $("#fecha_fin").val(),
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
        obtenerPromociones();
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

function obtenerPromociones() {
  $.ajax({
    url: API_URL,
    type: "GET",
    dataType: "json",
    success: function (res) {
      const tabla = $("#tabla_promociones");
      tabla.empty();
      res.forEach((h) => {
        tabla.append(`
                    <tr>
                        <td>${h._id}</td>
                        <td>${h.nombre}</td>
                        <td>${h.descripcion}</td>
                        <td>${h.porcentaje_descuento}</td>
                        <td>${h.fecha_inicio}</td>
                        <td>${h.fecha_fin}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="cargarParaEditar('${h._id}', '${h.nombre}', '${h.descripcion}', '${h.porcentaje_descuento}', '${h.fecha_inicio}', '${h.fecha_fin}')">Editar</button>
                            <button class="btn btn-sm btn-danger" onclick="eliminarHuesped('${h._id}')">Eliminar</button>
                        </td>
                    </tr>`);
      });
    },
  });
}

function cargarParaEditar(id, nombre, desc, descuento, inicio, fin) {
  $("#_id").val(id).prop("readonly", true);
  $("#nombre").val(nombre);
  $("#descripcion").val(desc);
  $("#porcentaje_descuento").val(descuento);
  $("#fecha_inicio").val(inicio);
  $("#fecha_fin").val(fin);

  $("#metodo_actual").val("PUT");
  $("#titulo_formulario").text("Editando Promocion");
  $("#btn_guardar")
    .text("Actualizar Cambios")
    .removeClass("btn-success")
    .addClass("btn-warning");
  $("#btn_cancelar").removeClass("d-none");
}

function cancelarEdicion() {
  $("#form_promociones")[0].reset();
  $("#_id").prop("readonly", false);
  $("#metodo_actual").val("POST");
  $("#titulo_formulario").text("Registro de Promocion");
  $("#btn_guardar")
    .text("Guardar Registro")
    .removeClass("btn-warning")
    .addClass("btn-success");
  $("#btn_cancelar").addClass("d-none");
}

function eliminarPromocion(id) {
  if (confirm("¿Desea eliminar el registro?")) {
    $.ajax({
      url: `${API_URL}/${id}`,
      type: "DELETE",
      success: function () {
        obtenerPromociones();
      },
    });
  }
}
