var tabla;

//fucnion que se ejecuta al inicio

function init(){
	mostrarform(false);
	listar();

}



//fucion mostrar formulario
function mostrarform(flag)
{
	
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
			url: '../ajax/permiso.php?op=listar',
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

	

init();

