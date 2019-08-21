<?php 

require "../config/Conexion.php";

class Datos{

	//imple,mntar nuestro contructor
	public function __construct(){

	}

	//implemantamos un metodo para intertar registros
	

	public function mostrar ($idDatos)
	{
		$sql="SELECT * FROM datos WHERE idDatos = '$idDatos'";
		return ejecutarConsultaSimpleFila($sql);
	}

	//implemntar un metodo  para listar los registros

	public function listar()
	{
		$sql="SELECT * FROM datos";
		return ejecutarConsulta($sql);
	}

	//implemntar un metodo  para listar los registros y mostrar en el select

	
}




 ?>