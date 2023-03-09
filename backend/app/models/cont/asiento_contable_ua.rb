# Se define el módulo Cont
module Cont
    # Se define la clase AsientoContableUA que hereda de ApplicationRecord
    class AsientoContableUa < ApplicationRecord
        # Se establece la conexión a la base de datos
        self.establish_connection(
        adapter: 'oracle_enhanced',
        encoding: 'utf8',
        database: '//keruxdb:1521/PREPROD',
        username: 'CONT',
        password: 'CONT$P'
        )

        # Se especifica el nombre de la tabla o vista de la base de datos a utilizar
        self.table_name = 'asientos_contables_ua'
        
        # Se establece una relación de pertenencia a la clase Doc::DocumentoOrigen
        belongs_to :Publicacion, foreign_key: "numpublicacion"
        belongs_to :DocumentoOrigen, class_name: 'Doc::DocumentoOrigen', foreign_key: 'iddoc'
        has_many :MovimientoContable, foreign_key: "idasiento"

    end
  end
  