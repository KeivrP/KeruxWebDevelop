# Se define el módulo Kentron
module Kentron
    # Se define la clase Publicacion que hereda de ApplicationRecord
    class TipoCambio < ApplicationRecord
        # Se establece la conexión a la base de datos
        self.establish_connection(
            adapter: 'oracle_enhanced',
            encoding: 'utf8',
            database: '//keruxdb:1521/PREPROD',
            username: 'KENTRON',
            password: 'KENTRON$P'
        )
    
        # Se especifica el nombre de la tabla de la base de datos a utilizar
        self.table_name = 'tipo_cambio'
        self.primary_key = [:codmoneda, :fecha, :codmoncamb]

        # Asociaciones con otros modelos
        belongs_to :Moneda, foreign_key: "codmoneda"
        belongs_to :MonedaCamb, foreign_key: "codmoncamb"

    end
  end
  