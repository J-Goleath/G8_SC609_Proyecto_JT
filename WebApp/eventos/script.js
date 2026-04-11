const API_URL = "http://localhost:3000/api/eventos";

$(document).ready(function () {
  obtenerEventos();
  $("#form_evento").on("submit", function (e) {
    e.preventDefault();
    const datos = {
      _id: $("#_id").val(),
      nombre: $("#nombre").val(),
      fecha: $("#fecha").val(),
      sede_id: $("#sede_id").val(),
      capacidad: parseInt($("#capacidad").val()),
      tipo: $("#tipo").val(),
    };
    $.ajax({
      url: API_URL,
      type: "POST",
      data: JSON.stringify(datos),
      contentType: "application/json",
      success: function () {
        alert("Evento agendado");
        obtenerEventos();
        $("#form_evento")[0].reset();
      },
    });
  });
});

function obtenerEventos() {
  $.get(API_URL, function (res) {
    const tabla = $("#tabla_eventos");
    tabla.empty();
    res.forEach((e) => {
      tabla.append(`<tr>
                <td>${e.fecha}</td>
                <td>${e.nombre}</td>
                <td>${e.sede_id}</td>
                <td>${e.tipo}</td>
                <td><button class="btn btn-danger btn-sm" onclick="eliminar('${e._id}')">X</button></td>
            </tr>`);
    });
  });
}

function eliminar(id) {
  if (confirm("¿Cancelar evento?"))
    $.ajax({
      url: `${API_URL}/${id}`,
      type: "DELETE",
      success: obtenerEventos,
    });
}
