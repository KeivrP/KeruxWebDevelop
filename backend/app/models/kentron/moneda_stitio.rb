# Se define el módulo Kentron
module Kentron
    # Se define la clase Publicacion que hereda de ApplicationRecord
    class MonedaSitio < ApplicationRecord
        # Se establece la conexión a la base de datos
        self.establish_connection(
            adapter: 'oracle_enhanced',
            encoding: 'utf8',
            database: '//keruxdb:1521/PREPROD',
            username: 'KENTRON',
            password: 'KENTRON$P'
        )
    
        # Se especifica el nombre de la tabla de la base de datos a utilizar
        self.table_name = 'monedas_sitio'
        self.primary_key = [:codmoneda, :codsitio]

        # Asociaciones con otros modelos
        belongs_to :Moneda, foreign_key: "codmoneda"
        belongs_to :Sitio, foreign_key: "codsitio"
        has_many :DocumentoOrigen, foreign_key: "codmoneda"
    end
  end
  