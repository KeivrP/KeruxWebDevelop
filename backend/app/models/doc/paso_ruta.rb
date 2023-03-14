# Se define el módulo Doc
module Doc
    # Se define la clase Publicacion que hereda de ApplicationRecord
    class PasoRuta < ApplicationRecord
        # Se establece la conexión a la base de datos
        self.establish_connection(
            adapter: 'oracle_enhanced',
            encoding: 'utf8',
            database: '//keruxdb:1521/PREPROD',
            username: 'DOC',
            password: 'DOC$P'
        )
    
        # Se especifica el nombre de la tabla de la base de datos a utilizar
        self.table_name = 'pasos_ruta'

        # Asociaciones con otros modelos
        belongs_to :Ruta, foreign_key: "codruta"
        belongs_to :Sistema, foreign_key: "codproxsis"
        belongs_to :SistemaApro, class_name: "Doc::Sistema", foreign_key: "codsisaprob"

        # Métodos del modelo
        
        # Fin de la definición de la clase
    end
end
