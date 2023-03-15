# Se define el módulo Doc
module Doc
    # Se define la clase Publicacion que hereda de ApplicationRecord
    class TipoDocumento < ApplicationRecord
        # Se establece la conexión a la base de datos
        self.establish_connection(
            adapter: 'oracle_enhanced',
            encoding: 'utf8',
            database: '//keruxdb:1521/PREPROD',
            username: 'DOC',
            password: 'DOC$P'
        )
    
        # Se especifica el nombre de la tabla de la base de datos a utilizar
        self.table_name = 'tipos_documentos'
        self.primary_key = "tipodoc"

        # Asociaciones con otros modelos
        belongs_to :Ruta, foreign_key: "codruta"
        belongs_to :PasoRuta, foreign_key: "codruta"
        has_many :DocumentoOrigen, foreign_key: "tipodoc"
        has_many :DefEventoCf, class_name: 'Cont::DefEventoCf', foreign_key: "tipodoc"

        # Métodos del modelo

        # Fin de la definición de la clase
    end
  end
