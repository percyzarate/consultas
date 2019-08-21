<?php 

require "../config/Conexion.php";

class Usuario {

	//imple,mntar nuestro contructor
	public function __construct(){

	}

	//implemantamos un metodo para intertar registros
	public function insertar($nombre,$tipo_documento,$num_documento,$direccion,$telefono,$email,$cargo,$login,$clave,$imagen,$permisos)
	{
		$sql="INSERT INTO usuario (nombre,tipo_documento,num_documento,direccion,telefono,email,cargo,login,clave,imagen,condicion)
		VALUES ('$nombre','$tipo_documento','$num_documento','$direccion','$telefono','$email','$cargo','$login','$clave','$imagen','1')";
		//return ejecutarConsulta($sql);
		$idusuarionew=ejecutarConsulta_retornarID($sql);

		$num_elementos=0;
		$sw=true;

		while ($num_elementos < count($permisos))
		 {
			$sql_detalle = "INSERT INTO usuario_permiso(idusuario,idpermiso) VALUES('$idusuarionew', '$permisos[$num_elementos]') ";
			ejecutarConsulta($sql_detalle) or $sw = false;
			$num_elementos=$num_elementos + 1;
		}

		return $sw;

	}

	//implemntamos un metodo  para editar registros

	public function editar($idusuario,$nombre,$tipo_documento,$num_documento,$direccion,$telefono,$email,$cargo,$login,$clave,$imagen,$permisos)
	{
		$sql="UPDATE usuario SET nombre ='$nombre', tipo_documento = '$tipo_documento', num_documento = '$num_documento', direccion ='$direccion', telefono = '$telefono', email = '$email', cargo = '$cargo', login ='$login', clave= '$clave', imagen = '$imagen' WHERE idusuario = '$idusuario'";
		ejecutarConsulta($sql);
		//eliminamos todos lo spermisos asignados para volverlos a editar
		$sqldel="DELETE FROM usuario_permiso WHERE idusuario ='$idusuario'";
		ejecutarConsulta($sqldel);

		$num_elementos=0;
		$sw=true;

		while ($num_elementos < count($permisos))
		 {
			$sql_detalle = "INSERT INTO usuario_permiso(idusuario,idpermiso) VALUES('$idusuario', '$permisos[$num_elementos]') ";
			ejecutarConsulta($sql_detalle) or $sw = false;
			$num_elementos=$num_elementos + 1;
		}

		return $sw;




	}

	//implemtear un metodo para desactivar categorias

	public function desactivar ($idusuario)
	{
		$sql= "UPDATE usuario SET condicion='0' WHERE idusuario ='$idusuario'";
		return ejecutarConsulta($sql);
	}


	public function activar ($idusuario)
	{
		$sql= "UPDATE usuario SET condicion='1' WHERE idusuario ='$idusuario'";
		return ejecutarConsulta($sql);
	}


	//metodo para mostrar los datos de un registro a modificar

	public function mostrar ($idusuario)
	{
		$sql="SELECT * FROM usuario WHERE idusuario = '$idusuario'";
		return ejecutarConsultaSimpleFila($sql);
	}

	//implemntar un metodo  para listar los registros

	public function listar()
	{
		$sql="SELECT * FROM usuario";
		return ejecutarConsulta($sql);
	}

	//implemntar un metodo  para listar los permisos marcados
	public function listarmarcados ($idusuario)
	{
		$sql = "SELECT * FROM usuario_permiso WHERE idusuario='$idusuario'";
		return ejecutarConsulta($sql);
	}
	// fuvcon para verificar el aceeso
	public function verificar($login,$clave)
	{
		$sql="SELECT idusuario,nombre,tipo_documento,num_documento,telefono,email,cargo,imagen,login FROM usuario WHERE login='$login' AND clave='$clave' AND condicion='1'";
		return ejecutarConsulta($sql);
	}

}




 ?>