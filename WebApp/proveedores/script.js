const API_URL = "http://localhost:3000/api/proveedores";

$(document).ready(function () {
  obtenerProveedores();

  $("#form_proveedor").on("submit", function (e) {
    e.preventDefault();

    const metodo = $("#metodo_actual").val();
    const id = $("#_id").val();

    const datos = {
      _id: id,
      nombre: $("#nombre").val(),
      servicio: $("#servicio").val(),
      telefono: $("#telefono").val(),
      correo: $("#correo").val(),
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
        obtenerProveedores();
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

function obtenerProveedores() {
  $.ajax({
    url: API_URL,
    type: "GET",
    dataType: "json",
    success: function (res) {
      const tabla = $("#tabla_proveedores");
      tabla.empty();
      res.forEach((p) => {
        tabla.append(`
                    <tr>
                        <td>${p._id}</td>
                        <td>${p.nombre}</td>
                        <td>${p.servicio}</td>
                        <td>${p.telefono}</td>
                        <td>${p.correo}</td>
                        <td class="text-center">
                            <button class="btn btn-sm btn-warning me-1" onclick="cargarParaEditar('${p._id}', '${p.nombre}', '${p.servicio}', '${p.telefono}', '${p.correo}')">
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="eliminarProveedor('${p._id}')">
                                <i class="bi bi-trash"></i> Eliminar
                            </button>
                        </td>
                    </tr>`);
      });
    },
  });
}

function cargarParaEditar(id, nombre, serv, tel, correo) {
  $("#_id").val(id).prop("readonly", true);
  $("#nombre").val(nombre);
  $("#servicio").val(serv);
  $("#telefono").val(tel);
  $("#correo").val(correo);

  $("#metodo_actual").val("PUT");
  $("#titulo_formulario").text("Editando Proveedor");
  $("#btn_guardar")
    .html('<i class="bi bi-arrow-clockwise me-2"></i>Actualizar Cambios')
    .removeClass("btn-success")
    .addClass("btn-warning");
  $("#btn_cancelar").removeClass("d-none");
}

function cancelarEdicion() {
  $("#form_proveedor")[0].reset();
  $("#_id").prop("readonly", false);
  $("#metodo_actual").val("POST");
  $("#titulo_formulario").text("Registro de Proveedores");
  $("#btn_guardar")
    .html('<i class="bi bi-save me-2"></i>Guardar Registro')
    .removeClass("btn-warning")
    .addClass("btn-success");
  $("#btn_cancelar").addClass("d-none");
}

function eliminarProveedor(id) {
  if (confirm("¿Está seguro de que desea eliminar este proveedor?")) {
    $.ajax({
      url: `${API_URL}/${id}`,
      type: "DELETE",
      success: function () {
        alert("Proveedor eliminado");
        obtenerProveedores();
      },
      error: function (err) {
        alert("Error al eliminar: " + err.statusText);
      },
    });
  }
}
