<?php 
require_once "../modelos/Permiso.php";

$permiso=new Permiso();

switch ($_GET["op"]) {
	
	case 'listar':
		$rspta = $permiso->listar();
		//vamos utilizar un array
		$data = Array();

		while ($reg=$rspta -> fetch_object()) {
			$data[] = array(
				"0"=>$reg->nombre
			 );
			
		}
		$results = array(
			"sEcho"=> 1,//informacion para el datatables
			"iTotalRecords" =>count($data),//enviamos el total registros al tabla
			"iTotalDisplayRecords" => count($data),//emviamos el total de registros para visulaizar
			"aaData" =>$data);

		
		echo json_encode($results);
	break;


}

?>