var tabla;

//fucnion que se ejecuta al inicio

function init(){
	mostrarform(false);
	listar();

	

}

//funcion limpiar
function limpiar()
{
	$("#idcategoria").val("");
	$("#nombre").val("");
	$("#decripcion").val("");

}

//fucion mostrar formulario
function mostrarform(flag)
{
	limpiar();
	if (flag)
	{
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		$("#btnGuardar").prop("disabled",false);
		$("#btnagregar").hide();
	}
	else
	{
		$("#listadoregistros").show();
		$("#formularioregistros").hide();
		$("#btnagregar").hide();
	}
}

//funcion cancelar forn

function cancelarform()
{
	limpiar();
	mostrarform(false);
}

//funcion listar

function listar()
{
	tabla=$('#tbllistado').dataTable(
	{
		"aProcessing": true,//activamosel prosamiento del datatable
		"aServerSide": true,//paginacion y filtrado ralizados poel servidor
		dom: 'Bfrtip',//definimos los elmnto de conyode tabla
		buttons:[
					'copyHtml5',
					'excelHtml5',
					'csvHtml5',
					'pdf'
		],
		"ajax":
		{
			url: '../ajax/datos.php?op=listar',
			type : "get",
			dataType : "json",
			error: function(e){
				console.log(e.responseText);
			}
		},
		"bDestroy" : true,
		"iDisplayLength": 10,//paginacion
		"order":[[0,"desc"]]//Odenar (columna,orden)
		}).DataTable();
	}
	//funcion guaradr o editar

	
	function mostrar(idDatos)
	{
		$.post("../ajax/datos.php?op=mostrar",{idDatos : idDatos},function(data, status)
		{
			data = JSON.parse(data);
            mostrarform(true);
            $("#codigo").val(data.codigo);
            $("#codigo_ruta").val(data.codigo_ruta);
            $("#nombre").val(data.nombre);
            $("#direccion").val(data.direccion);
			$("#tarifa").val(data.descripcion);
			$("#idDatos").val(data.idDatos);
		})
	}

init();