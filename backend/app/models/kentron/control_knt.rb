# Se define el módulo Kentron
module Kentron
    # Se define la clase Publicacion que hereda de ApplicationRecord
    class ControlKnt < ApplicationRecord
        # Se establece la conexión a la base de datos
        self.establish_connection(
            adapter: 'oracle_enhanced',
            encoding: 'utf8',
            database: '//keruxdb:1521/PREPROD',
            username: 'KENTRON',
            password: 'KENTRON$P'
        )
    
        # Se especifica el nombre de la tabla de la base de datos a utilizar
        self.table_name = 'control_knt'

        # Asociaciones con otros modelos

        # Métodos del modelo

        # Fin de la definición de la clase
    end
  end
