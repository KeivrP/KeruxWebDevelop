# Se define el módulo Cont
module Cont
    # Se define la clase Publicacion que hereda de ApplicationRecord
    class Publicacion < ApplicationRecord
        # Se establece la conexión a la base de datos
        self.establish_connection(
            adapter: 'oracle_enhanced',
            encoding: 'utf8',
            database: '//keruxdb:1521/PREPROD',
            username: 'CONT',
            password: 'CONT$P'
        )
    
        # Se especifica el nombre de la tabla de la base de datos a utilizar
        self.table_name = 'publicaciones'
        self.primary_key = "numpublicacion"

        # Asociaciones con otros modelos
        belongs_to :EstructuraCont, foreign_key: "codestruct"
        has_many :CuentaPublicacion, foreign_key: "numpublicacion"
        has_many :AsientoContable, foreign_key: "numpublicacion"
        has_many :AsientoContableUa, foreign_key: "numpublicacion"
        has_many :MovimientoContable, foreign_key: "numpublicacion"
        has_many :DefEventoCf, foreign_key: "numpublicacion"

        # Métodos del modelo

        # Fin de la definición de la clase
    end
  end
  