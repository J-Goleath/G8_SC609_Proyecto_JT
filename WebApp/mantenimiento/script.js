const API_URL = "http://localhost:3000/api/mantenimiento";
const API_EMPLEADOS = "http://localhost:3000/api/empleados";

$(document).ready(function () {
  obtenerMantenimientos();
  cargarEmpleados();

  $("#form_mantenimiento").on("submit", function (e) {
    e.preventDefault();

    const metodo = $("#metodo_actual").val();
    const id = $("#_id").val();

    const datos = {
      _id: id,
      area: $("#area").val(),
      descripcion: $("#descripcion").val(),
      fecha: $("#fecha").val(),
      empleado_id: $("#empleado_id").val(),
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
        obtenerMantenimientos();
      },
      error: function (err) {
        alert("Error: " + err.statusText);
      },
    });
  });

  $("#btn_cancelar").on("click", function () {
    cancelarEdicion();
  });
});

function cargarEmpleados() {
  $.ajax({
    url: API_EMPLEADOS,
    type: "GET",
    success: function (res) {
      const select = $("#empleado_id");
      select.empty();

      res.forEach(emp => {
        select.append(`<option value="${emp._id}">${emp._id}</option>`);
      });
    },
  });
}

function obtenerMantenimientos() {
  $.ajax({
    url: API_URL,
    type: "GET",
    success: function (res) {
      const tabla = $("#tabla_mantenimiento");
      tabla.empty();

      res.forEach((m) => {
        tabla.append(`
          <tr>
            <td>${m._id}</td>
            <td>${m.area}</td>
            <td>${m.estado}</td>
            <td>
              <button class="btn btn-sm btn-warning"
                onclick="cargarParaEditar('${m._id}','${m.area}','${m.descripcion}','${m.fecha}','${m.empleado_id}','${m.estado}')">
                Editar
              </button>

              <button class="btn btn-sm btn-danger"
                onclick="eliminarMantenimiento('${m._id}')">
                Eliminar
              </button>
            </td>
          </tr>
        `);
      });
    },
  });
}

function cargarParaEditar(id, area, desc, fecha, emp, estado) {
  $("#_id").val(id).prop("readonly", true);
  $("#area").val(area);
  $("#descripcion").val(desc);
  $("#fecha").val(fecha);
  $("#empleado_id").val(emp);
  $("#estado").val(estado);

  $("#metodo_actual").val("PUT");
  $("#titulo_formulario").text("Editando Mantenimiento");

  $("#btn_guardar")
    .text("Actualizar Cambios")
    .removeClass("btn-success")
    .addClass("btn-warning");

  $("#btn_cancelar").removeClass("d-none");
}

function cancelarEdicion() {
  $("#form_mantenimiento")[0].reset();
  $("#_id").prop("readonly", false);
  $("#metodo_actual").val("POST");

  $("#titulo_formulario").text("Registro de Mantenimiento");

  $("#btn_guardar")
    .text("Guardar Registro")
    .removeClass("btn-warning")
    .addClass("btn-success");

  $("#btn_cancelar").addClass("d-none");
}

function eliminarMantenimiento(id) {
  if (confirm("¿Desea eliminar el registro?")) {
    $.ajax({
      url: `${API_URL}/${id}`,
      type: "DELETE",
      success: function () {
        obtenerMantenimientos();
      },
    });
  }
}