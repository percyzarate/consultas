<?php 
require_once "../modelos/Datos.php";

$datos=new Datos();

switch ($_GET["op"]) {
	
	
	case 'mostrar':
		$rspta=$datos ->mostrar($idDatos);
		//codifica el resultado utilizado json
		echo json_encode($rspta);
		
		break;
	case 'listar':
		$rspta = $datos->listar();
		//vamos utilizar un array
		$data = Array();

		while ($reg=$rspta -> fetch_object()) {
			$data[] = array(
				
                "0"=>$reg->idDatos,
                "1"=>$reg->codigo,
                "2"=>$reg->codigo_ruta,
                "3"=>$reg->nombre,
                "4"=>$reg->direccion,
				"5"=>$reg->tarifa,
				"6"=>$reg->idDatos

		
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