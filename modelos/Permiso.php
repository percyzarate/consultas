<?php 

require "../config/Conexion.php";

class Permiso {

	//imple,mntar nuestro contructor
	public function __construct(){

	}

	//implemantamos un metodo para intertar registros
	

	//metodo para mostrar los datos de un registro a modificar

	public function listar()
	{
		$sql="SELECT * FROM permiso";
		return ejecutarConsulta($sql);
	}

	//implemntar un metodo  para listar los registros

}




 ?>