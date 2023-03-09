# Se define el módulo Cont
module Cont
    # Se define la clase AsientoContableUA que hereda de ApplicationRecord
    class MovimientoContable < ApplicationRecord
        # Se establece la conexión a la base de datos
        self.establish_connection(
        adapter: 'oracle_enhanced',
        encoding: 'utf8',
        database: '//keruxdb:1521/PREPROD',
        username: 'CONT',
        password: 'CONT$P'
        )

        # Se especifica el nombre de la tabla o vista de la base de datos a utilizar
        self.table_name = 'movimientos_contables'
        
        # Asociaciones con otros modelos
        belongs_to :AsientoContable, foreign_key: "idasiento"
        belongs_to :AsientoContableUa, foreign_key: "idasiento"
        
    end
  end
  