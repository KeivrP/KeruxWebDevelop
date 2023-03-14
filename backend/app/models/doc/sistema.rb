# Se define el módulo Doc
module Doc
    # Se define la clase Publicacion que hereda de ApplicationRecord
    class Sistema < ApplicationRecord
        # Se establece la conexión a la base de datos
        self.establish_connection(
            adapter: 'oracle_enhanced',
            encoding: 'utf8',
            database: '//keruxdb:1521/PREPROD',
            username: 'DOC',
            password: 'DOC$P'
        )
    
        # Se especifica el nombre de la tabla de la base de datos a utilizar
        self.table_name = 'sistemas'
        self.primary_key = "codsis"

        # Métodos del modelo
        has_many :PasoRuta, foreign_key: "codsis"

        # Fin de la definición de la clase
    end
  end
