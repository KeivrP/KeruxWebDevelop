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
      self.primary_key = "idasiento"
      
      # Asociaciones con otros modelos
      belongs_to :Publicacion, foreign_key: "numpublicacion"
      belongs_to :DocumentoOrigen, class_name: 'Doc::DocumentoOrigen', foreign_key: 'iddoc'
      has_many :MovimientoContable, foreign_key: "idasiento"
      
      # Método para mostrar la referencia del documento
      def dsp_RefDoc
        Doc::DocumentoOrigen.try(:refdoc)
      end

      def dsp_otro
        if Doc::DocumentoOrigen.respond_to?(:refdoc)
            Doc::DocumentoOrigen.metodo
        else
          puts "El método no está definido para este objeto"
        end
       # "Tipo de documento no especificado" unless defined?(Doc::TipoDocumento)
       # Doc::TipoDocumento&.desctipodoc
      end
    end
  end
  