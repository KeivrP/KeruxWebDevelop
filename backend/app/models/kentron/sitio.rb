# Se define el módulo Kentron
module Kentron
    # Se define la clase Publicacion que hereda de ApplicationRecord
    class Sitio < ApplicationRecord
        # Se establece la conexión a la base de datos
        self.establish_connection(
            adapter: 'oracle_enhanced',
            encoding: 'utf8',
            database: '//keruxdb:1521/PREPROD',
            username: 'KENTRON',
            password: 'KENTRON$P'
        )
    
        # Se especifica el nombre de la tabla de la base de datos a utilizar
        self.table_name = 'sitios'
        self.primary_key = "codsitio"

        # Asociaciones con otros modelos
        has_many :DocumentoOrigen
        has_many :MonedaSitio, foreign_key: "codsitio"
        has_many :Moneda, through: :MonedaSitio
        #has_many :Moneda, through: :MonedaSitio, foreign_key: [:codmoneda, :codsitio]
        
        # Métodos del modelo

        # Fin de la definición de la clase
    end
  end
