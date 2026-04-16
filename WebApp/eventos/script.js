const API_URL = "http://localhost:3000/api/eventos";

$(document).ready(function () {
    obtenerEventos();

    $("#form_evento").on("submit", function (e) {
        e.preventDefault();
        const metodo = $("#metodo_actual").val();
        const id = $("#_id").val();

        const datos = {
            _id: id,
            nombre: $("#nombre").val(),
            fecha: $("#fecha").val(),
            sede_id: $("#sede_id").val(),
            capacidad: parseInt($("#capacidad").val()),
            tipo: $("#tipo").val(),
        };

        const urlFinal = metodo === "PUT" ? `${API_URL}/${id}` : API_URL;

        $.ajax({
            url: urlFinal,
            type: metodo,
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function () {
                alert(metodo === "POST" ? "Evento agendado" : "Evento actualizado");
                cancelarEdicion();
                obtenerEventos();
            },
            error: function (err) {
                alert("Error al procesar: " + (err.responseJSON ? err.responseJSON.error : "Error de red"));
            }
        });
    });

    $("#btn_cancelar").on("click", function () {
        cancelarEdicion();
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
                <td class="text-center">
                    <button class="btn btn-warning btn-sm me-1" onclick="cargarEdicion('${e._id}', '${e.nombre}', '${e.fecha}', '${e.sede_id}', ${e.capacidad}, '${e.tipo}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="eliminar('${e._id}')">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </td>
            </tr>`);
        });
    });
}

function cargarEdicion(id, nombre, fecha, sede, capacidad, tipo) {
    $("#_id").val(id).prop("readonly", true);
    $("#nombre").val(nombre);
    $("#fecha").val(fecha);
    $("#sede_id").val(sede);
    $("#capacidad").val(capacidad);
    $("#tipo").val(tipo);

    $("#metodo_actual").val("PUT");
    $("#titulo_formulario").text("Modificar Evento");
    $("#btn_guardar").text("Actualizar Cambios").removeClass("btn-primary").addClass("btn-warning");
    $("#btn_cancelar").removeClass("d-none");
}

function cancelarEdicion() {
    $("#form_evento")[0].reset();
    $("#_id").prop("readonly", false);
    $("#metodo_actual").val("POST");
    $("#titulo_formulario").text("Detalles del Evento");
    $("#btn_guardar").text("Registrar Evento").removeClass("btn-warning").addClass("btn-primary");
    $("#btn_cancelar").addClass("d-none");
}

function eliminar(id) {
    if (confirm("¿Cancelar evento?")) {
        $.ajax({
            url: `${API_URL}/${id}`,
            type: "DELETE",
            success: obtenerEventos,
        });
    }
}