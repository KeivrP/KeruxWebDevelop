# Se define el módulo Doc
module Doc
    # Se define la clase Publicacion que hereda de ApplicationRecord
    class VBenefActivo < ApplicationRecord
        # Se establece la conexión a la base de datos
        self.establish_connection(
            adapter: 'oracle_enhanced',
            encoding: 'utf8',
            database: '//keruxdb:1521/PREPROD',
            username: 'DOC',
            password: 'DOC$P'
        )

        include MetodoGlobal
        
        # Se especifica el nombre de la tabla de la base de datos a utilizar
        self.table_name = 'v_benef_activo'
        self.primary_key = "numbenef"

        # Asociaciones con otros modelos
        has_many :DocumentoOrigen, foreign_key: "numbenef"

        # Métodos del modelo
        
        # Fin de la definición de la clase
    end
  end
