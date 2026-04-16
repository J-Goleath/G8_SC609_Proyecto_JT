const API_URL = "http://localhost:3000/api/promociones";

$(document).ready(function () {
    obtenerPromociones();

    $("#form_promociones").on("submit", function (e) {
        e.preventDefault();

        const metodo = $("#metodo_actual").val();
        const id = $("#_id").val();

        const datos = {
            _id: id,
            nombre: $("#nombre").val(),
            descripcion: $("#descripcion").val(),
            porcentaje_descuento: Number($("#porcentaje_descuento").val()),
            fecha_inicio: $("#fecha_inicio").val(),
            fecha_fin: $("#fecha_fin").val()
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
                const detalleError = err.responseJSON && err.responseJSON.error
                    ? err.responseJSON.error
                    : err.statusText;
                alert("Error al procesar: " + detalleError);
            }
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
            res.forEach((p) => {
                tabla.append(`
                    <tr>
                        <td>${p._id}</td>
                        <td>${p.nombre}</td>
                        <td>${p.descripcion}</td>
                        <td>${p.porcentaje_descuento}%</td>
                        <td>${p.fecha_inicio}</td>
                        <td>${p.fecha_fin}</td>
                        <td class="text-center">
                            <button class="btn btn-sm btn-warning me-1" onclick="cargarParaEditar('${p._id}', '${p.nombre}', '${p.descripcion}', ${p.porcentaje_descuento}, '${p.fecha_inicio}', '${p.fecha_fin}')">
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="eliminarPromocion('${p._id}')">
                                <i class="bi bi-trash"></i> Eliminar
                            </button>
                        </td>
                    </tr>`);
            });
        }
    });
}

function cargarParaEditar(id, nombre, desc, porcentaje, inicio, fin) {
    $("#_id").val(id).prop("readonly", true);
    $("#nombre").val(nombre);
    $("#descripcion").val(desc);
    $("#porcentaje_descuento").val(porcentaje);
    $("#fecha_inicio").val(inicio);
    $("#fecha_fin").val(fin);

    $("#metodo_actual").val("PUT");
    $("#titulo_formulario").text("Editando Promoción");
    $("#btn_guardar")
        .html('<i class="bi bi-arrow-clockwise me-2"></i>Actualizar Cambios')
        .removeClass("btn-success")
        .addClass("btn-warning");
    $("#btn_cancelar").removeClass("d-none");
}

function cancelarEdicion() {
    $("#form_promociones")[0].reset();
    $("#_id").prop("readonly", false);
    $("#metodo_actual").val("POST");
    $("#titulo_formulario").text("Registro de Promociones");
    $("#btn_guardar")
        .html('<i class="bi bi-save me-2"></i>Guardar Promoción')
        .removeClass("btn-warning")
        .addClass("btn-success");
    $("#btn_cancelar").addClass("d-none");
}

function eliminarPromocion(id) {
    if (confirm("¿Desea eliminar esta promoción?")) {
        $.ajax({
            url: `${API_URL}/${id}`,
            type: "DELETE",
            success: function () {
                alert("Promoción eliminada");
                obtenerPromociones();
            },
            error: function (err) {
                alert("Error al eliminar: " + err.statusText);
            }
        });
    }
}