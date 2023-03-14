# Se define el módulo Cont
module Cont
    # Se define la clase Publicacion que hereda de ApplicationRecord
    class UsuarioCf < ApplicationRecord
        # Se establece la conexión a la base de datos
        self.establish_connection(
            adapter: 'oracle_enhanced',
            encoding: 'utf8',
            database: '//keruxdb:1521/PREPROD',
            username: 'CONT',
            password: 'CONT$P'
        )
    
        # Se especifica el nombre de la tabla de la base de datos a utilizar
        self.table_name = 'usuarios_cf'
        self.primary_key = "codusuario"

        # Asociaciones con otros modelos
        # Self joins
        has_many   :codusuario, class_name: "UsuarioCf", foreign_key: "codusuario"
        belongs_to :codusuariosup,  class_name: "UsuarioCf", foreign_key: "codusuariosup"
        
        # Métodos del modelo
        
        # Fin de la definición de la clase
    end
  end
  