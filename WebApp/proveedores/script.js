const API_URL = "http://localhost:3000/api/proveedores";

$(document).ready(function () {
  obtenerHuespedes();

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

function obtenerProveedores() {
  $.ajax({
    url: API_URL,
    type: "GET",
    dataType: "json",
    success: function (res) {
      const tabla = $("#tabla_proveedores");
      tabla.empty();
      res.forEach((h) => {
        tabla.append(`
                    <tr>
                        <td>${h._id}</td>
                        <td>${h.nombre}</td>
                        <td>${h.servicio}</td>
                        <td>${h.telefono}</td>
                        <td>${h.correo}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="cargarParaEditar('${h._id}', '${h.nombre}', '${h.servicio}', '${h.telefono}', '${h.correo}')">Editar</button>
                            <button class="btn btn-sm btn-danger" onclick="eliminarHuesped('${h._id}')">Eliminar</button>
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
    .text("Actualizar Cambios")
    .removeClass("btn-success")
    .addClass("btn-warning");
  $("#btn_cancelar").removeClass("d-none");
}

function cancelarEdicion() {
  $("#form_proveedor")[0].reset();
  $("#_id").prop("readonly", false);
  $("#metodo_actual").val("POST");
  $("#titulo_formulario").text("Registro de Proveedor");
  $("#btn_guardar")
    .text("Guardar Registro")
    .removeClass("btn-warning")
    .addClass("btn-success");
  $("#btn_cancelar").addClass("d-none");
}

function eliminarProveedores(id) {
  if (confirm("¿Desea eliminar el registro?")) {
    $.ajax({
      url: `${API_URL}/${id}`,
      type: "DELETE",
      success: function () {
        obtenerProveedores();
      },
    });
  }
}
