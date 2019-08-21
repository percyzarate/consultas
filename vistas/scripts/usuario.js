var tabla;

//fucnion que se ejecuta al inicio

function init(){
	mostrarform(false);
	listar();

	$("#formulario").on("submit",function(e)
	{
		guardaryeditar(e);
	})
	//cargamos los items de la select categoria
	
	$("#imagenmuestra").hide();
	//mostramos los permisos
	$.post("../ajax/usuario.php?op=permisos&id=", function(r){
		$("#permisos").html(r);
	});

}

//funcion limpiar
function limpiar()
{

	$("#num_documento").val("");
	$("#nombre").val("");
    $("#direccion").val("");
    $("#telefono").val("");
    $("#email").val("");
    $("#cargo").val("");
    $("#login").val("");
    $("#clave").val("");
    $("#imagenmuestra").attr("src","");
    $("#imagenactual").val("");
    
    $("#idusuario").val("");


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
			url: '../ajax/usuario.php?op=listar',
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
		var formData = new FormData($("#formulario")[0]);

		$.ajax({
			url: "../ajax/usuario.php?op=guardaryeditar",
			type: "POST",
			data: formData,
			contentType: false,
			processData: false,

			success: function(datos)
			{
				bootbox.alert(datos);
				mostrarform(false);
				tabla.ajax.reload();
			}
		});
		limpiar();
	}
	function mostrar(idusuario)
	{
		$.post("../ajax/usuario.php?op=mostrar",{idusuario : idusuario},function(data,status)
		{
			data = JSON.parse(data);
            mostrarform(true);

            $("#nombre").val(data.nombre);
            $("#tipo_documento").val(data.tipo_documento);
            $("#tipo_documento").selectpicker('refresh');
            $("#num_documento").val(data.num_documento);
            $("#direccion").val(data.direccion);
            $("#email").val(data.email);
			$("#cargo").val(data.cargo);
			$("#login").val(data.login);
			$("#clave").val(data.clave);
			$("#imagenmuestra").show();
			$("#imagenmuestra").attr("src","../files/usuarios/"+data.imagen);
			$("#imagenactual").val(data.imagen);
			$("#idusuario").val(data.idusuario);
			
		});
		$.post("../ajax/usuario.php?op=permisos&id="+idusuario, function(r){
		$("#permisos").html(r);
	});
}
function desactivar(idusuario)
{
	bootbox.confirm("estas seguro que deseas desactivar el usuario", function(result){
		if(result)
		{
			$.post("../ajax/usuario.php?op=desactivar",{idusuario : idusuario}, function(e){
			bootbox.alert(e);
			tabla.ajax.reload();
			});
		}
	})
}

function activar(idusuario)
{
	bootbox.confirm("estas seguro que deseas activar el usuario", function(result){
		if(result)
		{
			$.post("../ajax/usuario.php?op=activar",{idusuario : idusuario}, function(e){
			bootbox.alert(e);
			tabla.ajax.reload();
			});
		}
	})
}

//genera  codigo de barrar barcode



init();

