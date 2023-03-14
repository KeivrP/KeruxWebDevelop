# Se define el módulo Cont
module Cont
    # Se define la clase Publicacion que hereda de ApplicationRecord
    class EstructuraCont < ApplicationRecord
        # Se establece la conexión a la base de datos
        self.establish_connection(
            adapter: 'oracle_enhanced',
            encoding: 'utf8',
            database: '//keruxdb:1521/PREPROD',
            username: 'CONT',
            password: 'CONT$P'
        )
    
        # Se especifica el nombre de la tabla de la base de datos a utilizar
        self.table_name = 'estructuras_cont'
        self.primary_key = "codestruct"
        
        # Asociaciones con otros modelos
        has_many :Publicacion
        
        # Métodos del modelo

        # Fin de la definición de la clase
    end
  end
  