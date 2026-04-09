const API_URL = "http://localhost:3000/api/empleados";

$(document).ready(function () {
  obtenerEmpleados();

  $("#form_empleado").on("submit", function (e) {
    e.preventDefault();

    const metodo = $("#metodo_actual").val();
    const id = $("#_id").val();

    const datos = {
      _id: id,
      nombre: $("#nombre").val(),
      cargo: $("#cargo").val(),
      horario: $("#horario").val(),
      contacto: $("#contacto").val(),
      sueldo: parseFloat($("#sueldo").val()),
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
        obtenerEmpleados();
      },
      error: function (err) {
        alert("Error: " + err.statusText);
      },
    });
  });

  $("#btn_cancelar").on("click", cancelarEdicion);
});

function obtenerEmpleados() {
  $.ajax({
    url: API_URL,
    type: "GET",
    success: function (res) {
      const tabla = $("#tabla_empleados");
      tabla.empty();

      res.forEach((e) => {
        tabla.append(`
          <tr>
            <td>${e._id}</td>
            <td>${e.nombre}</td>
            <td>${e.cargo}</td>
            <td>
              <button class="btn btn-sm btn-warning"
                onclick="cargarParaEditar('${e._id}','${e.nombre}','${e.cargo}','${e.horario}','${e.contacto}','${e.sueldo}')">
                Editar
              </button>

              <button class="btn btn-sm btn-danger"
                onclick="eliminarEmpleado('${e._id}')">
                Eliminar
              </button>
            </td>
          </tr>
        `);
      });
    },
  });
}

function cargarParaEditar(id, nombre, cargo, horario, contacto, sueldo) {
  $("#_id").val(id).prop("readonly", true);
  $("#nombre").val(nombre);
  $("#cargo").val(cargo);
  $("#horario").val(horario);
  $("#contacto").val(contacto);
  $("#sueldo").val(sueldo);

  $("#metodo_actual").val("PUT");
  $("#titulo_formulario").text("Editando Empleado");

  $("#btn_guardar")
    .text("Actualizar Cambios")
    .removeClass("btn-success")
    .addClass("btn-warning");

  $("#btn_cancelar").removeClass("d-none");
}

function cancelarEdicion() {
  $("#form_empleado")[0].reset();
  $("#_id").prop("readonly", false);
  $("#metodo_actual").val("POST");

  $("#titulo_formulario").text("Registro de Empleado");

  $("#btn_guardar")
    .text("Guardar Registro")
    .removeClass("btn-warning")
    .addClass("btn-success");

  $("#btn_cancelar").addClass("d-none");
}

function eliminarEmpleado(id) {
  if (confirm("¿Desea eliminar el registro?")) {
    $.ajax({
      url: `${API_URL}/${id}`,
      type: "DELETE",
      success: function () {
        obtenerEmpleados();
      },
    });
  }
}