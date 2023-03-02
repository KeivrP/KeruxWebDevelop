# Se define el módulo Cont
module Cont
    # Se define la clase AsientoContable que hereda de ApplicationRecord
    class AsientoContable < ApplicationRecord
      # Se establece la conexión a la base de datos
      self.establish_connection(
        adapter: 'oracle_enhanced',
        encoding: 'utf8',
        database: '//keruxdb:1521/PREPROD',
        username: 'CONT',
        password: 'CONT$P'
      )
  
      # Se especifica el nombre de la tabla de la base de datos a utilizar
      self.table_name = 'asientos_contables'
      
      # Se establece una relación de pertenencia a la clase Doc::DocumentoOrigen
      belongs_to :documentoorigen, class_name: 'Doc::DocumentoOrigen', primary_key: :iddoc, foreign_key: 'iddoc'
    end
  end
  