const API_URL = "http://localhost:3000/api/pagos";

$(document).ready(function () {
  obtenerPagos();

  $("#form_pago").on("submit", function (e) {
    e.preventDefault();

    const metodo = $("#metodo_actual").val();
    const id = $("#_id").val();

    const datos = {
      _id: id,
      reserva_id: $("#reserva_id").val(),
      monto: parseFloat($("#monto").val()),
      metodo: $("#metodo").val(),
      fecha: $("#fecha").val(),
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
        obtenerPagos();
      },
      error: function (err) {
        alert("Error: " + err.statusText);
      },
    });
  });

  $("#btn_cancelar").on("click", cancelarEdicion);
});

function obtenerPagos() {
  $.ajax({
    url: API_URL,
    type: "GET",
    success: function (res) {
      const tabla = $("#tabla_pagos");
      tabla.empty();

      res.forEach((p) => {
        tabla.append(`
          <tr>
            <td>${p._id}</td>
            <td>${p.reserva_id}</td>
            <td>$${p.monto}</td>
            <td>${p.estado}</td>
            <td>
              <button class="btn btn-sm btn-warning"
                onclick="cargarParaEditar('${p._id}','${p.reserva_id}','${p.monto}','${p.metodo}','${p.fecha}','${p.estado}')">
                Editar
              </button>

              <button class="btn btn-sm btn-danger"
                onclick="eliminarPago('${p._id}')">
                Eliminar
              </button>
            </td>
          </tr>
        `);
      });
    },
  });
}

function cargarParaEditar(id, reserva, monto, metodo, fecha, estado) {
  $("#_id").val(id).prop("readonly", true);
  $("#reserva_id").val(reserva);
  $("#monto").val(monto);
  $("#metodo").val(metodo);
  $("#fecha").val(fecha);
  $("#estado").val(estado);

  $("#metodo_actual").val("PUT");
  $("#titulo_formulario").text("Editando Pago");

  $("#btn_guardar")
    .text("Actualizar Cambios")
    .removeClass("btn-success")
    .addClass("btn-warning");

  $("#btn_cancelar").removeClass("d-none");
}

function cancelarEdicion() {
  $("#form_pago")[0].reset();
  $("#_id").prop("readonly", false);
  $("#metodo_actual").val("POST");

  $("#titulo_formulario").text("Registro de Pago");

  $("#btn_guardar")
    .text("Guardar Registro")
    .removeClass("btn-warning")
    .addClass("btn-success");

  $("#btn_cancelar").addClass("d-none");
}

function eliminarPago(id) {
  if (confirm("¿Desea eliminar el registro?")) {
    $.ajax({
      url: `${API_URL}/${id}`,
      type: "DELETE",
      success: function () {
        obtenerPagos();
      },
    });
  }
}