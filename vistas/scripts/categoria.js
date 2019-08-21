var tabla;

//fucnion que se ejecuta al inicio

function init(){
	mostrarform(false);
	listar();

	$("#formulario").on("submit",function(e)
	{
		guardaryeditar(e);
	})

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
		$("#btnagregar").show();
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
			url: '../ajax/categoria.php?op=listar',
			type : "get",
			dataType : "json",
			error: function(e){
				console.log(e.responseText);
			}
		},
		"bDestroy" : true,
		"iDisplayLength": 5,//paginacion
		"order":[[0,"desc"]]//Odenar (columna,orden)
		}).DataTable();
	}
	//funcion guaradr o editar

	function guardaryeditar(e)
	{
		e.preventDefault();//no se activara la accion predeterminda del evento
		$("#btnGuardar").prop("disabled",true);
		var formData = new FormData ($("#formulario")[0]);

		$.ajax({
			url: "../ajax/categoria.php?op=guardaryeditar",
			type:"POST",
			data: formData,
			contentType: false,
			processData: false,

			success: function (datos)
			{
				bootbox.alert(datos);
				mostrarform(false);
				tabla.ajax.reload();
			}
		});
		limpiar();
	}
	function mostrar(idcategoria)
	{
		$.post("../ajax/categoria.php?op=mostrar",{idcategoria : idcategoria},function(data, status)
		{
			data = JSON.parse(data);
			mostrarform(true);
			$("#nombre").val(data.nombre);
			$("#descripcion").val(data.descripcion);
			$("#idcategoria").val(data.idcategoria);
		})
	}
function desactivar(idcategoria)
{
	bootbox.confirm("estas seguro que deseas desactivar la categoria", function(result){
		if(result)
		{
			$.post("../ajax/categoria.php?op=desactivar",{idcategoria : idcategoria}, function(e){
			bootbox.alert(e);
			tabla.ajax.reload();
			});
		}
	})
}

function activar(idcategoria)
{
	bootbox.confirm("estas seguro que deseas activar la categoria", function(result){
		if(result)
		{
			$.post("../ajax/categoria.php?op=activar",{idcategoria : idcategoria}, function(e){
			bootbox.alert(e);
			tabla.ajax.reload();
			});
		}
	})
}
init();

