const API_URL = "http://localhost:3000/api/huespedes";

$(document).ready(function () {
  obtenerHuespedes();

  $("#form_huesped").on("submit", function (e) {
    e.preventDefault();

    const metodo = $("#metodo_actual").val();
    const id = $("#_id").val();

    const datos = {
      _id: id,
      nombre: $("#nombre").val(),
      documento: $("#documento").val(),
      correo: $("#correo").val(),
      telefono: $("#telefono").val(),
      pais_origen: $("#pais_origen").val(),
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

function obtenerHuespedes() {
  $.ajax({
    url: API_URL,
    type: "GET",
    dataType: "json",
    success: function (res) {
      const tabla = $("#tabla_huespedes");
      tabla.empty();
      res.forEach((h) => {
        tabla.append(`
                    <tr>
                        <td>${h._id}</td>
                        <td>${h.nombre}</td>
                        <td>${h.pais_origen}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="cargarParaEditar('${h._id}', '${h.nombre}', '${h.documento}', '${h.correo}', '${h.telefono}', '${h.pais_origen}')">Editar</button>
                            <button class="btn btn-sm btn-danger" onclick="eliminarHuesped('${h._id}')">Eliminar</button>
                        </td>
                    </tr>`);
      });
    },
  });
}

function cargarParaEditar(id, nombre, doc, correo, tel, pais) {
  $("#_id").val(id).prop("readonly", true);
  $("#nombre").val(nombre);
  $("#documento").val(doc);
  $("#correo").val(correo);
  $("#telefono").val(tel);
  $("#pais_origen").val(pais);

  $("#metodo_actual").val("PUT");
  $("#titulo_formulario").text("Editando Huesped");
  $("#btn_guardar")
    .text("Actualizar Cambios")
    .removeClass("btn-success")
    .addClass("btn-warning");
  $("#btn_cancelar").removeClass("d-none");
}

function cancelarEdicion() {
  $("#form_huesped")[0].reset();
  $("#_id").prop("readonly", false);
  $("#metodo_actual").val("POST");
  $("#titulo_formulario").text("Registro de Huesped");
  $("#btn_guardar")
    .text("Guardar Registro")
    .removeClass("btn-warning")
    .addClass("btn-success");
  $("#btn_cancelar").addClass("d-none");
}

function eliminarHuesped(id) {
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
